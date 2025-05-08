import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import pdfParse from 'pdf-parse';
import multer from 'multer';
import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from '@langchain/pinecone';
import { Document } from '@langchain/core/documents';

dotenv.config

export async function register(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(401).json({ msg: "Please provide all the redentials" });
        return;
    }
    const check = await User.findOne({ email });
    if (check) {
        res.status(401).json({ msg: "This email is already registered" });
        return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed })
    await user.save()
    res.status(201).json({ msg: "User Registered" });
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ msg: "Invalid Credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.status(201).json({ token: token, userId: user._id, username: user.username })
}

export async function upload(req, res) {
    const uploadMiddleware = multer({ storage: multer.memoryStorage() }).single('file');
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            res.status(500).json({ msg: "Multer error" });
        }

        try {
            const pdfBuffer = req.file.buffer;
            const pdfData = await pdfParse(pdfBuffer);
            const text = pdfData.text;

            const doc = [new Document({ pageContent: text, metadata: { source: 'uploaded-pdf' } })];

            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const docs = await splitter.splitDocuments(doc);

            const embeddings = new GoogleGenerativeAIEmbeddings({
                model: 'embedding-001',
                apiKey: process.env.GOOGLE_API_KEY,
                taskType: 'RETRIEVAL_DOCUMENT',
            });

            const pinecone = new Pinecone({
                apiKey: process.env.PINECONE_API_KEY,
            });

            const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME);

            await PineconeStore.fromDocuments(docs, embeddings, {
                pineconeIndex: pineconeIndex,
                namespace: 'pdf-docs',
            });

            res.json({ message: 'PDF processed and stored in Pinecone.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to process PDF.' });
        }
    })
}

export async function ask(req, res) {
    const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Question is required.' });

  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "embedding-001", 
      apiKey: process.env.GEMINI_API_KEY,
      taskType: "RETRIEVAL_QUERY",
    });

    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex, 
      namespace: 'pdf-docs',
    });

    const results = await vectorStore.similaritySearch(query, 4);
    const context = results.map((doc) => doc.pageContent).join('\n\n');

    const { GoogleGenAI } = await import('@google/genai'); 
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Use the context below to answer the question:\n\n${context}\n\nQuestion: ${query}`,
    });

    const answer = response.text || 'No answer found.';
    res.json({ answer });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: 'Failed to retrieve answer.' });
  }
}
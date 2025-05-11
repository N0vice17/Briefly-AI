import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { FileText } from 'lucide-react';
import ChatInput from "./ChatInput";
import ChatInterface from "./ChatInterface";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(true);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleButtonClick = (e) => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (!e.target.files) return;
        const filename = e.target.files[0].name;
        if (!files.includes(filename) && files.length < 5) {
            setFiles((prev) => [...prev, filename]);

            const formdata = new FormData();
            formdata.append("file", e.target.files.item(0));

            axios.post("/api/upload", formdata).then((res) => {
                toast.success("Pdf Uploaded")
            }).catch((err) => {
                toast.error("Pdf not uploaded try again")
            })
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setFiles((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
    };
    return (
        <>
            <div className="flex h-screen">
                <Toaster position="top-right" richColors />
                <div className={`transition-all duration-450 ${isOpen ? 'w-140' : 'w-13'} bg-[#1C1C1C] p-4 overflow-hidden`}>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-4 focus:outline-none">
                        {isOpen ? <ChevronLeft size={24} className="cursor-pointer" /> : <ChevronRight size={24} className="cursor-pointer" />}
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} space-y-4`}>
                        <div className="p-4 max-w-md mx-auto space-y-4">
                            <input id="pdffiles" type="file" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                            <button onClick={handleButtonClick}
                                className=" group flex items-center justify-center gap-2 w-44 px-5 py-2.5 rounded-xl bg-[#1a1a1a] text-gray-200 border border-[#5a5a5a] shadow-[0_2px_8px_rgba(0,0,0,0.4)] font-medium hover:bg-[#2c2c2c] hover:text-white hover:border-blue-500 active:bg-[#3a3a3a] active:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black
                                transition-all duration-200 cursor-pointer">
                                <span>Upload Files</span>
                                <Upload className="w-5 h-5 text-blue-400 group-hover:text-blue-500 transition-colors duration-200" />
                            </button>
                            {files.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    {files.map((name, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between border border-[#5a5a5a] rounded-lg p-3 bg-[#1a1a1a]/90 shadow-[0_1px_5px_rgba(0,0,0,0.5)] mb-3 transition-all duration-200 w-full max-w-lg backdrop-blur-sm" >
                                            <div className="flex items-center truncate max-w-[75%] text-gray-200 text-[0.95rem] font-medium leading-tight">
                                                {<FileText className="w-5 h-5 text-red-500 flex-shrink-0 mr-5" />}{name}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFile(index)}
                                                className="cursor-pointer ml-4 text-blue-400 hover:text-blue-500 active:text-blue-600 rounded-full p-1.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
                                                aria-label="Remove file"
                                                title="Remove file">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-screen bg-[#252525]">
                <ChatInterface/>
                </div>
            </div>
        </>
    )
}
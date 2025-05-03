import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';

export default function Chat() {
    const [isOpen, setIsOpen] = useState(true);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleButtonClick = (e) => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const filename = e.target.files[0].name;
        if (!files.includes(filename) && files.length < 5) {
            setFiles((prev) => [...prev, filename]);
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setFiles((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
    };
    return (
        <>
            <div className="flex h-screen">
                <div className={`transition-all duration-450 ${isOpen ? 'w-100' : 'w-13'} bg-[#212327] text-white p-4 overflow-hidden`}>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-4 focus:outline-none">
                        {isOpen ? <ChevronLeft size={24} className="cursor-pointer" /> : <ChevronRight size={24} className="cursor-pointer" />}
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} space-y-4`}>
                        <div className="p-4 max-w-md mx-auto space-y-4">
                            <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                            <button onClick={handleButtonClick} className="flex flex-row justify-between w-40 bg-white text-black px-4 py-2 rounded cursor-pointer">
                                Upload Files <Upload />
                            </button>
                            {files.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    {files.map((name, index) => (
                                        <div key={index}
                                            className="flex items-center justify-between border border-gray-300 rounded-md p-3 bg-white shadow-sm">
                                            <div className="flex flex-row items-center truncate max-w-full text-sm text-black">
                                                {name}
                                            </div>
                                            <button onClick={() => handleRemoveFile(index)}
                                                className="text-black ml-4 cursor-pointer">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6 bg-[#292A2D]">
                </div>
            </div>
        </>
    )
}
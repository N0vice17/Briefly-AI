import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import React, { useState } from 'react';

export function AppSidebar() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const filename = e.target.files[0].name;
        if(!files.includes(filename) && files.length < 5){
            setFiles((prev) => [...prev,filename]);
        }
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Uploads</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="p-4 max-w-md mx-auto space-y-4">
                            <button type="file" multiple onChange={handleFileChange} />

                            {files.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                                    <ul className="list-disc list-inside">
                                        {files.map((name, index) => (
                                            <li key={index}>{name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

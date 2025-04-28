import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/ui/app-sidebar"

export default function Chat() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
            </SidebarProvider>
        </>
    )
}
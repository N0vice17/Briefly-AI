import React, { useState } from "react"
import { cn } from "@/lib/utils.js"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import { Toaster, toast } from "sonner"

export function SignupForm(props) {
    const { className, ...rest } = props
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        const payload = {
            username: username,
            email: email,
            password: password
        }
        axios.post("/api/register", payload).then((res) => {
            toast.success("Registered Succesfully");
            setTimeout(() => {
                navigate("/login")
            }, 1500)
        }).catch((err) => {
            toast.error(`${err.response.data.msg}`);
        })
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...rest}>
            <Toaster position="top-right" richColors />
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Signup</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} id="username" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                </div>
                <Button onClick={handlesubmit} className="w-full cursor-pointer">
                    Signup
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </div>
    )
}

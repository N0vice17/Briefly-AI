import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function SignupForm(props) {
    const { className, ...rest } = props
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        const payload = {
            email: email,
            password: password,
        }
        axios.post("http://localhost:3000/api/login", payload).then((res) => {
            navigate("/chat")
        }).catch((err) => {
            alert(`Bsdk mkc ${err}`)
        })
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...rest}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
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
                    Login
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </div>
    )
}

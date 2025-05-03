import { SignupForm } from "./signup-form"
import { Link } from "react-router-dom"
import { FlickeringGrid } from "../magicui/flickering-grid"

export default function Signup() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        Briefly AI
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <FlickeringGrid
                    className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                    squareSize={4}
                    gridGap={6}
                    color="black"
                    maxOpacity={0.5}
                    flickerChance={0.1}
                    height={800}
                    width={800}
                />
            </div>
        </div>
    )
}

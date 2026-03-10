import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import axios from "axios"
// import ThemeToggle from "@/components/ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
        const payload = {
            email: email,
            password: password,
        }
        axios.post("https://briefly-ai.onrender.com/api/login", payload).then((res) => {
            toast.success("Login Successfull")
            setTimeout(() => {
                navigate("/chat")
            }, 1500)
        }).catch((err) => {
            toast.error("Wrong Credentials")
        })
      setIsLoading(false);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      {/* Left - Form */}
      <div className="flex flex-col p-6 md:p-10 lg:p-16">
        {/* Logo + Theme */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
              <Zap className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">Briefly</span>
          </Link>
          {/* <ThemeToggle /> */}
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-sm"
          >
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11 bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-primary/20 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-medium text-foreground">
                    Password
                  </Label>
                  <button type="button" className="text-xs text-primary/70 hover:text-primary transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-11 bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-primary/20 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 transition-all duration-300 gap-2"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-[13px] text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary/80 hover:text-primary font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right - Visual panel */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-secondary/20 border-l border-border/30">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/6 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(hsl(var(--foreground)) 0.5px, transparent 0.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 max-w-md px-12 text-center"
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 ring-1 ring-primary/10 shadow-lg shadow-primary/10">
            <Zap className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Unlock your documents
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Chat with your PDFs, extract insights, and find answers instantly. Powered by Gemini for accurate, contextual understanding.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "50K+", label: "Documents" },
              { value: "2.4K", label: "Users" },
              { value: "99%", label: "Accuracy" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-4">
                <div className="font-display text-lg font-bold text-foreground">{stat.value}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LogIn, Shield, MapPin, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate("/dashboard");
            }
        });
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast.error("Login Failed", {
                    description: error.message
                });
            } else {
                toast.success("Welcome back, Officer!", {
                    description: "Accessing National Lead Intelligence Engine..."
                });
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background lg:bg-muted/30">
            <div className="hidden lg:flex w-1/2 min-h-screen bg-primary items-center justify-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 text-white p-12 max-w-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
                        <BarChart3 className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        Intelligence that drives <span className="text-secondary-foreground underline decoration-accent decoration-4 underline-offset-8 italic">Growth.</span>
                    </h1>
                    <p className="text-white/80 text-lg mb-8 leading-relaxed">
                        Access real-time industrial buyer signals, deterministic demand inference, and national sales tracking.
                    </p>

                    <div className="space-y-4">
                        {[
                            { icon: Shield, text: "Role-based Secure Access" },
                            { icon: MapPin, text: "Territory Specific Routing" },
                            { icon: Zap, text: "Live AI Inference Engine" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-medium bg-white/5 p-3 rounded-xl border border-white/10">
                                <item.icon className="h-5 w-5 text-accent" />
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold tracking-tighter">HPCL <span className="text-primary italic">LeadIQ</span></span>
                    </div>

                    <Card className="border-none shadow-2xl lg:shadow-none bg-background/50 backdrop-blur-sm">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-3xl font-bold tracking-tight">Sign In</CardTitle>
                            <CardDescription>
                                Enter your official HPCL credentials to continue
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleLogin}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Office Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="officer.name@hpcl.in"
                                        className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-all"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-all"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 pt-4">
                                <Button
                                    className="w-full h-12 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <LogIn className="h-5 w-5" />
                                    )}
                                    {isLoading ? "Authenticating..." : "Sign In to LeadIQ"}
                                </Button>
                                <p className="text-sm text-center text-muted-foreground">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className="text-primary font-semibold hover:underline">
                                        Join the Engine
                                    </Link>
                                </p>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

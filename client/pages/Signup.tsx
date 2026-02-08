import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, UserPlus, Fingerprint, Globe, Layers } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [territory, setTerritory] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate("/dashboard");
            }
        });
    }, [navigate]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        territory: territory,
                        role: "officer" // Default role
                    }
                }
            });

            if (error) {
                toast.error("Registration Failed", {
                    description: error.message
                });
            } else {
                toast.success("Account Created!", {
                    description: "Please check your email to verify your account."
                });
                navigate("/login");
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
            <div className="hidden lg:flex w-1/2 min-h-screen bg-secondary items-center justify-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-20 right-20 w-80 h-80 bg-primary/40 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/40 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 text-secondary-foreground p-12 max-w-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/5 backdrop-blur-xl border border-black/10 mb-8">
                        <BarChart3 className="h-10 w-10 text-secondary-foreground" />
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                        Join the <span className="text-primary italic underline decoration-primary/30 decoration-4 underline-offset-8">National</span> Sales Network.
                    </h1>
                    <p className="text-secondary-foreground/80 text-lg mb-8 leading-relaxed">
                        Register as a Territory Officer or Regional Manager to start routing industrial intelligence today.
                    </p>

                    <div className="space-y-4">
                        {[
                            { icon: Fingerprint, text: "Biometric-ready Security" },
                            { icon: Globe, text: "National Lead Registry Access" },
                            { icon: Layers, text: "Multi-layered Data Analysis" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-medium bg-black/5 p-3 rounded-xl border border-black/10">
                                <item.icon className="h-5 w-5 text-primary" />
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
                            <CardTitle className="text-3xl font-bold tracking-tight">Create Account</CardTitle>
                            <CardDescription>
                                Empowering HPCL's salesforce through data
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSignup}>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-all"
                                            placeholder="Rajesh"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-all"
                                            placeholder="Kumar"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Official Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="r.kumar@hpcl.in"
                                        className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-all"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="territory">Assigned Territory</Label>
                                    <Input
                                        id="territory"
                                        placeholder="Maharashtra - Taloja Zone"
                                        className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-all"
                                        required
                                        value={territory}
                                        onChange={(e) => setTerritory(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Create Password</Label>
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
                                        <UserPlus className="h-5 w-5" />
                                    )}
                                    {isLoading ? "Setting up Engine..." : "Register Officer Profile"}
                                </Button>
                                <p className="text-sm text-center text-muted-foreground">
                                    Already registered?{" "}
                                    <Link to="/login" className="text-primary font-semibold hover:underline">
                                        Sign In instead
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

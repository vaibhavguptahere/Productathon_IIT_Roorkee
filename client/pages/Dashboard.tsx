import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Lead } from "@shared/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from "recharts";
import {
    Users,
    Target,
    TrendingUp,
    MapPin,
    ArrowUpRight,
    Zap,
    CheckCircle2,
    Clock,
    BarChart3,
    Sparkles,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const leadTrendData = [
    { name: "Week 1", count: 12, converted: 2 },
    { name: "Week 2", count: 18, converted: 5 },
    { name: "Week 3", count: 15, converted: 4 },
    { name: "Week 4", count: 24, converted: 8 },
];

const sectorData = [
    { name: "Chemicals", value: 35 },
    { name: "Infrastructure", value: 25 },
    { name: "Manufacturing", value: 20 },
    { name: "Shipping", value: 15 },
    { name: "Others", value: 5 },
];

const productData = [
    { name: "FO", value: 120 },
    { name: "HSD", value: 95 },
    { name: "Bitumen", value: 45 },
    { name: "MTO", value: 30 },
    { name: "LDO", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Dashboard() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [userName, setUserName] = useState("Officer");
    const [userTerritory, setUserTerritory] = useState("National Command");

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata) {
                if (user.user_metadata.first_name) setUserName(user.user_metadata.first_name);
                if (user.user_metadata.territory) setUserTerritory(user.user_metadata.territory);
            }
        };
        getUser();
    }, []);

    const { data: leads = [], isLoading } = useQuery<Lead[]>({
        queryKey: ["/api/leads"],
    });

    const scanMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/leads/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ industry: "Manufacturing" })
            });
            if (!res.ok) throw new Error("Failed to scan");
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
            toast({
                title: "AI Scan Complete",
                description: `Successfully discovered ${data.count} new opportunities via Groq inference.`,
            });
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Scan Failed",
                description: "Could not connect to AI Engine. Please check API Key.",
            });
        }
    });

    const totalLeads = leads.length;
    const convertedLeads = leads.filter(l => l.status === "converted").length;
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

    // Simulated revenue potential calculation
    const totalPotential = leads.reduce((acc, lead) => acc + (lead.score * 0.2), 0).toFixed(1);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-0 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <Header />

            <div className="container py-12 relative">
                <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                            <MapPin className="h-3 w-3" />
                            {userTerritory}
                        </div>
                        <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                            Welcome, Officer {userName}
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            Here is your territory's lead intelligence overview
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="group flex items-center gap-3 rounded-[20px] bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-xl hover:bg-white/10 transition-all duration-300">
                            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5 animate-pulse" />
                            </div>
                            <div>
                                <span className="text-sm font-bold block leading-none mb-1 uppercase tracking-tight">Live IQ Active</span>
                                <span className="text-[10px] text-muted-foreground font-mono uppercase opacity-70">Latency: 14ms</span>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                            onClick={() => scanMutation.mutate()}
                            disabled={scanMutation.isPending}
                        >
                            {scanMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            {scanMutation.isPending ? "Scanning..." : "Run AI Scan"}
                        </Button>
                    </div>
                </div>

                {/* Top KPIs */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
                    {[
                        { label: "Total Leads Discovered", value: totalLeads, icon: Target, color: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/20", glow: "shadow-blue-500/5", sub: "+12.5% from last month" },
                        { label: "Conversion Rate", value: `${conversionRate}%`, icon: CheckCircle2, color: "from-success/10 to-success/5", border: "border-success/20", glow: "shadow-success/5", sub: `${convertedLeads} successful deals` },
                        { label: "Potential Revenue", value: `₹${totalPotential} Cr`, icon: TrendingUp, color: "from-secondary/10 to-secondary/5", border: "border-secondary/20", glow: "shadow-secondary/5", sub: "Aggregated market value" },
                        { label: "Active Officers", value: "428", icon: Users, color: "from-accent/10 to-accent/5", border: "border-accent/20", glow: "shadow-accent/5", sub: "Field engagement active" }
                    ].map((stat, i) => (
                        <Card key={i} className={cn(
                            "border shadow-2xl backdrop-blur-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group",
                            stat.color,
                            stat.border,
                            stat.glow
                        )}>
                            <CardContent className="pt-6 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-white/50 rounded-2xl shadow-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                        <stat.icon className="h-5 w-5 text-foreground/80" />
                                    </div>
                                    <BarChart3 className="h-8 w-8 text-black/5 absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-black tracking-tight">{isLoading ? "..." : stat.value}</div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground/60 mt-4 uppercase tracking-tighter">
                                    {stat.sub}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Row 1: Trends & Sectors */}
                <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Discovery Trend</CardTitle>
                            <CardDescription>Weekly new leads vs conversions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={leadTrendData}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="count" stroke="#2563eb" fillOpacity={1} fill="url(#colorCount)" name="Leads Discovered" />
                                        <Area type="monotone" dataKey="converted" stroke="#16a34a" fillOpacity={0} name="Leads Converted" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Lead Sector Distribution</CardTitle>
                            <CardDescription>Source industry diversity</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={sectorData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {sectorData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    {sectorData.map((s, i) => (
                                        <div key={s.name} className="flex items-center text-xs">
                                            <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: COLORS[i] }} />
                                            <span className="text-muted-foreground mr-1">{s.name}:</span>
                                            <span className="font-semibold">{s.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 2: Products & Geo */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Product Demand Insights</CardTitle>
                            <CardDescription>Estimated MT volume across leads</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={productData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={80} />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} name="Volume (MT)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Distribution</CardTitle>
                            <CardDescription>Top active regions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 pt-4">
                                {[
                                    { region: "Western Zone", count: 42, color: "bg-blue-500" },
                                    { region: "Southern Zone", count: 35, color: "bg-green-500" },
                                    { region: "Northern Zone", count: 28, color: "bg-orange-500" },
                                    { region: "Eastern Zone", count: 18, color: "bg-purple-500" },
                                ].map((r) => (
                                    <div key={r.region} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{r.region}</span>
                                            <span className="text-muted-foreground">{r.count} leads</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                                            <div className={`h-full ${r.color}`} style={{ width: `${(r.count / 42) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

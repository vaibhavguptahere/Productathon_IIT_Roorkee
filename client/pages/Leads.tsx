import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Star,
  TrendingUp,
  Filter,
  Search,
  MapPin,
  Zap,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lead } from "@shared/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Leads() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: leads = [], isLoading, isError } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    queryFn: async () => {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }
      return response.json();
    }
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = !selectedStatus || lead.status === selectedStatus;
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    accepted: leads.filter((l) => l.status === "accepted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center text-destructive">
          Failed to load leads. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <Header />

      <div className="container py-12 relative">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
              <Zap className="h-3 w-3 fill-primary" />
              Intelligence Engine Active
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">National Lead Queue</h1>
            <p className="text-muted-foreground text-lg">
              Priority industrial opportunities discovery through 24/7 web monitoring
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-2xl border border-border/50 backdrop-blur-sm">
            <Calendar className="h-4 w-4" />
            Last Sync: Just Now
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Leads", value: stats.total, color: "from-blue-500/10 to-blue-600/10", text: "text-blue-600", icon: Search, sub: "National Registry" },
            { label: "New Leads", value: stats.new, color: "from-amber-500/10 to-amber-600/10", text: "text-amber-600", icon: Zap, sub: "Review Pending" },
            { label: "Accepted", value: stats.accepted, color: "from-primary/10 to-primary/20", text: "text-primary", icon: BarChart3, sub: "Field Active" },
            { label: "Converted", value: stats.converted, color: "from-success/10 to-success/20", text: "text-success", icon: Star, sub: "Revenue Generated" }
          ].map((stat, i) => (
            <Card key={i} className={cn(
              "border-none shadow-xl shadow-black/5 bg-gradient-to-br backdrop-blur-xl hover:scale-[1.02] transition-all duration-300",
              stat.color
            )}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  <div className={cn("p-2 rounded-xl bg-white/50 shadow-sm", stat.text)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className={cn("text-3xl font-black", stat.text)}>{stat.value}</div>
                  <div className="h-1.5 w-1.5 rounded-full bg-foreground/20 animate-pulse" />
                </div>
                <p className="text-xs font-semibold text-muted-foreground/70 mt-1 uppercase tracking-tighter">
                  {stat.sub}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by company or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedStatus === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(null)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              All
            </Button>
            <Button
              variant={selectedStatus === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("new")}
            >
              New
            </Button>
            <Button
              variant={selectedStatus === "accepted" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("accepted")}
            >
              Accepted
            </Button>
            <Button
              variant={selectedStatus === "converted" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("converted")}
            >
              Converted
            </Button>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <Card
                key={lead.id}
                className="overflow-hidden hover:border-primary/50 transition-colors"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{lead.companyName}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {lead.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-bold text-primary">
                        {lead.score}
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{lead.freshness}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Signal */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Signal
                      </p>
                      <p className="text-sm">{lead.signal}</p>
                    </div>

                    {/* Products & Confidence */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Recommended Products
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {lead.products.map((product) => (
                            <Badge
                              key={product}
                              variant="secondary"
                              className="text-xs"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Confidence
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${lead.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {Math.round(lead.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Territory & Status */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Territory Officer
                        </p>
                        <p className="text-sm font-medium">{lead.territory}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <Badge
                          variant={
                            lead.status === "new" ? "default" : lead.status === "converted" ? "success" : "secondary"
                          }
                          className="capitalize"
                        >
                          {lead.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link to={`/lead/${lead.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1 justify-center"
                        >
                          View Dossier
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No leads found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedStatus(null);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

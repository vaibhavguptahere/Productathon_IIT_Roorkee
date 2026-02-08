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
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Search,
  MapPin,
  Zap,
  ExternalLink,
  Target,
  Brain,
  CheckCircle2,
  Building2,
  Copy,
  AlertTriangle,
  ShieldCheck,
  Clock,
  TrendingUp,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadDetail as LeadDetailType, LeadStatus } from "@shared/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function LeadDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const { data: lead, isLoading, isError } = useQuery<LeadDetailType>({
    queryKey: [`/api/leads/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/leads/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch lead details");
      }
      return response.json();
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: LeadStatus) => {
      const response = await fetch(`/api/leads/${id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      return response.json();
    },
    onSuccess: (updatedLead, variables) => {
      queryClient.setQueryData([`/api/leads/${id}`], updatedLead);
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast.success(`Status updated to ${variables}`);

      if (variables === "converted") {
        toast.info("AI Feedback Loop Triggered", {
          description: "Conversion signal sent to Inference Engine for model weight calibration."
        });
      }
    },
    onError: () => {
      toast.error("Failed to update lead status");
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 space-y-8">
          <Skeleton className="h-10 w-1/4" />
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-64 w-full sm:w-80" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center text-destructive">
          Failed to load lead details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        {/* Back Button */}
        <Link
          to="/leads"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>

        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {lead.companyName}
            </h1>
            <p className="text-muted-foreground mb-4">{lead.description}</p>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="text-primary border-primary/20">
                  {lead.industry}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {lead.subIndustry}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {lead.cin && (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-xs uppercase opacity-70">CIN:</span>
                    <span className="font-mono">{lead.cin}</span>
                  </div>
                )}
                {lead.gst && (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-xs uppercase opacity-70">GST:</span>
                    <span className="font-mono">{lead.gst}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Score Card */}
          <Card className="w-full sm:w-80 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Lead Score</span>
                  <span className="text-3xl font-bold text-primary">
                    {lead.inference?.score}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${lead.inference?.score}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="text-sm font-semibold">
                    {Math.round((lead.inference?.confidence || 0) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Territory Officer</p>
                  <p className="text-sm font-semibold">{lead.leads?.territory}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="mt-1 bg-accent text-accent-foreground uppercase text-[10px] px-1.5 py-0">
                    {lead.leads?.status}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  size="sm"
                  className="flex-1 gap-1"
                  variant="outline"
                  onClick={() => toast.info(`Initiating call to ${lead.companyName} procurement office...`)}
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-1"
                  variant="outline"
                  onClick={() => toast.info(`Drafting HPCL product proposal for ${lead.companyName}...`)}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-1 bg-green-600 hover:bg-green-700 text-white border-none"
                  variant="outline"
                  onClick={() => {
                    toast.success("WhatsApp Template Sent!", {
                      description: `Template: [HPCL_LEAD_ALERT] sent to Territory Officer ${lead.territory}. Contains Dossier Link.`
                    })
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
              <div className="space-y-3 mt-4">
                {lead.status === "new" && (
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-success hover:bg-success/90 text-white gap-2"
                      onClick={() => updateStatusMutation.mutate("accepted")}
                      disabled={updateStatusMutation.isPending}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Accept Lead
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-destructive border-destructive/50 hover:bg-destructive/10 gap-2"
                      onClick={() => updateStatusMutation.mutate("rejected")}
                      disabled={updateStatusMutation.isPending}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}

                {lead.status === "accepted" && (
                  <Button
                    className="w-full bg-success hover:bg-success/90 text-white gap-2"
                    onClick={() => updateStatusMutation.mutate("converted")}
                    disabled={updateStatusMutation.isPending}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {updateStatusMutation.isPending ? "Updating..." : "Mark as Converted"}
                  </Button>
                )}

                {lead.status === "converted" && (
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center">
                    <p className="text-sm font-semibold text-success flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Successfully Converted
                    </p>
                  </div>
                )}

                {lead.status === "rejected" && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                    <p className="text-sm font-semibold text-destructive">
                      Lead Rejected
                    </p>
                    <Button
                      variant="link"
                      className="text-xs h-auto p-0"
                      onClick={() => updateStatusMutation.mutate("new")}
                    >
                      Restore to New
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Inference Engine */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Inference Analysis
                </CardTitle>
                <CardDescription>
                  Product demand prediction with reasoning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {lead.inference?.uncertaintyFlag && (
                  <div className="rounded-lg bg-warning/10 p-3 border border-warning/20 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-warning">High Uncertainty Detected</p>
                      <p className="text-xs text-muted-foreground">Initial signals are vague. Proceed with onsite verification recommended.</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold mb-3">Why We Recommend These Products</p>
                  <ul className="space-y-2">
                    {lead.inference?.reasoning?.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold mb-3">Top Recommended Products</p>
                  <div className="space-y-3">
                    {lead.inference?.topProducts?.map((product) => (
                      <div key={product.name} className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium">{product.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {product.confidence}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {product.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Operating Facilities
                </CardTitle>
                <CardDescription>Manufacturing and distribution infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lead.facilities?.map((facility) => (
                    <div
                      key={facility.name}
                      className="rounded-lg border border-border p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{facility.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {facility.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs uppercase text-[10px] px-1.5 py-0">
                          {facility.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Capacity</p>
                          <p className="font-medium">{facility.capacity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Products</p>
                          <p className="font-medium">{facility.products}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Web Signals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Detected Web Signals
                </CardTitle>
                <CardDescription>
                  Extracted from monitored sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lead.signals?.map((signal) => (
                    <div
                      key={signal.id}
                      className="rounded-lg border border-border p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{signal.title}</p>
                            <Badge
                              variant={
                                signal.relevance === "Critical"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs uppercase text-[10px] px-1.5 py-0"
                            >
                              {signal.relevance}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {signal.source} • {signal.date}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {signal.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Lead Scoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Lead Scoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Intent Strength</p>
                    <Badge variant="outline" className="text-xs uppercase text-[10px] px-1.5 py-0">{lead.leads?.intent}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Explicit tender vs News mention
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Signal Freshness</p>
                    <Badge variant="outline" className="text-xs uppercase text-[10px] px-1.5 py-0">{lead.leads?.freshness}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recently detected
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Company Size</p>
                    <Badge variant="outline" className="text-xs uppercase text-[10px] px-1.5 py-0">{lead.leads?.size}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on market data
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Geographic Proximity</p>
                    <Badge variant="outline" className="text-xs uppercase text-[10px] px-1.5 py-0">{lead.leads?.proximity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    To HPCL DSRO
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">Scoring Breakdown (HPCL Formula)</p>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase">
                        <span>Intent Strength (40%)</span>
                        <span className="font-bold">95/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '95%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase">
                        <span>Signal Freshness (30%)</span>
                        <span className="font-bold">80/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '80%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase">
                        <span>Geo Proximity (30%)</span>
                        <span className="font-bold">90/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Estimation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Market Estimation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Estimated Annual Consumption
                  </p>
                  <p className="font-semibold">{lead.estimations?.annualConsumption}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Market Potential
                  </p>
                  <p className="font-semibold">{lead.estimations?.marketPotential}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Buying Cycle
                  </p>
                  <p className="font-semibold">{lead.estimations?.buyingCycle}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    Key Decision Makers
                  </p>
                  <p className="text-sm">{lead.estimations?.decisionMakers}</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Best Action */}
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-lg">Next Best Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{lead.leads?.nextBestAction}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-1" variant="outline">
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-2"
                    onClick={() => copyToClipboard(lead.leads?.nextBestAction || "")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Source Registry */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-success" />
                  Source Registry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Primary Source</p>
                  <p className="font-medium">{lead.sourceRegistry?.domain}</p>
                  <Badge variant="secondary" className="mt-2 text-[10px] uppercase">{lead.sourceRegistry?.type}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground">Trust Score</p>
                    <p className="text-sm font-bold">{lead.sourceRegistry?.trustScore}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground">Frequency</p>
                    <p className="text-sm font-bold">{lead.sourceRegistry?.crawlFrequency}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-[10px] uppercase text-muted-foreground mb-1">Last Intelligence Sync</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3" />
                    {lead.sourceRegistry?.lastSync ? new Date(lead.sourceRegistry.lastSync).toLocaleString() : "Sync pending..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Flame,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  Brain,
  Clock,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-48">
        {/* Immersive Mesh Gradient Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/5 backdrop-blur-md px-4 py-1.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-primary/50 to-secondary/50" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground/80">
                Trusted by <span className="text-primary">150+</span> Territory Officers
              </span>
              <div className="h-4 w-px bg-border mx-1" />
              <Zap className="h-3.5 w-3.5 text-accent animate-pulse" />
            </div>

            <h1 className="mb-8 text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
              Intelligence that <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">
                Powers Progress.
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground/90 sm:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              UrjaSetu bridges the discovery gap. We scan millions of data points across the web to pinpoint exactly where your next high-volume fuel deal resides.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Link to="/dashboard">
                <Button size="xl" className="h-14 px-8 rounded-full text-lg font-bold shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 transition-all duration-300 gap-3 group">
                  Enter Command Center
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {session ? (
                <Link to="/dashboard">
                  <Button variant="ghost" size="xl" className="h-14 px-8 rounded-full text-lg font-semibold hover:bg-muted transition-all duration-300">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="xl" className="h-14 px-8 rounded-full text-lg font-semibold hover:bg-muted transition-all duration-300">
                    Officer Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Floating Dashboard Preview Logic */}
          <div className="mt-20 relative mx-auto max-w-5xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-[0_32px_128px_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 flex flex-col items-center justify-center gap-6 group-hover:scale-[1.01] transition-transform duration-700">
                <div className="flex items-center gap-4 p-6 bg-background/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <BarChart3 className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-foreground/20 rounded-full animate-pulse" />
                    <div className="h-3 w-48 bg-foreground/10 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 w-40 bg-white/5 border border-white/5 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <div className="text-muted-foreground/50 font-mono text-xs tracking-widest uppercase">
                  UrjaSetu Simulation Mode :: Active
                </div>
              </div>

              {/* Visual Glow */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/40 transition-colors duration-700" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[100px] pointer-events-none group-hover:bg-secondary/40 transition-colors duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* The Gap We Close */}
      <section className="relative py-24 sm:py-32 border-t border-white/5 bg-muted/20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h2 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl uppercase italic">
              The Sales <span className="text-primary">Discovery Gap</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Why traditional sales models miss ₹400Cr+ in annual procurement signals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: AlertCircle, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20", title: "Missing Signals", desc: "Expansions and tenders go undetected until competitors have already engaged." },
              { icon: Clock, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20", title: "Delayed Response", desc: "Manual discovery is too slow. UrjaSetu identifies buyers in milliseconds." },
              { icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", title: "Inference Engine", desc: "We don't just find names; we predict specific fuel needs with 92% accuracy." }
            ].map((feature, i) => (
              <div key={i} className={cn(
                "group relative p-8 rounded-[32px] border bg-background/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden",
                feature.border
              )}>
                <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6 transition-transform duration-500 group-hover:rotate-12", feature.bg)}>
                  <feature.icon className={cn("h-8 w-8", feature.color)} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>

                {/* Decorative Element */}
                <div className={cn("absolute -bottom-4 -right-4 h-24 w-24 rounded-full blur-[40px] opacity-20", feature.bg)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-pulse" />
          <div className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              How UrjaSetu Works
            </h2>
            <p className="text-lg text-muted-foreground">
              End-to-end lead intelligence system powered by web monitoring, AI
              inference, and automated routing
            </p>
          </div>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center animate-slide-up">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-all">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Web Intelligence & Signal Discovery
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Continuously monitors company websites, news articles, government
                  tenders (GeM, e-procurement), industry directories, and public
                  filings. Respects robots.txt, ToS, and rate limits. Every signal
                  is timestamped, sourced, and maintained in an audit trail.
                </p>
                <div className="space-y-2">
                  {["News & Press Releases", "Government Tenders", "Public Filings"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3 p-2 rounded hover:bg-primary/10 transition-colors">
                      <div className="mt-1 h-2 w-2 rounded-full bg-success shrink-0 animate-pulse" />
                      <div>
                        <p className="font-medium">Power Plant Expansion</p>
                        <p className="text-xs text-muted-foreground">from techcrunch.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded hover:bg-accent/10 transition-colors">
                      <div className="mt-1 h-2 w-2 rounded-full bg-accent shrink-0 animate-pulse" style={{ animationDelay: "0.3s" }} />
                      <div>
                        <p className="font-medium">Tender for Industrial Fuels</p>
                        <p className="text-xs text-muted-foreground">from gem.gov.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded hover:bg-warning/10 transition-colors">
                      <div className="mt-1 h-2 w-2 rounded-full bg-warning shrink-0 animate-pulse" style={{ animationDelay: "0.6s" }} />
                      <div>
                        <p className="font-medium">New Plant Setup</p>
                        <p className="text-xs text-muted-foreground">from company website</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="order-2 md:order-1 flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="rounded-lg border border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/5 p-8 hover:border-secondary/50 transition-all hover:shadow-lg hover:shadow-secondary/20">
                  <div className="space-y-4">
                    <div className="rounded border border-secondary/30 bg-gradient-to-r from-secondary/10 to-transparent p-3 hover:border-secondary/50 transition-colors">
                      <p className="text-xs font-mono text-foreground font-semibold">
                        Company: Deepak Fertilizers
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">
                        Industry: Chemicals & Fertilizers
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">
                        Facilities: 3 plants (Maharajganj, Talcher, Muddypur)
                      </p>
                    </div>
                    <div className="rounded border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent p-3 hover:border-accent/50 transition-colors">
                      <p className="text-xs font-mono text-muted-foreground">
                        Confidence: <span className="text-secondary font-bold">94%</span>
                      </p>
                      <p className="text-xs font-mono text-primary font-semibold">
                        Recommended: FO, HSD, LDO
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex flex-col justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 hover:from-secondary/30 hover:to-secondary/20 transition-all">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Product-Need Inference Engine
                </h3>
                <p className="mb-4 text-muted-foreground">
                  AI extracts operational cues (boilers, furnaces, gensets, captive
                  power plants, shipping ops) and keywords to infer HPCL product
                  demand. Returns top 3 product recommendations with human-readable
                  reason codes and confidence scores.
                </p>
                <div className="space-y-2">
                  {["Industrial Fuels", "Specialty Products", "Confidence Scoring"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 transition-all">
                  <Flame className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Lead Scoring & Intelligent Routing
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Every lead is scored using intent strength (explicit tender vs.
                  vague news), signal freshness, company size proxy, and geographic
                  proximity to HPCL DSRO/depot. Auto-assigns leads to local sales
                  officers using territory rules.
                </p>
                <div className="space-y-2">
                  {["Intent Scoring", "Auto-Assignment", "Territory Optimization"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="w-full rounded-lg border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Lead Score</span>
                      <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">8.7/10</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full bg-gradient-to-r from-accent via-primary to-secondary animate-pulse"
                        style={{ width: "87%" }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-primary/5 hover:bg-primary/10 transition-colors">
                        <p className="text-muted-foreground">Intent</p>
                        <p className="font-semibold text-primary">Tender</p>
                      </div>
                      <div className="p-2 rounded bg-accent/5 hover:bg-accent/10 transition-colors">
                        <p className="text-muted-foreground">Freshness</p>
                        <p className="font-semibold text-accent">2 days</p>
                      </div>
                      <div className="p-2 rounded bg-secondary/5 hover:bg-secondary/10 transition-colors">
                        <p className="text-muted-foreground">Proximity</p>
                        <p className="font-semibold text-secondary">15km</p>
                      </div>
                      <div className="p-2 rounded bg-primary/5 hover:bg-primary/10 transition-colors">
                        <p className="text-muted-foreground">Assigned To</p>
                        <p className="font-semibold">Rajesh K.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HPCL Products Matched */}
      <section className="border-t border-border bg-card py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              HPCL Product Coverage
            </h2>
            <p className="text-lg text-muted-foreground">
              System infers demand across our full Direct Sales portfolio
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Industrial Fuels", products: "MS, HSD, LDO, FO, LSHS, SKO" },
              {
                name: "Specialty Products",
                products: "Hexane, Solvent 1425, MTO, Jute Batch Oil",
              },
              { name: "Other DS Products", products: "Bitumen, Bunker, Sulphur" },
            ].map((category) => (
              <div
                key={category.name}
                className="rounded-lg border border-border bg-background p-6"
              >
                <h3 className="mb-2 font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.products}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-First Sales Workflow */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-pulse" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mobile-First Sales Workflow
            </h2>
            <p className="text-lg text-muted-foreground">
              Field officers get structured leads with one-tap actions
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: AlertCircle,
                title: "New Leads Queue",
                desc: "Fresh leads ranked by score",
                color: "from-accent/10 to-accent/5",
                borderColor: "border-accent/30",
              },
              {
                icon: BarChart3,
                title: "Full Dossier View",
                desc: "Company profile, procurement clues",
                color: "from-secondary/10 to-secondary/5",
                borderColor: "border-secondary/30",
              },
              {
                icon: Smartphone,
                title: "One-Tap Actions",
                desc: "Call, email, schedule meeting",
                color: "from-primary/10 to-primary/5",
                borderColor: "border-primary/30",
              },
              {
                icon: TrendingUp,
                title: "Lead Updates",
                desc: "Track status and feedback",
                color: "from-secondary/10 to-accent/5",
                borderColor: "border-secondary/30",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-lg border ${feature.borderColor} bg-gradient-to-br ${feature.color} p-6 text-center hover:border-opacity-60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <Icon className="mb-4 h-8 w-8 text-primary mx-auto" />
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="border-t border-border bg-card py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Why HPCL Needs UrjaSetu
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Convert Early-Stage Signals",
                desc: "Capture expanding companies, new plants, active tenders before competitors",
              },
              {
                icon: Zap,
                title: "Reduce False Positives",
                desc: "AI-powered inference + confidence scoring ensures high-quality leads",
              },
              {
                icon: MapPin,
                title: "Accelerate Territory Closure",
                desc: "Auto-route to local sales officers with context and urgency signals",
              },
              {
                icon: TrendingUp,
                title: "Learn & Improve Continuously",
                desc: "Feedback loop refines scoring, inference, and reduces future false positives",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <Icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-accent/8 to-secondary/8" />
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container">
          <div className="mx-auto max-w-2xl text-center animate-slide-up">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Ready to Transform Lead Discovery?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Deploy UrjaSetu today and start converting public signals into
              high-confidence, actionable leads for your field officers.
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                Access Your Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="font-semibold">UrjaSetu</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HPCL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Legend
} from "recharts";
import {
  History,
  Activity,
  Timer,
  BarChart3,
  CalendarDays
} from "lucide-react";

const performanceData = [
  { name: "Jan", discovery: 85, conversion: 15 },
  { name: "Feb", discovery: 120, conversion: 22 },
  { name: "Mar", discovery: 150, conversion: 35 },
  { name: "Apr", discovery: 140, conversion: 30 },
  { name: "May", discovery: 190, conversion: 45 },
  { name: "Jun", discovery: 210, conversion: 52 },
];

const officerPerformance = [
  { name: "Rajesh K.", leads: 84, score: 92 },
  { name: "Priya S.", leads: 72, score: 88 },
  { name: "Vikram P.", leads: 65, score: 85 },
  { name: "Rakesh S.", leads: 58, score: 79 },
  { name: "Sanjay M.", leads: 42, score: 94 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Strategic Insights</h1>
          <p className="text-muted-foreground">
            Granular lead performance metrics and organizational discovery trends
          </p>
        </div>

        {/* Analytics Top Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Lead Score</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88.4</div>
              <p className="text-xs text-muted-foreground mt-1">
                +4.2% from previous quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              <Timer className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8 Days</div>
              <p className="text-xs text-muted-foreground mt-1">
                Target: 2.0 days (Achieved ✅)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Integrity Score</CardTitle>
              <History className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.8%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Verified against 12 signal sources
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Discovery over time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Discovery vs Conversion Cycle</CardTitle>
            <CardDescription>Monthly growth in AI-detected leads and subsequent sales conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="discovery" stroke="#2563eb" strokeWidth={3} name="New Leads" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="conversion" stroke="#16a34a" strokeWidth={3} name="Conversions" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Territory Officer Performance</CardTitle>
              <CardDescription>Top performing officers by lead engagement and quality score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={officerPerformance}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#3b82f6" name="Total Engagement" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="score" fill="#93c5fd" name="Success Score" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit & Compliance Log Summary</CardTitle>
              <CardDescription>Recent automated system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {[
                  { event: "Ingestion Engine Sync", time: "10 mins ago", status: "Success", icon: CalendarDays },
                  { event: "Entity Resolution (340 nodes)", time: "1 hour ago", status: "Success", icon: Activity },
                  { event: "Product Inference Model Retrain", time: "4 hours ago", status: "Pending", icon: History },
                  { event: "Notification Dispatch (WhatsApp)", time: "6 hours ago", status: "Success", icon: Timer },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <log.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{log.event}</p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold ${log.status === "Success" ? "text-success" : "text-warning"}`}>
                      {log.status}
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

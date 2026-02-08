import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backLink?: string;
  backLinkText?: string;
}

export function PlaceholderPage({
  title,
  description,
  icon,
  backLink = "/",
  backLinkText = "Back to Home",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 md:py-16">
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLinkText}
        </Link>

        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-12 text-center">
          <div className="mb-6 flex justify-center text-primary">
            {icon}
          </div>

          <h1 className="mb-4 text-3xl font-bold">{title}</h1>

          <p className="mb-8 text-lg text-muted-foreground">{description}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/">
              <Button variant="outline">Go to Home</Button>
            </Link>
            <Link to="/leads">
              <Button>View Leads Dashboard</Button>
            </Link>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <p className="mb-4 text-sm text-muted-foreground">
              Want to add content to this page?
            </p>
            <p className="text-sm">
              Continue describing your requirements in the chat to have this page built out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

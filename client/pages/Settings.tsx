import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings & Configuration"
      description="Configure territory rules, notification preferences, source monitoring settings, and API integrations"
      icon={<Settings className="h-16 w-16" />}
      backLink="/"
      backLinkText="Back to Home"
    />
  );
}

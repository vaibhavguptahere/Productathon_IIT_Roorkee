/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export type LeadStatus = "new" | "accepted" | "rejected" | "converted";

export interface Lead {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  signal: string;
  products: string[];
  score: number;
  freshness: string;
  status: LeadStatus;
  territory: string;
  confidence: number;
}

export interface Facility {
  name: string;
  location: string;
  type: string;
  capacity: string;
  products: string;
}

export interface WebSignal {
  id: string;
  type: string;
  title: string;
  source: string;
  date: string;
  content: string;
  relevance: string;
  provenance: string; // URL or document link
}

export interface ProductRecomendation {
  name: string;
  confidence: number;
  reason: string;
}

export interface SourceMetadata {
  domain: string;
  type: "news" | "tender" | "corporate" | "directory" | "ai-inference";
  trustScore: number;
  crawlFrequency: string;
  lastSync: string;
}

export interface LeadDetail extends Lead {
  description: string;
  subIndustry: string;
  website: string;
  cin?: string;
  gst?: string;
  sourceTrustScore: number;
  sourceRegistry: SourceMetadata;
  facilities: Facility[];
  signals: WebSignal[];
  inference: {
    score: number;
    confidence: number;
    reasoning: string[];
    topProducts: ProductRecomendation[];
    uncertaintyFlag: boolean;
  };
  estimations: {
    annualConsumption: string;
    marketPotential: string;
    buyingCycle: string;
    decisionMakers: string;
  };
  leads: {
    score: number;
    intent: string;
    freshness: string;
    size: string;
    proximity: string;
    status: LeadStatus;
    territory: string;
    nextBestAction: string;
  };
}

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

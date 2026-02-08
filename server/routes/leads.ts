import { RequestHandler } from "express";
import { Lead, LeadDetail, LeadStatus } from "@shared/api";
import { generateLeads } from "../lib/groq";

// Initial mock data from the frontend
let leads: Lead[] = [
    {
        id: "1",
        companyName: "Deepak Fertilizers & Petrochemicals",
        industry: "Chemicals & Fertilizers",
        location: "Talcher, Odisha",
        signal: "Boiler expansion + FO & LSHS procurement tender",
        products: ["FO", "HSD", "LSHS"],
        score: 94,
        freshness: "2 days",
        status: "new",
        territory: "Rajesh Kumar",
        confidence: 0.94,
    },
    {
        id: "2",
        companyName: "JSW Steel Limited",
        industry: "Steel & Manufacturing",
        location: "Bellary, Karnataka",
        signal: "New furnace installation - Furnace Oil demand increase",
        products: ["FO", "MS", "LSS"],
        score: 87,
        freshness: "3 days",
        status: "new",
        territory: "Priya Sharma",
        confidence: 0.87,
    },
    {
        id: "3",
        companyName: "Shipping Corporation of India",
        industry: "Shipping & Marine",
        location: "Mumbai, Maharashtra",
        signal: "Fleet expansion - Bunker fuel procurement",
        products: ["Marine Fuels", "HSD", "Bunker Fuels"],
        score: 82,
        freshness: "5 days",
        status: "new",
        territory: "Vikram Patel",
        confidence: 0.82,
    },
    {
        id: "4",
        companyName: "NHAI Highway Project",
        industry: "Infrastructure",
        location: "Noida-Agra Expressway",
        signal: "Road development project - Bitumen and HSD demand",
        products: ["Bitumen", "HSD", "LDO"],
        score: 91,
        freshness: "1 day",
        status: "new",
        territory: "Rajesh Kumar",
        confidence: 0.91,
    },
    {
        id: "5",
        companyName: "Birla Century Textiles",
        industry: "Chemicals & Textiles",
        location: "Bharuch, Gujarat",
        signal: "Expansion of processing unit - MTO and Hexane requirement",
        products: ["MTO", "Hexane", "LDO"],
        score: 78,
        freshness: "1 week",
        status: "accepted",
        territory: "Rakesh Singh",
        confidence: 0.78,
    },
];

const LEAD_DETAILS: Record<string, Partial<LeadDetail>> = {
    "1": {
        description: "Deepak Fertilizers and Petrochemicals Corporation Ltd (DFPCL) is one of India's leading producers of fertilizers and industrial chemicals.",
        subIndustry: "Industrial Chemicals",
        website: "https://www.dfpcl.com",
        cin: "L24121MH1979PLC021360",
        gst: "27AAACD7890F1Z1",
        sourceTrustScore: 95,
        sourceRegistry: {
            domain: "tenderbulletin.com",
            type: "tender",
            trustScore: 98,
            crawlFrequency: "Daily",
            lastSync: new Date().toISOString()
        },
        facilities: [
            { name: "Taloja Plant", location: "Maharashtra", type: "Fertilizer Complex", capacity: "1.2 Million MT", products: "AN, Nitric Acid" },
            { name: "Srikakulam Unit", location: "Andhra Pradesh", type: "Chemical Plant", capacity: "0.5 Million MT", products: "Nitric Acid" }
        ],
        signals: [
            {
                id: "s1",
                type: "Tender",
                title: "Procurement of Furnace Oil & LSHS",
                source: "National Tender Portal",
                date: "2024-05-15",
                content: "Public tender issued for the annual supply of 50,000 MT of Furnace Oil and Low Sulphur Heavy Stock for boiler operations at Taloja.",
                relevance: "Critical",
                provenance: "https://tenders.gov.in/view/s1"
            }
        ],
        inference: {
            score: 94,
            confidence: 96,
            reasoning: [
                "Boiler expansion detected in Q1 report",
                "High-volume tender issued for fuel procurement",
                "Historical preference for HPCL FO/LSHS"
            ],
            topProducts: [
                { name: "FO (Furnace Oil)", confidence: 98, reason: "Direct match with tender specifications" },
                { name: "LSHS", confidence: 92, reason: "Alternative fuel requirement noted in logistics memo" },
                { name: "HSD", confidence: 75, reason: "Back-up power (Genset) demand correlation" }
            ],
            uncertaintyFlag: false
        },
        estimations: {
            annualConsumption: "45,000 MT",
            marketPotential: "₹180 Cr",
            buyingCycle: "Annual Tender",
            decisionMakers: "Head of Procurement, VP Operations"
        },
        leads: {
            score: 94,
            intent: "High (Tender)",
            freshness: "2 days",
            size: "Large Enterprise",
            proximity: "45km (Taloja Depot)",
            status: "new",
            territory: "Rajesh Kumar",
            nextBestAction: "Review tender documents and prepare price bid for FY24-25 supply."
        }
    },
    "2": {
        description: "JSW Steel is a leading integrated steel manufacturer with a strong presence in Karnataka and Maharashtra.",
        subIndustry: "Steel & Metallurgy",
        website: "https://www.jsw.in",
        cin: "L27102MH1994PLC152925",
        gst: "29AAACJ3245B1Z9",
        sourceTrustScore: 92,
        sourceRegistry: {
            domain: "metalnews.com",
            type: "news",
            trustScore: 90,
            crawlFrequency: "Daily",
            lastSync: new Date().toISOString()
        },
        facilities: [
            { name: "Vijayanagar Steel Works", location: "Bellary, Karnataka", type: "Integrated Steel Plant", capacity: "12 MTPA", products: "HR Coils, Pellets" }
        ],
        signals: [
            {
                id: "s2",
                type: "Expansion",
                title: "Furnace Unit #4 Operational",
                source: "Metal News Network",
                date: "2024-05-18",
                content: "JSW Bellary operations expand with a new furnace unit requiring consistent Fuel Oil supply for thermal processing.",
                relevance: "High",
                provenance: "https://metalnews.com/jsw-furnace-4"
            }
        ],
        inference: {
            score: 87,
            confidence: 89,
            reasoning: [
                "New furnace unit operational",
                "High demand for Furnace Oil for metal processing",
                "Large logistics fleet requiring HSD"
            ],
            topProducts: [
                { name: "FO", confidence: 95, reason: "Primary fuel for furnace thermal operations" },
                { name: "MS", confidence: 80, reason: "Logistics and corporate fleet usage" },
                { name: "HSD", confidence: 88, reason: "Heavy plant machinery and backup power" }
            ],
            uncertaintyFlag: false
        },
        estimations: {
            annualConsumption: "85,000 MT",
            marketPotential: "₹340 Cr",
            buyingCycle: "Quarterly Review",
            decisionMakers: "Plant Director, Supply Chain Head"
        },
        leads: {
            score: 87,
            intent: "Medium-High",
            freshness: "3 days",
            size: "Navratna Style Conglomerate",
            proximity: "60km (Bellary Depot)",
            status: "new",
            territory: "Priya Sharma",
            nextBestAction: "Present a volume-based discount proposal for FO supply to the new furnace unit."
        }
    },
    "4": {
        description: "National Highways Authority of India (NHAI) road expansion project under Bharatmala Pariyojana.",
        subIndustry: "Infrastructure",
        website: "https://nhai.gov.in",
        cin: "STATE-GOV-U001",
        gst: "09AAAGN1234A1Z5",
        sourceTrustScore: 100,
        sourceRegistry: {
            domain: "nhai.gov.in",
            type: "corporate",
            trustScore: 100,
            crawlFrequency: "Weekly",
            lastSync: new Date().toISOString()
        },
        facilities: [
            { name: "Agra Highway Section", location: "UP", type: "Project Site", capacity: "200 KM", products: "Bitumen, Diesel" }
        ],
        signals: [
            {
                id: "s4",
                type: "Project Launch",
                title: "Noida-Agra Expressway Phase II",
                source: "Infrastructure News Network",
                date: "2024-05-20",
                content: "Breaking: NHAI approves Phase II of Noida-Agra expressway. Procurement of bitumen and paving materials to begin immediately.",
                relevance: "Critical",
                provenance: "https://infranews.com/nhai-ag-p2"
            }
        ],
        inference: {
            score: 91,
            confidence: 94,
            reasoning: [
                "New highway project approved in current territory",
                "Bitumen demand is direct and immediate for paving",
                "Large HSD requirement for heavy machinery"
            ],
            topProducts: [
                { name: "Bitumen (VG-30/VG-40)", confidence: 99, reason: "Primary material for road construction" },
                { name: "HSD", confidence: 90, reason: "Heavy machinery and logistics fuel" },
                { name: "LDO", confidence: 65, reason: "Supporting auxiliary power units" }
            ],
            uncertaintyFlag: false
        },
        estimations: {
            annualConsumption: "12,000 MT",
            marketPotential: "₹65 Cr",
            buyingCycle: "Project Phase",
            decisionMakers: "Project Director NHAI, Chief Engineer"
        },
        leads: {
            score: 91,
            intent: "Explicit (Project)",
            freshness: "1 day",
            size: "Government Body",
            proximity: "15km (Agra Depot)",
            status: "new",
            territory: "Rajesh Kumar",
            nextBestAction: "Contact the Project Director to empanel HPCL as the primary bitumen supplier."
        }
    }
};

export const handleGetLeads: RequestHandler = (req, res) => {
    res.json(leads);
};

export const handleGetLeadById: RequestHandler = (req, res) => {
    const { id } = req.params;
    const lead = leads.find((l) => l.id === id);
    if (!lead) {
        res.status(404).json({ message: "Lead not found" });
        return;
    }

    const defaultDetail: Partial<LeadDetail> = {
        description: "Company details are being analyzed by AI intelligence engine...",
        subIndustry: lead.industry,
        website: "www.hpcl.co.in",
        cin: "ANALYSIS-PENDING",
        gst: "ANALYSIS-PENDING",
        sourceTrustScore: 85,
        sourceRegistry: {
            domain: "hpcl-intelligence.internal",
            type: "corporate",
            trustScore: 100,
            crawlFrequency: "Real-time",
            lastSync: new Date().toISOString()
        },
        facilities: [],
        signals: [],
        inference: {
            score: lead.score,
            confidence: lead.confidence,
            reasoning: ["Initial signal detection active", "Awaiting deep-scrape entity resolution"],
            topProducts: lead.products.map(p => ({
                name: p,
                confidence: 70,
                reason: `Detected in initial web signal for ${lead.companyName}`
            })),
            uncertaintyFlag: true
        },
        estimations: {
            annualConsumption: "TBD",
            marketPotential: "Analyzing...",
            buyingCycle: "Unknown",
            decisionMakers: "Researching..."
        },
        leads: {
            ...lead,
            intent: "Detected",
            size: "Medium-Large (Est)",
            proximity: "Unknown",
            nextBestAction: "Awaiting AI prioritization..."
        }
    };

    const detail = LEAD_DETAILS[id as string] || {};
    res.json({ ...lead, ...defaultDetail, ...detail });
};

export const handleUpdateLeadStatus: RequestHandler = (req, res) => {
    const { id } = req.params;
    const { status } = req.body as { status: LeadStatus };

    const leadIndex = leads.findIndex((l) => l.id === id);
    if (leadIndex === -1) {
        res.status(404).json({ message: "Lead not found" });
        return;
    }

    leads[leadIndex] = { ...leads[leadIndex], status };
    res.json(leads[leadIndex]);
};

export const handleScanLeads: RequestHandler = async (req, res) => {
    try {
        const { industry } = req.body;
        const newLeadsRaw = await generateLeads(industry || "Manufacturing");

        // Transform and add to local store
        const newLeads: Lead[] = newLeadsRaw.map((l: any) => ({
            ...l,
            id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Ensure unique ID
            status: "new",
            territory: "Unassigned",
            confidence: l.confidence || 0.85
        }));

        // Prepend to leads list (newest first)
        leads = [...newLeads, ...leads];

        // Populate mock details for these new leads so they don't crash the UI when clicked
        newLeads.forEach(lead => {
            LEAD_DETAILS[lead.id] = {
                description: `AI Detected Opportunity: ${lead.companyName} is showing strong signals for ${lead.signal}.`,
                subIndustry: lead.industry,
                website: "https://www.google.com/search?q=" + encodeURIComponent(lead.companyName),
                cin: "AI-PENDING-VERIFICATION",
                gst: "AI-PENDING-VERIFICATION",
                sourceTrustScore: 88,
                sourceRegistry: {
                    domain: "groq-intelligence-network",
                    type: "ai-inference",
                    trustScore: 90,
                    crawlFrequency: "Real-time",
                    lastSync: new Date().toISOString()
                },
                facilities: [],
                signals: [{
                    id: `sig-${lead.id}`,
                    type: "AI_Signal",
                    title: `AI Alert: ${lead.signal}`,
                    source: "Groq Llama-3 Inference Engine",
                    date: new Date().toISOString().split('T')[0],
                    content: `Real-time web signal detected indicative of ${lead.signal}. High product fit for ${lead.products.join(", ")}.`,
                    relevance: "High",
                    provenance: "ai-generated"
                }],
                inference: {
                    score: lead.score,
                    confidence: lead.confidence,
                    reasoning: ["Live signal detected via Groq API", "High keyword correlation with HPCL product portfolio"],
                    topProducts: lead.products.map(p => ({ name: p, confidence: 90, reason: "AI Product Matching" })),
                    uncertaintyFlag: true
                },
                estimations: {
                    annualConsumption: "Estimating...",
                    marketPotential: "Calculating...",
                    buyingCycle: "Unknown",
                    decisionMakers: "Unknown"
                },
                leads: { ...lead, nextBestAction: "Verify lead details and assign territory." }
            };
        });

        res.json({ success: true, count: newLeads.length, leads: newLeads });
    } catch (error) {
        console.error("Scan failed:", error);
        res.status(500).json({ message: "Failed to generate leads via AI" });
    }
};


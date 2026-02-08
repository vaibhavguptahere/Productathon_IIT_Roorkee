import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "gsk_placeholder", // Fallback to prevent immediate crash if env missing
});

export async function generateLeads(industry: string = "Manufacturing") {
    const prompt = `
    You are an advanced industrial intelligence AI for HPCL (Hindustan Petroleum).
    Generate 3 distinct, high-value sales leads in the "${industry}" sector in India.
    
    For each lead, realistic data is required for:
    - Company Expansion/Project (e.g., "New Boiler Unit", "Road Construction")
    - HPCL Product Fit (Furnace Oil, Bitumen, HSD, LDO)
    - Specific location in India
    
    Return ONLY a JSON array with objects matching this interface:
    {
      id: string (unique),
      companyName: string,
      industry: string,
      location: string,
      signal: string (the expansion/tender news),
      products: string[],
      score: number (1-100),
      freshness: string (e.g. "2 hrs ago"),
      status: "new",
      territory: "Unassigned",
      confidence: number (0.1-1.0)
    }
  `;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a JSON-only API. Return strict JSON." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) return [];

        // Parse the response, handling potential wrapping in { "leads": [...] } or raw array
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : (parsed.leads || parsed.data || []);
    } catch (error) {
        console.error("Groq AI Error:", error);
        return [];
    }
}

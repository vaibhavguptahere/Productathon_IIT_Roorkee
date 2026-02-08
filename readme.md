# 🚀 UrjaSetu — Industrial Demand Intelligence Platform

> **From Lead Detection → To Market Intelligence**

UrjaSetu is an AI-powered **B2B Lead Intelligence Platform** that detects emerging industrial fuel demand signals and converts them into prioritized, revenue-focused sales opportunities.

Built for the **IIT Roorkee E-Summit Productathon**, this platform transforms traditional relationship-driven fuel sales into a **predictive, intelligence-led growth engine.**

---

# 🧠 Problem Statement

Industrial fuel suppliers often discover demand too late — after competitors have already entered the conversation.

The challenge is to:

| Challenge                 | Impact                     |
| ------------------------- | -------------------------- |
| Late demand discovery     | Lost revenue opportunities |
| Relationship-driven sales | Poor scalability           |
| Lack of intelligence      | Reactive decision-making   |
| No prioritization         | Wasted sales effort        |

---

# 💡 Our Solution

UrjaSetu acts as an **Industrial Demand Radar**, continuously analyzing public signals such as:

* Company expansions
* Infrastructure projects
* Shipping activity
* Tenders
* Manufacturing growth

The system converts raw signals into **actionable lead intelligence** — allowing sales teams to move before the market reacts.

---

# ⭐ Key Differentiator — Strategic Intelligence Layer

Most tools detect leads.

👉 **UrjaSetu predicts where the market is moving.**

| Traditional Tools | UrjaSetu                |
| ----------------- | ----------------------- |
| Reactive insights | Predictive intelligence |
| Lead lists        | Market signals          |
| Static dashboards | Live opportunity radar  |
| Data-heavy        | Decision-focused        |

---

# 🖼 Product Screenshots

## 🔹 Command Center

> A mission-control style dashboard providing a real-time view of industrial demand signals.

---

## 🔹 Opportunity Radar


> Detect emerging fuel demand zones and identify high-opportunity sectors instantly.

---

## 🔹 AI Lead Dossier

> Complete company intelligence including signals, product recommendations, revenue estimates, and next actions.

---

## 🔹 Strategic Intelligence Dashboard


> Executive-ready insights highlighting market shifts and growth sectors.

---

# 🧭 Product Workflow

```
Signal Detection → AI Analysis → Product Mapping → Lead Scoring
→ Revenue Estimation → Sales Action → Feedback Loop
```

| Stage              | What Happens                       | Business Value         |
| ------------------ | ---------------------------------- | ---------------------- |
| Signal Detection   | Monitor public industrial activity | Early awareness        |
| AI Analysis        | Extract operational clues          | Smart targeting        |
| Product Mapping    | Match needs to fuel products       | Relevant outreach      |
| Lead Scoring       | Rank opportunities                 | Focus sales effort     |
| Revenue Estimation | Predict deal size                  | Executive clarity      |
| Feedback Loop      | Learn from outcomes                | Continuous improvement |

---

# ⚙️ Core Features

## 🛰 Opportunity Radar

A live intelligence panel highlighting emerging industrial demand signals.

## 🤖 AI Lead Intelligence

| Capability         | Description                              |
| ------------------ | ---------------------------------------- |
| Signal Extraction  | Detect infrastructure & procurement cues |
| Explainable AI     | Provide reason codes                     |
| Confidence Scoring | Rank likelihood of conversion            |
| Product Mapping    | Recommend top fuel products              |

---

## 📊 Strategic Intelligence Dashboard

Executive-ready insights including:

* Fastest growing sectors
* Highest demand products
* Opportunity-rich regions

### Example Insights

| Insight                          | Meaning                       |
| -------------------------------- | ----------------------------- |
| Bitumen demand rising            | Infrastructure boom detected  |
| Marine fuel activity increasing  | Shipping expansion underway   |
| Manufacturing fuel needs growing | Industrial capacity expanding |

---

## 📁 Lead Dossier

Each lead includes:

| Component            | Purpose                   |
| -------------------- | ------------------------- |
| Company Overview     | Quick business context    |
| Procurement Signals  | Identify buying triggers  |
| Operational Clues    | Understand infrastructure |
| Recommended Products | Enable targeted sales     |
| Lead Score           | Prioritize effort         |
| Revenue Estimate     | Focus on high-value deals |
| Suggested Action     | Drive execution           |

---

## 🔁 Feedback Loop

Sales teams classify leads as:

| Status       | Meaning           |
| ------------ | ----------------- |
| ✅ Accepted   | Worth pursuing    |
| ❌ Rejected   | Low relevance     |
| 🏆 Converted | Revenue generated |

This creates a continuously improving intelligence engine.

---

# 🏗 Architecture Overview

## 🔹 Frontend Stack

### Core Framework & Libraries

| Technology       | Version | Purpose                   |
| ---------------- | ------- | ------------------------- |
| React            | 19.2.4  | UI Framework              |
| TypeScript       | 5.9.2   | Type Safety               |
| Vite             | 7.1.2   | Build Tool & Dev Server   |
| React Router DOM | 6.30.1  | Client-side Routing (SPA) |

---

### State Management & Data Fetching

| Technology           | Version | Purpose                           |
| -------------------- | ------- | --------------------------------- |
| TanStack React Query | 5.84.2  | Server State Management & Caching |
| React Hook Form      | 7.62.0  | Form State Management             |
| Zod                  | 3.25.76 | Schema Validation                 |

---

### Styling & UI

| Technology               | Version | Purpose                       |
| ------------------------ | ------- | ----------------------------- |
| TailwindCSS              | 3.4.17  | Utility-first CSS Framework   |
| Tailwind Animate         | 1.0.7   | Animation Utilities           |
| @tailwindcss/typography  | 0.5.16  | Typography Plugin             |
| PostCSS                  | 8.5.6   | CSS Processing                |
| Autoprefixer             | 10.4.21 | Vendor Prefixing              |
| Class Variance Authority | 0.7.1   | Component Variants            |
| clsx                     | 2.1.1   | Conditional Classes           |
| tailwind-merge           | Latest  | Merge Tailwind classes safely |

---

## 🔹 Backend & Infrastructure

| Layer           | Technology                | Purpose                         |
| --------------- | ------------------------- | ------------------------------- |
| Backend Runtime | Node.js                   | Server environment              |
| Database        | **Supabase (PostgreSQL)** | Scalable relational database    |
| Authentication  | Supabase Auth             | Secure user management          |
| AI Inference    | Groq API                  | Ultra-low latency LLM responses |
| Validation      | Zod                       | Type-safe schemas               |

---

## 🔹 System Architecture


```
Public Signals → AI Processing → Lead Engine → Strategic Intelligence
→ Sales Execution → Feedback → Smarter Predictions
```

---

# 🔐 Security & Scalability

| Feature              | Implementation                |
| -------------------- | ----------------------------- |
| Data Isolation       | Row-Level Security (Supabase) |
| Secure Auth          | Supabase Authentication       |
| Secret Management    | Environment variables         |
| API Protection       | Server-side AI calls          |
| Modular Architecture | Ready for enterprise scale    |

---

# 🎯 Design Philosophy

**Apple-level simplicity**
**Palantir-level intelligence**
**Stripe-level polish**

The platform is built to feel like a deployable enterprise SaaS product — not a hackathon prototype.

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Productathon_IIT_Roorkee.git
cd Productathon_IIT_Roorkee
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env.local` file:

```
VITE_PUBLIC_SUPABASE_URL=https://exvwuiolghatbduydhub.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dnd1aW9sZ2hhdGJkdXlkaHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDIwNzMsImV4cCI6MjA4NjExODA3M30.0ezxTfwoG5mYPU1onhX5voyfT4ANDISKcutFZfu06Dg
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_eVOIv4ofi0l6CS08i7OVDQ_IJnmr0gW
GROQ_API_KEY=your_groq_key
SCRAPER_USER_AGENT=UrjaSetu/1.0
VITE_PUBLIC_APP_URL=http://localhost:8080
```

⚠️ **Important:** Never commit secret keys to GitHub. Always use environment variables.

---

# 📈 Future Enhancements

| Area             | Planned Upgrade            |
| ---------------- | -------------------------- |
| Intelligence     | Real-time signal ingestion |
| AI               | Predictive demand modeling |
| Sales            | Automated outreach         |
| Enterprise       | CRM integrations           |
| Geo Intelligence | Territory-based routing    |

---

# 🏆 Built For

### 🎓 IIT Roorkee — E-Summit Productathon 2026

This project represents our vision for the future of AI-assisted enterprise sales intelligence.

---

# 👥 Team Details

## 🧑‍💻 Team Name:

👉 **TEAM OMEGA**

---

## 👨‍🚀 Team Members

| Name           | Contact                                                           |
| -------------- | ----------------------------------------------------------------- |
| Vaibhav Gupta  | [guptavaibhavg2005@gmail.com](mailto:guptavaibhavg2005@gmail.com) |
| Nishika Kansal | [nishikakansal@gmail.com](mailto:nishikakansal@gmail.com)         |
| Isha Katiyar   | [ishakatiyar1608@gmail.com](mailto:ishakatiyar1608@gmail.com)     |
| Giriraj Mantri | [girirajmantri2006@gmail.com](mailto:girirajmantri2006@gmail.com) |

---

# 🧠 Our Vision

> **“Most systems help sales react to demand.
> We help them reach the market before competitors.”**

UrjaSetu is not just a lead generator — it is the foundation of a **predictive industrial demand intelligence platform.**

---

# ⭐ Support

If you found this project interesting, consider giving it a ⭐ — it motivates us to keep building impactful systems!
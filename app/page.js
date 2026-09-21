"use client";

import { useMemo, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

/* ============================================================
   SMART LEAD FINDER v8.1
   Futuristic AI Dashboard UI
   ============================================================ */

const initialLeads = [
  {
    id: 1,
    company: "TechNova Solutions",
    industry: "Software",
    location: "Lahore",
    employees: 45,
    contact: "Ali Khan",
    email: "ali@technova.com",
    score: 92,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 2,
    company: "CloudBridge",
    industry: "SaaS",
    location: "Islamabad",
    employees: 28,
    contact: "Sara Ahmed",
    email: "sara@cloudbridge.com",
    score: 86,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 3,
    company: "Digital Peak",
    industry: "Marketing",
    location: "Karachi",
    employees: 18,
    contact: "Usman Raza",
    email: "usman@digitalpeak.com",
    score: 74,
    status: "New",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 4,
    company: "CodeCraft Labs",
    industry: "Software",
    location: "Lahore",
    employees: 72,
    contact: "Hamza Ali",
    email: "hamza@codecraft.com",
    score: 95,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 5,
    company: "GrowthHub",
    industry: "Consulting",
    location: "Multan",
    employees: 32,
    contact: "Ahmed Raza",
    email: "ahmed@growthhub.com",
    score: 68,
    status: "Contacted",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 6,
    company: "NextWave AI",
    industry: "AI",
    location: "Islamabad",
    employees: 55,
    contact: "Ayesha Malik",
    email: "ayesha@nextwave.ai",
    score: 91,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 7,
    company: "PixelWorks",
    industry: "Design",
    location: "Karachi",
    employees: 14,
    contact: "Bilal Ahmed",
    email: "bilal@pixelworks.com",
    score: 61,
    status: "New",
    verified: true,
    source: "LinkedIn",
  },
  {
    id: 8,
    company: "DataCore",
    industry: "Data",
    location: "Lahore",
    employees: 90,
    contact: "Usman Khan",
    email: "usman@datacore.com",
    score: 88,
    status: "Contacted",
    verified: true,
    source: "LinkedIn",
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

function getPriority(score) {
  if (Number(score) >= 85) return "High";
  if (Number(score) >= 70) return "Medium";
  return "Low";
}

function getPriorityStyle(priority) {
  if (priority === "High") {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  if (priority === "Medium") {
    return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }

  return "border-zinc-700 bg-zinc-800/60 text-zinc-400";
}

function getScoreStyle(score) {
  if (Number(score) >= 85) return "text-emerald-400";
  if (Number(score) >= 70) return "text-yellow-400";
  return "text-red-400";
}

function getStatusStyle(status) {
  if (status === "Qualified") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  if (status === "Contacted") {
    return "border-blue-500/20 bg-blue-500/10 text-blue-400";
  }

  return "border-zinc-700 bg-zinc-800/60 text-zinc-400";
}


/* ============================================================
   SIDEBAR
   ============================================================ */

function Sidebar({ activeTab, setActiveTab, session }) {
  const menu = [
    { name: "Dashboard", icon: "⌘" },
    { name: "Lead Finder", icon: "⌕" },
    { name: "Analytics", icon: "◫" },
    { name: "Lead Models", icon: "◎" },
    { name: "Automation", icon: "⚡" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <aside className="hidden h-[99px] w-64 shrink-0 border-r border-purple-500/10 bg-[#08050f]/90 px-4 py-5 lg:flex lg:flex-col">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-cyan-400 font-black text-white shadow-lg shadow-purple-500/20">
          SL
        </div>

        <div>
          <h1 className="font-bold tracking-tight text-white">
            Smart Lead
          </h1>

          <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
            Finder v8.1
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>⌕</span>
          <span>Search AI tools...</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {menu.map((item) => {
          const active = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                active
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-900/30"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="mt-auto rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 via-fuchsia-900/20 to-transparent p-5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/20 bg-purple-500/20 text-2xl">
          ✦
        </div>

        <h3 className="font-semibold text-white">
          Smart Intelligence
        </h3>

        <p className="mt-2 text-xs leading-5 text-zinc-500">
          Find, qualify and prioritize your highest-value leads.
        </p>

        <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-500/10 px-3 py-2 text-center text-xs text-purple-300">
          AI Engine Active
        </div>
      </div>

      {/* User */}
      {session?.user && (
        <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-xs font-bold text-black">
            {(session.user.name || "U").charAt(0)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {session.user.name || "User"}
            </p>

            <p className="truncate text-[10px] text-zinc-500">
              Premium
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

/* ============================================================
   MOBILE TOP BAR
   ============================================================ */

function MobileTopBar({ session, signOutUser }) {
  return (
    <div className="mb-5 flex items-center justify-between scorll lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-cyan-400 font-black text-black">
          SL
        </div>

        <div>
          <p className="font-bold text-white">
            Smart Lead Finder
          </p>

          <p className="text-[10px] text-purple-400">
            v8.1 AI Dashboard
          </p>
        </div>
      </div>

      <button
        onClick={signOutUser}
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400"
      >
        Logout
      </button>
    </div>
  );
}

/* ============================================================
   TOP HEADER
   ============================================================ */

function TopHeader({ session, onAddLead, onExport, signOutUser }) {
  return (
    <header className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />

          <span className="text-xs uppercase tracking-[0.2em] text-emerald-400">
            AI System Online
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Welcome back,
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            {session?.user?.name?.split(" ")[0] || "User"}
          </span>
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Here&apos;s what&apos;s happening with your leads today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onExport}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
        >
          Export CSV
        </button>

        <button
          onClick={onAddLead}
          className="rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:scale-[1.02]"
        >
          + Add Lead
        </button>

        <button
          onClick={signOutUser}
          className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({ title, value, change, icon, accent }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-500/20">
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${accent}`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-emerald-400">
            {change}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PERFORMANCE CHART
   ============================================================ */

function LeadPerformanceChart({ leads }) {
  const chartData = [
    leads.length,
    leads.filter((l) => Number(l.score) >= 70).length,
    leads.filter((l) => Number(l.score) >= 80).length,
    leads.filter((l) => Number(l.score) >= 85).length,
    leads.filter((l) => l.status === "Qualified").length,
    leads.filter((l) => Number(l.score) >= 90).length,
  ];

  const maxValue = Math.max(...chartData, 1);

  const points = chartData
    .map((value, index) => {
      const x = 20 + index * 54;
      const y = 155 - (value / maxValue) * 105;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-950/40 via-[#0d0917] to-[#09070e] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">
            Lead Performance
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Lead quality and qualification trend
          </p>
        </div>

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-400">
          LIVE DATA
        </span>
      </div>

      <div className="relative h-56">
        <svg
          viewBox="0 0 300 180"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          {[30, 70, 110, 150].map((y) => (
            <line
              key={y}
              x1="10"
              y1={y}
              x2="290"
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}

          <polygon
            points={`10,165 ${points} 290,165`}
            fill="rgba(168,85,247,0.10)"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {chartData.map((value, index) => {
            const x = 20 + index * 54;
            const y = 155 - (value / maxValue) * 105;

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#a855f7"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  fill="rgba(168,85,247,0.08)"
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 text-[9px] text-zinc-600">
          <span>START</span>
          <span>GROWTH</span>
          <span>QUALITY</span>
          <span>PRIORITY</span>
          <span>QUALIFIED</span>
          <span>TOP</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   QUALITY SCORE
   ============================================================ */

function LeadQualityScore({ leads, stats }) {
  const score =
    leads.length > 0
      ? Math.round(
          leads.reduce(
            (sum, lead) => sum + Number(lead.score || 0),
            0
          ) / leads.length
        )
      : 0;

  const qualifiedPercentage =
    leads.length > 0
      ? Math.round(
          (leads.filter(
            (lead) => lead.status === "Qualified"
          ).length /
            leads.length) *
            100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-950/30 via-[#0b1017] to-[#09070e] p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">
            Lead Quality Score
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Overall lead quality
          </p>
        </div>

        <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-400">
          OVERALL
        </span>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-zinc-800">
          <div
            className="absolute inset-[-10px] rounded-full border-[10px] border-transparent"
            style={{
              borderTopColor: "#06b6d4",
              borderRightColor:
                score >= 70 ? "#06b6d4" : "transparent",
              transform: `rotate(${score * 1.8 - 45}deg)`,
            }}
          />

          <div className="text-center">
            <p className="text-4xl font-bold text-white">
              {score}
            </p>

            <p className="text-[10px] text-zinc-500">
              Overall Score
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/5 bg-black/20 p-3">
          <p className="text-[10px] uppercase text-zinc-600">
            Qualified
          </p>

          <p className="mt-1 text-lg font-bold text-emerald-400">
            {qualifiedPercentage}%
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/20 p-3">
          <p className="text-[10px] uppercase text-zinc-600">
            High Priority
          </p>

          <p className="mt-1 text-lg font-bold text-red-400">
            {stats.highPriority}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RECOMMENDED LEAD
   ============================================================ */

function RecommendedLeadCard({
  lead,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-500/30 hover:bg-purple-500/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">
            {lead.company}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            {lead.industry} • {lead.location}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-400">
            {lead.score}
          </p>

          <p className="text-[9px] uppercase tracking-wider text-zinc-600">
            Score
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-4">
        <p className="text-sm font-medium text-zinc-300">
          {lead.contact}
        </p>

        <p className="mt-1 truncate text-xs text-zinc-600">
          {lead.email}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
          HIGH PRIORITY
        </span>

        <div className="flex gap-1.5">
          <button
            onClick={() => onView(lead)}
            className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[10px] text-zinc-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
          >
            View
          </button>

          <button
            onClick={() => onEdit(lead)}
            className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-2.5 py-1.5 text-[10px] text-blue-400"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(lead)}
            className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-[10px] text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function Home() {
  const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [leads, setLeads] = useState(initialLeads);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [minimumScore, setMinimumScore] = useState("0");

  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const [newLead, setNewLead] = useState({
    company: "",
    industry: "Software",
    location: "Lahore",
    employees: "",
    contact: "",
    email: "",
    source: "Manual",
  });

  /* ==========================================================
     FETCH LEADS
     ========================================================== */

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/leads");

        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await response.json();

        setLeads(data);
      } catch (err) {
        console.error("FETCH LEADS ERROR:", err);
        setError("Unable to load leads. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  /* ==========================================================
     FILTER LEADS
     ========================================================== */

  const filteredLeads = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return leads
      .filter((lead) => {
        const matchesSearch =
          !searchText ||
          lead.company?.toLowerCase().includes(searchText) ||
          lead.contact?.toLowerCase().includes(searchText) ||
          lead.email?.toLowerCase().includes(searchText);

        const matchesIndustry =
          industry === "All" ||
          lead.industry === industry;

        const matchesLocation =
          location === "All" ||
          lead.location === location;

        const matchesScore =
          Number(lead.score || 0) >=
          Number(minimumScore);

        return (
          matchesSearch &&
          matchesIndustry &&
          matchesLocation &&
          matchesScore
        );
      })
      .sort(
        (a, b) =>
          Number(b.score || 0) -
          Number(a.score || 0)
      );
  }, [
    leads,
    search,
    industry,
    location,
    minimumScore,
  ]);

  /* ==========================================================
     RECOMMENDED
     ========================================================== */

  const recommendedLeads = useMemo(() => {
    return filteredLeads
      .filter(
        (lead) =>
          Number(lead.score || 0) >= 85
      )
      .slice(0, 3);
  }, [filteredLeads]);

  /* ==========================================================
     STATS
     ========================================================== */

  const stats = {
    total: leads.length,

    highPriority: leads.filter(
      (lead) =>
        Number(lead.score || 0) >= 85
    ).length,

    qualified: leads.filter(
      (lead) =>
        lead.status === "Qualified"
    ).length,

    average:
      leads.length > 0
        ? Math.round(
            leads.reduce(
              (sum, lead) =>
                sum +
                Number(lead.score || 0),
              0
            ) / leads.length
          )
        : 0,
  };

  /* ==========================================================
     SCORE
     ========================================================== */

  function calculateScore() {
    let score = 50;

    if (newLead.company.length >= 5) {
      score += 8;
    }

    if (newLead.industry === "Software") {
      score += 12;
    }

    if (newLead.industry === "AI") {
      score += 15;
    }

    if (newLead.industry === "SaaS") {
      score += 13;
    }

    const employees =
      Number(newLead.employees);

    if (employees >= 50) {
      score += 15;
    } else if (employees >= 20) {
      score += 10;
    } else if (employees >= 10) {
      score += 5;
    }

    if (newLead.email.includes("@")) {
      score += 5;
    }

    return Math.min(score, 99);
  }

  /* ==========================================================
     SCORE BREAKDOWN
     ========================================================== */

  function getScoreBreakdown(lead) {
    const breakdown = [];

    if (
      lead.company &&
      lead.company.length >= 5
    ) {
      breakdown.push({
        label: "Strong company name",
        points: 8,
      });
    }

    if (lead.industry === "Software") {
      breakdown.push({
        label: "Software industry",
        points: 12,
      });
    }

    if (lead.industry === "AI") {
      breakdown.push({
        label: "AI industry",
        points: 15,
      });
    }

    if (lead.industry === "SaaS") {
      breakdown.push({
        label: "SaaS industry",
        points: 13,
      });
    }

    if (Number(lead.employees) >= 50) {
      breakdown.push({
        label: "50+ employees",
        points: 15,
      });
    } else if (Number(lead.employees) >= 20) {
      breakdown.push({
        label: "20+ employees",
        points: 10,
      });
    } else if (Number(lead.employees) >= 10) {
      breakdown.push({
        label: "10+ employees",
        points: 5,
      });
    }

    if (
      lead.email &&
      lead.email.includes("@")
    ) {
      breakdown.push({
        label: "Valid email",
        points: 5,
      });
    }

    return breakdown;
  }

  /* ==========================================================
     ADD LEAD
     ========================================================== */

  async function addLead() {
    const companyName =
      newLead.company.trim();

    const contactName =
      newLead.contact.trim();

    const emailAddress =
      newLead.email.trim().toLowerCase();

    const employeeCount =
      Number(newLead.employees);

    if (
      !companyName ||
      !contactName ||
      !emailAddress ||
      !newLead.employees
    ) {
      alert(
        "Please complete all required fields."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailAddress)) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    if (
      !Number.isInteger(employeeCount) ||
      employeeCount < 1
    ) {
      alert(
        "Employees must be a positive whole number."
      );
      return;
    }

    const companyExists = leads.some(
      (lead) =>
        lead.company
          .trim()
          .toLowerCase() ===
        companyName.toLowerCase()
    );

    if (companyExists) {
      alert(
        "This company is already in your leads."
      );
      return;
    }

    const emailExists = leads.some(
      (lead) =>
        lead.email
          .trim()
          .toLowerCase() === emailAddress
    );

    if (emailExists) {
      alert(
        "This email is already in your leads."
      );
      return;
    }

    const score = calculateScore();

    const lead = {
      company: companyName,
      industry: newLead.industry,
      location: newLead.location,
      employees: employeeCount,
      contact: contactName,
      email: emailAddress,
      score,
      status:
        score >= 85
          ? "Qualified"
          : "New",
      verified: true,
      source: newLead.source,
    };

    try {
      const response = await fetch(
        "/api/leads",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(lead),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to save lead."
        );
        return;
      }

      setLeads((current) => [
        data,
        ...current,
      ]);

      setNewLead({
        company: "",
        industry: "Software",
        location: "Lahore",
        employees: "",
        contact: "",
        email: "",
        source: "Manual",
      });

      setShowForm(false);

      alert(
        "Lead added successfully!"
      );
    } catch (error) {
      console.error(
        "ADD LEAD ERROR:",
        error
      );

      alert(
        "Something went wrong while saving the lead."
      );
    }
  }

  /* ==========================================================
     EDIT LEAD
     ========================================================== */

  function startEditing(lead) {
    setEditingLead(lead);

    setEditForm({
      company: lead.company || "",
      industry: lead.industry || "",
      location: lead.location || "",
      employees: lead.employees || "",
      contact: lead.contact || "",
      email: lead.email || "",
      score: lead.score || "",
      status:
        lead.status || "New",
      source:
        lead.source || "Manual",
    });
  }

  async function updateLead() {
    if (!editingLead?._id) {
      alert("Lead ID missing");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/leads/${editingLead._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            company:
              editForm.company,
            industry:
              editForm.industry,
            location:
              editForm.location,
            employees:
              Number(
                editForm.employees
              ),
            contact:
              editForm.contact,
            email:
              editForm.email,
            score:
              Number(editForm.score),
            status:
              editForm.status,
            source:
              editForm.source,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update lead"
        );
      }

      setLeads(
        (currentLeads) =>
          currentLeads.map(
            (lead) =>
              lead._id ===
              editingLead._id
                ? data
                : lead
          )
      );

      setEditingLead(null);
      setEditForm({});

      alert(
        "Lead updated successfully!"
      );
    } catch (error) {
      console.error(
        "UPDATE LEAD ERROR:",
        error
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  /* ==========================================================
     DELETE LEAD
     ========================================================== */

  async function deleteLead(lead) {
    if (!lead?._id) {
      alert("Lead ID missing");
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${lead.company}?`
      );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/leads/${lead._id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete lead"
        );
      }

      setLeads(
        (currentLeads) =>
          currentLeads.filter(
            (item) =>
              item._id !== lead._id
          )
      );

      if (
        selectedLead?._id ===
        lead._id
      ) {
        setSelectedLead(null);
      }

      alert(
        "Lead deleted successfully!"
      );
    } catch (error) {
      console.error(
        "DELETE LEAD ERROR:",
        error
      );

      alert(error.message);
    }
  }

  /* ==========================================================
     EXPORT CSV
     ========================================================== */

  function exportCSV() {
    const headers = [
      "Company",
      "Industry",
      "Location",
      "Employees",
      "Contact",
      "Email",
      "Score",
      "Priority",
      "Status",
      "Verified",
      "Source",
    ];

    const rows = leads.map((lead) => [
      lead.company,
      lead.industry,
      lead.location,
      lead.employees,
      lead.contact,
      lead.email,
      lead.score,
      getPriority(lead.score),
      lead.status,
      lead.verified
        ? "Verified"
        : "Unverified",
      lead.source,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replaceAll(
                '"',
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "smart-lead-finder-data.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  /* ==========================================================
     AUTH LOADING
     ========================================================== */

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07040d] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-purple-500/20 border-t-purple-400" />

          <p className="text-sm text-zinc-500">
            Initializing Smart Lead Finder...
          </p>
        </div>
      </div>
    );
  }

  /* ==========================================================
     LOGIN
     ========================================================== */

  if (!session) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07040d] px-5 text-white">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[120px]" />

        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-purple-500/20 bg-[#0c0715]/90 p-8 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-cyan-400 text-xl font-black text-white shadow-xl shadow-purple-900/30">
              SL
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-purple-400">
              AI Lead Intelligence
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Smart Lead Finder
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Discover, qualify and prioritize
              high-value business leads faster.
            </p>

            <button
              onClick={() =>
                signIn("github")
              }
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:scale-[1.01]"
            >
              Continue with GitHub
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Secure authentication
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     DASHBOARD
     ========================================================== */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07040d] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-700/10 blur-[120px]" />

        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-600/5 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize:
              "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          session={session}
        />

        {/* Main */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1500px] px-4 py-5 md:px-6 md:py-7 xl:px-8">
            <MobileTopBar
              session={session}
              signOutUser={() =>
                signOut()
              }
            />

            <TopHeader
              session={session}
              onAddLead={() =>
                setShowForm(true)
              }
              onExport={exportCSV}
              signOutUser={() =>
                signOut()
              }
            />

            {/* =================================================
                STATS
               ================================================= */}

            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Leads"
                value={stats.total}
                change="+12.5% this month"
                icon="◎"
                accent="bg-purple-500/20"
              />

              <StatCard
                title="High Priority"
                value={stats.highPriority}
                change="+8.2% this month"
                icon="✦"
                accent="bg-fuchsia-500/20"
              />

              <StatCard
                title="Qualified Leads"
                value={stats.qualified}
                change="+21.4% this month"
                icon="◉"
                accent="bg-cyan-500/20"
              />

              <StatCard
                title="Average Score"
                value={stats.average}
                change="+5.8% this month"
                icon="◈"
                accent="bg-blue-500/20"
              />
            </section>

            {/* =================================================
                CHARTS
               ================================================= */}

            <section className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
              <LeadPerformanceChart
                leads={leads}
              />

              <LeadQualityScore
                leads={leads}
                stats={stats}
              />
            </section>

            {/* =================================================
                RECOMMENDED
               ================================================= */}

            <section className="mb-7">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">
                      ✦
                    </span>

                    <h2 className="text-lg font-semibold text-white">
                      Recommended Leads
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-zinc-600">
                    Highest-priority leads to contact first
                  </p>
                </div>

                <span className="w-fit rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] font-medium text-purple-300">
                  TOP {recommendedLeads.length}
                </span>
              </div>

              {recommendedLeads.length === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-zinc-600">
                  No high-priority leads found.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {recommendedLeads.map(
                    (lead) => (
                      <RecommendedLeadCard
                        key={
                          lead._id ||
                          lead.id
                        }
                        lead={lead}
                        onView={
                          setSelectedLead
                        }
                        onEdit={
                          startEditing
                        }
                        onDelete={
                          deleteLead
                        }
                      />
                    )
                  )}
                </div>
              )}
            </section>

            {/* =================================================
                FILTERS
               ================================================= */}

            <section className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Smart Lead Filtering
                  </h2>

                  <p className="mt-1 text-xs text-zinc-600">
                    Find the exact leads you need
                  </p>
                </div>

                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] text-cyan-400">
                  AI FILTER
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                <input
                  type="text"
                  placeholder="Search company, contact or email..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
                />

                <select
                  value={industry}
                  onChange={(e) =>
                    setIndustry(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none focus:border-purple-500/50"
                >
                  <option>All</option>
                  <option>
                    Software
                  </option>
                  <option>SaaS</option>
                  <option>AI</option>
                  <option>
                    Marketing
                  </option>
                  <option>
                    Consulting
                  </option>
                  <option>
                    Design
                  </option>
                  <option>Data</option>
                </select>

                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none focus:border-purple-500/50"
                >
                  <option>All</option>
                  <option>
                    Lahore
                  </option>
                  <option>
                    Islamabad
                  </option>
                  <option>
                    Karachi
                  </option>
                  <option>
                    Multan
                  </option>
                </select>

                <select
                  value={minimumScore}
                  onChange={(e) =>
                    setMinimumScore(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none focus:border-purple-500/50"
                >
                  <option value="0">
                    Any Score
                  </option>
                  <option value="60">
                    60+
                  </option>
                  <option value="70">
                    70+
                  </option>
                  <option value="80">
                    80+
                  </option>
                  <option value="85">
                    85+
                  </option>
                  <option value="90">
                    90+
                  </option>
                </select>
              </div>
            </section>

            {/* =================================================
                LEAD PIPELINE
               ================================================= */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl">
              <div className="flex flex-col gap-3 border-b border-white/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-white">
                      Lead Pipeline
                    </h2>

                    <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] text-purple-300">
                      LIVE
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-600">
                    {filteredLeads.length} leads currently matching filters
                  </p>
                </div>

                <div className="text-xs text-zinc-600">
                  Sorted by score
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left text-sm">
                  <thead className="bg-black/20 text-[10px] uppercase tracking-wider text-zinc-600">
                    <tr>
                      <th className="px-5 py-4">
                        Company
                      </th>

                      <th className="px-5 py-4">
                        Industry
                      </th>

                      <th className="px-5 py-4">
                        Location
                      </th>

                      <th className="px-5 py-4">
                        Employees
                      </th>

                      <th className="px-5 py-4">
                        Score
                      </th>

                      <th className="px-5 py-4">
                        Priority
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>

                      <th className="px-5 py-4">
                        Verified
                      </th>

                      <th className="px-5 py-4">
                        Source
                      </th>

                      <th className="px-5 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="py-16 text-center"
                        >
                          <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-purple-500/20 border-t-purple-400" />

                          <p className="text-xs text-zinc-600">
                            Loading leads...
                          </p>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="py-16 text-center"
                        >
                          <p className="mb-3 text-sm text-red-400">
                            {error}
                          </p>

                          <button
                            onClick={() =>
                              window.location.reload()
                            }
                            className="rounded-lg bg-purple-500 px-4 py-2 text-xs font-semibold text-white"
                          >
                            Retry
                          </button>
                        </td>
                      </tr>
                    ) : filteredLeads.length ===
                      0 ? (
                      <tr>
                        <td
                          colSpan="10"
                          className="py-16 text-center text-sm text-zinc-600"
                        >
                          No leads match your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map(
                        (lead) => {
                          const priority =
                            getPriority(
                              lead.score
                            );

                          return (
                            <tr
                              key={
                                lead._id ||
                                lead.id
                              }
                              className="border-t border-white/[0.05] transition hover:bg-purple-500/[0.025]"
                            >
                              <td className="px-5 py-4">
                                <div className="font-semibold text-white">
                                  {lead.company}
                                </div>

                                <div className="mt-1 text-xs text-zinc-600">
                                  {lead.contact}
                                </div>
                              </td>

                              <td className="px-5 py-4 text-zinc-400">
                                {lead.industry}
                              </td>

                              <td className="px-5 py-4 text-zinc-400">
                                {lead.location}
                              </td>

                              <td className="px-5 py-4 text-zinc-400">
                                {lead.employees}
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`font-bold ${getScoreStyle(
                                    lead.score
                                  )}`}
                                >
                                  {lead.score}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getPriorityStyle(
                                    priority
                                  )}`}
                                >
                                  {priority}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                                    lead.status
                                  )}`}
                                >
                                  {lead.status}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                {lead.verified ? (
                                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                                    ✓ Verified
                                  </span>
                                ) : (
                                  <span className="text-xs text-zinc-600">
                                    Unverified
                                  </span>
                                )}
                              </td>

                              <td className="px-5 py-4 text-zinc-400">
                                {lead.source}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      setSelectedLead(
                                        lead
                                      )
                                    }
                                    className="rounded-lg border border-white/10 px-3 py-1.5 text-[10px] text-zinc-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
                                  >
                                    View
                                  </button>

                                  <button
                                    onClick={() =>
                                      startEditing(
                                        lead
                                      )
                                    }
                                    className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-[10px] text-blue-400"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ========================================================
          ADD LEAD MODAL
         ======================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-purple-500/20 bg-[#0c0715] p-6 shadow-2xl shadow-purple-950/40">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400">
                  Lead Intelligence
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Add New Lead
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Add a potential business lead.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="text-xl text-zinc-600 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid gap-3">
              <input
                placeholder="Company name"
                value={newLead.company}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    company:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
              />

              <select
                value={newLead.industry}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    industry:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>
                  Software
                </option>
                <option>SaaS</option>
                <option>AI</option>
                <option>
                  Marketing
                </option>
                <option>
                  Consulting
                </option>
                <option>Design</option>
                <option>Data</option>
              </select>

              <select
                value={newLead.location}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    location:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>Lahore</option>
                <option>
                  Islamabad
                </option>
                <option>Karachi</option>
                <option>Multan</option>
              </select>

              <select
                value={newLead.source}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    source:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>Website</option>
                <option>
                  LinkedIn
                </option>
                <option>Manual</option>
                <option>Import</option>
              </select>

              <input
                type="number"
                placeholder="Number of employees"
                value={newLead.employees}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    employees:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
              />

              <input
                placeholder="Contact person"
                value={newLead.contact}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    contact:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
              />

              <input
                type="email"
                placeholder="Contact email"
                value={newLead.email}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    email:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-purple-500/50"
              />

              <button
                onClick={addLead}
                className="mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:scale-[1.01]"
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT MODAL
         ======================================================== */}

      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-purple-500/20 bg-[#0c0715] p-6 shadow-2xl shadow-purple-950/40">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400">
                  Lead Management
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Edit Lead
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Update lead information.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingLead(null);
                  setEditForm({});
                }}
                className="text-xl text-zinc-600 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                placeholder="Company name"
                value={
                  editForm.company || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    company:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
              />

              <select
                value={
                  editForm.industry || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    industry:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>
                  Software
                </option>
                <option>SaaS</option>
                <option>AI</option>
                <option>
                  Marketing
                </option>
                <option>
                  Consulting
                </option>
                <option>Design</option>
                <option>Data</option>
              </select>

              <select
                value={
                  editForm.location || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    location:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>Lahore</option>
                <option>
                  Islamabad
                </option>
                <option>Karachi</option>
                <option>Multan</option>
              </select>

              <input
                type="number"
                placeholder="Employees"
                value={
                  editForm.employees ||
                  ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    employees:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
              />

              <input
                placeholder="Contact person"
                value={
                  editForm.contact || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    contact:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
              />

              <input
                type="email"
                placeholder="Email"
                value={
                  editForm.email || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
              />

              <input
                type="number"
                min="0"
                max="99"
                placeholder="Score"
                value={
                  editForm.score ?? ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    score:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
              />

              <select
                value={
                  editForm.status ||
                  "New"
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    status:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>New</option>
                <option>
                  Qualified
                </option>
                <option>
                  Contacted
                </option>
              </select>

              <select
                value={
                  editForm.source ||
                  "Manual"
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    source:
                      e.target.value,
                  })
                }
                className="rounded-xl border border-white/[0.07] bg-[#0b0812] px-4 py-3 text-sm text-zinc-300 outline-none"
              >
                <option>Website</option>
                <option>
                  LinkedIn
                </option>
                <option>Manual</option>
                <option>Import</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingLead(null);
                  setEditForm({});
                }}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={updateLead}
                disabled={saving}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DETAIL MODAL
         ======================================================== */}

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-purple-500/20 bg-[#0c0715] p-6 shadow-2xl shadow-purple-950/40">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                  Lead Details
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {selectedLead.company}
                </h2>

                <p className="mt-1 text-xs text-zinc-600">
                  {selectedLead.industry} •{" "}
                  {selectedLead.location}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedLead(null)
                }
                className="text-xl text-zinc-600 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Score */}
            <div className="mb-5 rounded-2xl border border-purple-500/10 bg-purple-500/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-600">
                    Lead Score
                  </p>

                  <p
                    className={`mt-1 text-4xl font-bold ${getScoreStyle(
                      selectedLead.score
                    )}`}
                  >
                    {selectedLead.score}
                    <span className="text-sm text-zinc-600">
                      /100
                    </span>
                  </p>
                </div>

                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  {getPriority(
                    selectedLead.score
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1">
              {[
                [
                  "Contact",
                  selectedLead.contact,
                ],
                [
                  "Email",
                  selectedLead.email,
                ],
                [
                  "Industry",
                  selectedLead.industry,
                ],
                [
                  "Location",
                  selectedLead.location,
                ],
                [
                  "Employees",
                  selectedLead.employees,
                ],
                [
                  "Source",
                  selectedLead.source,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-white/[0.05] py-3"
                >
                  <span className="text-xs text-zinc-600">
                    {label}
                  </span>

                  <span className="max-w-[250px] truncate text-sm text-zinc-300">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Score Breakdown */}
            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
              <h3 className="text-sm font-semibold">
                Score Breakdown
              </h3>

              <p className="mt-1 text-xs text-zinc-600">
                Why this lead received its score
              </p>

              <div className="mt-4 space-y-3">
                {getScoreBreakdown(
                  selectedLead
                ).map(
                  (item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] text-emerald-400">
                          ✓
                        </span>

                        <span className="text-xs text-zinc-400">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-emerald-400">
                        +{item.points}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="mt-4 flex justify-between border-t border-white/[0.05] pt-3">
                <span className="text-xs text-zinc-600">
                  Base score
                </span>

                <span className="text-xs text-zinc-400">
                  50 points
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase text-zinc-600">
                  Status
                </p>

                <span
                  className={`mt-2 inline-block rounded-full border px-2.5 py-1 text-[10px] ${getStatusStyle(
                    selectedLead.status
                  )}`}
                >
                  {selectedLead.status}
                </span>
              </div>

              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase text-zinc-600">
                  Verification
                </p>

                <span className="mt-2 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400">
                  {selectedLead.verified
                    ? "✓ Verified"
                    : "Unverified"}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                setSelectedLead(null)
              }
              className="mt-5 w-full rounded-xl border border-white/10 py-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

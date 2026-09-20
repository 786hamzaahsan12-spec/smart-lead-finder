"use client";

import { useMemo, useEffect, useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react";

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

function getPriority(score) {
  if (score >= 85) return "High";
  if (score >= 70) return "Medium";
  return "Low";
}

function getPriorityStyle(priority) {
  if (priority === "High") {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  if (priority === "Medium") {
    return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }

  return "border-zinc-700 bg-zinc-800 text-zinc-400";
}

function getScoreStyle(score) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-yellow-400";
  return "text-red-400";
}

function getStatusStyle(status) {
  if (status === "Qualified") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  if (status === "Contacted") {
    return "border-blue-500/20 bg-blue-500/10 text-blue-400";
  }

  return "border-zinc-700 bg-zinc-800 text-zinc-400";
}

export default function Home() {
  const { data: session, status } = useSession();


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
          industry === "All" || lead.industry === industry;

        const matchesLocation =
          location === "All" || lead.location === location;

        const matchesScore =
          Number(lead.score || 0) >= Number(minimumScore);

        return (
          matchesSearch &&
          matchesIndustry &&
          matchesLocation &&
          matchesScore
        );
      })
      .sort(
        (a, b) =>
          Number(b.score || 0) - Number(a.score || 0)
      );
  }, [leads, search, industry, location, minimumScore]);


  const recommendedLeads = useMemo(() => {
    return filteredLeads
      .filter((lead) => Number(lead.score || 0) >= 85)
      .slice(0, 3);
  }, [filteredLeads]);


  const stats = {
    total: leads.length,

    highPriority: leads.filter(
      (lead) => Number(lead.score || 0) >= 85
    ).length,

    qualified: leads.filter(
      (lead) => lead.status === "Qualified"
    ).length,

    average:
      leads.length > 0
        ? Math.round(
          leads.reduce(
            (sum, lead) =>
              sum + Number(lead.score || 0),
            0
          ) / leads.length
        )
        : 0,
  };


  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07090d] text-white">
        Loading...
      </div>
    );
  }


  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07090d] px-5 text-white">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0c1017] p-8 text-center">

          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-black">
            SL
          </div>

          <h1 className="text-2xl font-bold">
            Smart Lead Finder
          </h1>

          <p className="mt-2 mb-6 text-sm text-zinc-500">
            Login to access your leads.
          </p>

          <button
            onClick={() => signIn("github")}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Continue with GitHub
          </button>

        </div>
      </div>
    );
  }



  function calculateScore() {
    let score = 50;

    if (newLead.company.length >= 5) score += 8;
    if (newLead.industry === "Software") score += 12;
    if (newLead.industry === "AI") score += 15;
    if (newLead.industry === "SaaS") score += 13;

    const employees = Number(newLead.employees);

    if (employees >= 50) score += 15;
    else if (employees >= 20) score += 10;
    else if (employees >= 10) score += 5;

    if (newLead.email.includes("@")) score += 5;

    return Math.min(score, 99);
  }
  function getScoreBreakdown(lead) {
    const breakdown = [];

    if (lead.company && lead.company.length >= 5) {
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

    if (lead.email && lead.email.includes("@")) {
      breakdown.push({
        label: "Valid email",
        points: 5,
      });
    }

    return breakdown;
  }
  async function addLead() {
    const companyName = newLead.company.trim();
    const contactName = newLead.contact.trim();
    const emailAddress = newLead.email.trim().toLowerCase();
    const employeeCount = Number(newLead.employees);


    if (
      !companyName ||
      !contactName ||
      !emailAddress ||
      !newLead.employees
    ) {
      alert("Please complete all required fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailAddress)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Employee validation
    if (!Number.isInteger(employeeCount) || employeeCount < 1) {
      alert("Employees must be a positive whole number.");
      return;
    }

    // Duplicate company check
    const companyExists = leads.some(
      (lead) =>
        lead.company.trim().toLowerCase() ===
        companyName.toLowerCase()
    );

    if (companyExists) {
      alert("This company is already in your leads.");
      return;
    }

    // Duplicate email check
    const emailExists = leads.some(
      (lead) =>
        lead.email.trim().toLowerCase() === emailAddress
    );

    if (emailExists) {
      alert("This email is already in your leads.");
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
      status: score >= 85 ? "Qualified" : "New",
      verified: true,
      source: newLead.source,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to save lead.");
        return;
      }

      // Add MongoDB saved lead to UI
      setLeads((current) => [data, ...current]);

      // Reset form
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

      alert("Lead added successfully!");
    } catch (error) {
      console.error("ADD LEAD ERROR:", error);
      alert("Something went wrong while saving the lead.");
    }
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: editForm.company,
            industry: editForm.industry,
            location: editForm.location,
            employees: Number(editForm.employees),
            contact: editForm.contact,
            email: editForm.email,
            score: Number(editForm.score),
            status: editForm.status,
            source: editForm.source,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update lead");
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead._id === editingLead._id ? data : lead
        )
      );

      setEditingLead(null);
      setEditForm({});

      alert("Lead updated successfully!");
    } catch (error) {
      console.error("UPDATE LEAD ERROR:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }
  async function deleteLead(lead) {
    if (!lead?._id) {
      alert("Lead ID missing");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${lead.company}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/leads/${lead._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete lead");
      }

      setLeads((currentLeads) =>
        currentLeads.filter((item) => item._id !== lead._id)
      );

      if (selectedLead?._id === lead._id) {
        setSelectedLead(null);
      }

      alert("Lead deleted successfully!");
    } catch (error) {
      console.error("DELETE LEAD ERROR:", error);
      alert(error.message);
    }
  }

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
      lead.verified ? "Verified" : "Unverified",
      lead.source,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "lead-generation-data.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-black">
                SL
              </div>

              <h1 className="text-2xl font-bold">
                Smart Lead Finder
              </h1>
            </div>

            <p className="text-sm text-zinc-400">
              Prioritize high-value business leads faster.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => signOut()}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium transition hover:border-red-500/50 hover:text-red-400"
            >
              Logout
            </button>
            <button
              onClick={exportCSV}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium transition hover:border-zinc-500"
            >
              Export CSV
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              + Add Lead
            </button>
          </div>
        </header>

        {/* STATS */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5">
            <p className="text-sm text-zinc-500">Total Leads</p>
            <p className="mt-2 text-3xl font-bold">{stats.total}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5">
            <p className="text-sm text-zinc-500">High Priority</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              {stats.highPriority}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5">
            <p className="text-sm text-zinc-500">Qualified Leads</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {stats.qualified}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5">
            <p className="text-sm text-zinc-500">Average Score</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {stats.average}
            </p>
          </div>
        </section>
        {/* Recommended Leads */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Recommended Leads
              </h2>

              <p className="text-sm text-zinc-500">
                Highest-priority leads to contact first
              </p>
            </div>

            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
              Top {recommendedLeads.length}
            </span>
          </div>

          {recommendedLeads.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-center">
              <p className="text-sm text-zinc-500">
                No high-priority leads found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recommendedLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-cyan-500/40"
                >
                  {/* Company + Score */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-white">
                        {lead.company}
                      </h3>

                      <p className="mt-1 text-xs text-zinc-500">
                        {lead.industry} • {lead.location}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xl font-bold text-emerald-400">
                        {lead.score}
                      </p>

                      <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                        Score
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="mt-4 border-t border-zinc-800 pt-4">
                    <p className="text-sm font-medium text-zinc-300">
                      {lead.contact}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {lead.email}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      High Priority
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-xs"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setEditingLead(lead);
                          setEditForm({
                            company: lead.company || "",
                            industry: lead.industry || "",
                            location: lead.location || "",
                            employees: lead.employees || "",
                            contact: lead.contact || "",
                            email: lead.email || "",
                            score: lead.score || "",
                            status: lead.status || "New",
                            source: lead.source || "Manual",
                          });
                        }}
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteLead(lead)}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FILTERS */}
        <section className="mb-6 rounded-2xl border border-zinc-800 bg-[#0c1017] p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <input
              type="text"
              placeholder="Search company, contact or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
            />

            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
            >
              <option>All</option>
              <option>Software</option>
              <option>SaaS</option>
              <option>AI</option>
              <option>Marketing</option>
              <option>Consulting</option>
              <option>Design</option>
              <option>Data</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
            >
              <option>All</option>
              <option>Lahore</option>
              <option>Islamabad</option>
              <option>Karachi</option>
              <option>Multan</option>
            </select>

            <select
              value={minimumScore}
              onChange={(e) => setMinimumScore(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
            >
              <option value="0">Any Score</option>
              <option value="60">60+</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
              <option value="85">85+</option>
              <option value="90">90+</option>
            </select>

          </div>
        </section>

        {/* TABLE */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0c1017]">
          <div className="border-b border-zinc-800 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Lead Pipeline</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  {filteredLeads.length} leads currently matching filters
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-[#080b10] text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Industry</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Employees</th>
                  <th className="px-5 py-4">Score</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Verified</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="py-10 text-center text-sm text-zinc-400"
                    >
                      Loading leads...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="10" className="py-10 text-center">
                      <p className="mb-3 text-sm text-red-400">
                        {error}
                      </p>

                      <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="py-10 text-center text-sm text-zinc-500"
                    >
                      No leads match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const priority = getPriority(lead.score);

                    return (
                      <tr
                        key={lead._id || lead.id}
                        className="border-t border-zinc-800 transition hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4">
                          <div className="font-semibold">
                            {lead.company}
                          </div>

                          <div className="mt-1 text-xs text-zinc-500">
                            {lead.contact}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-zinc-300">
                          {lead.industry}
                        </td>

                        <td className="px-5 py-4 text-zinc-300">
                          {lead.location}
                        </td>

                        <td className="px-5 py-4 text-zinc-300">
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
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityStyle(
                              priority
                            )}`}
                          >
                            {priority}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                              lead.status
                            )}`}
                          >
                            {lead.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {lead.verified ? (
                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-500">
                              Unverified
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-zinc-300">
                          {lead.source}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs transition hover:border-cyan-500 hover:text-cyan-400"
                            >
                              View
                            </button>

                            <button
                              onClick={() => {
                                setEditingLead(lead);

                                setEditForm({
                                  company: lead.company || "",
                                  industry: lead.industry || "",
                                  location: lead.location || "",
                                  employees: lead.employees || "",
                                  contact: lead.contact || "",
                                  email: lead.email || "",
                                  score: lead.score || "",
                                  status: lead.status || "New",
                                  source: lead.source || "Manual",
                                });
                              }}
                              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-400 transition hover:bg-blue-500/20"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="p-12 text-center text-sm text-zinc-500">
              No leads match your filters.
            </div>
          )}
        </section>
      </div>

      {/* ADD LEAD MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0c1017] p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add New Lead</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Add a potential business lead.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4">

              <input
                placeholder="Company name"
                value={newLead.company}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    company: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <select
                value={newLead.industry}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    industry: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>Software</option>
                <option>SaaS</option>
                <option>AI</option>
                <option>Marketing</option>
                <option>Consulting</option>
                <option>Design</option>
                <option>Data</option>
              </select>

              <select
                value={newLead.location}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    location: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Karachi</option>
                <option>Multan</option>
              </select>
              <select
                value={newLead.source}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    source: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>Website</option>
                <option>LinkedIn</option>
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
                    employees: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <input
                placeholder="Contact person"
                value={newLead.contact}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    contact: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <input
                type="email"
                placeholder="Contact email"
                value={newLead.email}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    email: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <button
                onClick={addLead}
                className="mt-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LEAD MODAL */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0c1017] p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Edit Lead</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Update lead information.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingLead(null);
                  setEditForm({});
                }}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                placeholder="Company name"
                value={editForm.company || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    company: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <select
                value={editForm.industry || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    industry: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>Software</option>
                <option>SaaS</option>
                <option>AI</option>
                <option>Marketing</option>
                <option>Consulting</option>
                <option>Design</option>
                <option>Data</option>
              </select>

              <select
                value={editForm.location || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    location: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Karachi</option>
                <option>Multan</option>
              </select>

              <input
                type="number"
                placeholder="Number of employees"
                value={editForm.employees || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    employees: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <input
                placeholder="Contact person"
                value={editForm.contact || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    contact: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <input
                type="email"
                placeholder="Contact email"
                value={editForm.email || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <input
                type="number"
                min="0"
                max="99"
                placeholder="Score"
                value={editForm.score ?? ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    score: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none focus:border-cyan-500"
              />

              <select
                value={editForm.status || "New"}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    status: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>New</option>
                <option>Qualified</option>
                <option>Contacted</option>
              </select>

              <select
                value={editForm.source || "Manual"}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    source: e.target.value,
                  })
                }
                className="rounded-xl border border-zinc-700 bg-[#080b10] px-4 py-3 text-sm outline-none"
              >
                <option>Website</option>
                <option>LinkedIn</option>
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
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={updateLead}
                disabled={saving}
                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>
        </div>
      )}
      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0c1017] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-400">
                  Lead Details
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {selectedLead.company}
                </h2>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Contact</span>
                <span>{selectedLead.contact}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Email</span>
                <span className="max-w-[220px] truncate">
                  {selectedLead.email}
                </span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Industry</span>
                <span>{selectedLead.industry}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Location</span>
                <span>{selectedLead.location}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Source</span>
                <span className="text-cyan-400">{selectedLead.source}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Employees</span>
                <span>{selectedLead.employees}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Lead Score</span>
                <span
                  className={`font-bold ${getScoreStyle(
                    selectedLead.score
                  )}`}
                >
                  {selectedLead.score}/100
                </span>
              </div>
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Score Breakdown
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Why this lead received its score
                    </p>
                  </div>

                  <span className="text-lg font-bold text-cyan-400">
                    {selectedLead.score}/99
                  </span>
                </div>

                <div className="space-y-3">
                  {getScoreBreakdown(selectedLead).map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                          ✓
                        </span>

                        <span className="text-sm text-zinc-300">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-emerald-400">
                        +{item.points}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-zinc-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Base score
                    </span>

                    <span className="text-xs font-medium text-zinc-400">
                      50 points
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#080b10] p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Why this lead scores well
                </p>

                <div className="space-y-2 text-sm">
                  {selectedLead.industry === "Software" && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        Software industry fit
                      </span>
                      <span className="text-emerald-400">+12</span>
                    </div>
                  )}

                  {selectedLead.industry === "AI" && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        AI industry fit
                      </span>
                      <span className="text-emerald-400">+15</span>
                    </div>
                  )}

                  {selectedLead.industry === "SaaS" && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        SaaS industry fit
                      </span>
                      <span className="text-emerald-400">+13</span>
                    </div>
                  )}

                  {selectedLead.employees >= 50 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        50+ employees
                      </span>
                      <span className="text-emerald-400">+15</span>
                    </div>
                  )}

                  {selectedLead.employees >= 20 &&
                    selectedLead.employees < 50 && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          20+ employees
                        </span>
                        <span className="text-emerald-400">+10</span>
                      </div>
                    )}

                  {selectedLead.email.includes("@") && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        Valid contact email
                      </span>
                      <span className="text-emerald-400">+5</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between border-b border-zinc-800 pb-3">
                <span className="text-zinc-500">Priority</span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs ${getPriorityStyle(
                    getPriority(selectedLead.score)
                  )}`}
                >
                  {getPriority(selectedLead.score)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Status</span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs ${getStatusStyle(
                    selectedLead.status
                  )}`}
                >
                  {selectedLead.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Verified</span>
                {selectedLead.verified ? (
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-500">
                    Unverified
                  </span>
                )}
              </div>

            </div>

            <button
              onClick={() => setSelectedLead(null)}
              className="mt-6 w-full rounded-xl border border-zinc-700 py-3 text-sm font-medium transition hover:bg-zinc-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useState, FormEvent } from "react";

export default function ApplyPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "AI Builder Intern",
    level: "Beginner",
    why: "",
    built: "",
    link: "",
    availability: "5-10 hrs/week",
  });

  const [status, setStatus] = useState<null | "success" | "error">(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.why) {
      setStatus("error");
      return;
    }

    try {
      // Using Formspree endpoint (user should replace with their own)
      const endpoint = "https://formspree.io/f/mknajqdo"; // placeholder
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          role: form.role,
          level: form.level,
          why: form.why,
          built: form.built,
          link: form.link,
          availability: form.availability,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "AI Builder Intern",
          level: "Beginner",
          why: "",
          built: "",
          link: "",
          availability: "5-10 hrs/week",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="card-glow rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-2 gradient-text">Apply — BVA Internship</h1>
          <p className="text-neutral-400 mb-6">
            This is a build-first internship. Selected candidates will be expected to ship real
            projects.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">First Name *</span>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="input"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Last Name *</span>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="input"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Email *</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="input"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Phone</span>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="input"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Internship Role *</span>
                <select
                  required
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  className="input"
                >
                  <option>AI Builder Intern</option>
                  <option>Full Stack / Vibe Developer Intern</option>
                  <option>UI/UX Design Intern</option>
                  <option>Growth / Marketing Intern</option>
                  <option>Content / Media Intern</option>
                  <option>Community / Operations Intern</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Experience Level *</span>
                <select
                  required
                  value={form.level}
                  onChange={(e) => update("level", e.target.value)}
                  className="input"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm text-neutral-300 mb-1">Why do you want to join BVA? *</span>
              <textarea
                required
                value={form.why}
                onChange={(e) => update("why", e.target.value)}
                rows={5}
                className="input"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-neutral-300 mb-1">What have you built before?</span>
              <textarea
                placeholder="Projects, links, or anything you've worked on"
                value={form.built}
                onChange={(e) => update("built", e.target.value)}
                rows={3}
                className="input"
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Portfolio / GitHub / Link</span>
                <input value={form.link} onChange={(e) => update("link", e.target.value)} className="input" />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Availability *</span>
                <select
                  required
                  value={form.availability}
                  onChange={(e) => update("availability", e.target.value)}
                  className="input"
                >
                  <option>5-10 hrs/week</option>
                  <option>10-20 hrs/week</option>
                  <option>20+ hrs/week</option>
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-400">This is a build-first internship.</div>
              <button className="bg-gradient-to-r from-white/90 to-neutral-400 text-black px-6 py-2 rounded-full font-semibold" type="submit">
                Apply Now 🚀
              </button>
            </div>
          </form>

          {status === "success" && (
            <div className="mt-4 text-green-400">Application received. Now go build something while we review it.</div>
          )}

          {status === "error" && (
            <div className="mt-4 text-rose-400">Please fill all required fields or try again later.</div>
          )}
        </div>
      </div>
    </div>
  );
}

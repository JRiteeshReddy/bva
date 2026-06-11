"use client";

import { useState, FormEvent } from "react";
import CustomSelect from "@/components/ui/CustomSelect";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.why.trim()) e.why = "Tell us why you want to join BVA.";
    if (!form.role.trim()) e.role = "Please select an internship role.";
    if (!form.level.trim()) e.level = "Please select your experience level.";
    if (!form.availability.trim()) e.availability = "Please select your availability.";
    return e;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Basic validation
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatus("error");
      // focus the first invalid field
      const first = Object.keys(validation)[0];
      const el = document.getElementById(first) || document.getElementById(`${first}-select`);
      if (el && (el as HTMLElement).focus) (el as HTMLElement).focus();
      return;
    }
    setErrors({});

    try {
      // Post to Formspree (use same form endpoint as Contact)
      const endpoint = "https://formspree.io/f/mjgdylqn";
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      // Add a tag so backend can distinguish forms
      formData.append("form_source", "internship");

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setErrors({});
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
        // try to parse error message
        try {
          const data = await res.json();
          if (data && data.error) setErrors({ form: data.error });
        } catch {
          // ignore
        }
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="card-glow rounded-2xl p-8 form-dark">
          <h1 className="text-2xl font-bold mb-2 gradient-text">Apply — BVA Internship</h1>
          <p className="text-neutral-400 mb-4">
            Build-first internship. Ship real projects. Get mentored by active builders.
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm mb-6">
            <p><span className="text-neutral-500">Duration:</span> <span className="text-neutral-300">Min. 6 weeks</span></p>
            <p><span className="text-neutral-500">Hours:</span> <span className="text-neutral-300">10–20 hrs/week</span></p>
            <p><span className="text-neutral-500">Format:</span> <span className="text-neutral-300">Remote-first</span></p>
            <p><span className="text-neutral-500">Certificate:</span> <span className="text-neutral-300">On completion</span></p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <input type="hidden" name="form_source" value="internship" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">First Name *</span>
                <input
                  required
                  name="firstName"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  id="firstName"
                  className={`input bg-transparent ${errors.firstName ? "border-rose-500" : ""}`}
                />
                {errors.firstName && <div className="text-rose-400 text-sm mt-1">{errors.firstName}</div>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Last Name *</span>
                <input
                  required
                  name="lastName"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  id="lastName"
                  className={`input bg-transparent ${errors.lastName ? "border-rose-500" : ""}`}
                />
                {errors.lastName && <div className="text-rose-400 text-sm mt-1">{errors.lastName}</div>}
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  id="email"
                  className={`input bg-transparent ${errors.email ? "border-rose-500" : ""}`}
                />
                {errors.email && <div className="text-rose-400 text-sm mt-1">{errors.email}</div>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  id="phone"
                  className="input bg-transparent"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Internship Role *</span>
                <CustomSelect
                  options={[
                    "AI Builder Intern",
                    "Full Stack / Vibe Developer Intern",
                    "UI/UX Design Intern",
                    "Growth / Marketing Intern",
                    "Content / Media Intern",
                    "Community / Operations Intern",
                  ]}
                  value={form.role}
                  onChange={(v) => update("role", v)}
                  name="role"
                  ariaDescribedBy={errors.role ? "role-error" : undefined}
                  ariaInvalid={!!errors.role}
                />
                {errors.role && <div id="role-error" className="text-rose-400 text-sm mt-1">{errors.role}</div>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Experience Level *</span>
                <CustomSelect
                  options={["Beginner", "Intermediate", "Advanced"]}
                  value={form.level}
                  onChange={(v) => update("level", v)}
                  name="level"
                  ariaDescribedBy={errors.level ? "level-error" : undefined}
                  ariaInvalid={!!errors.level}
                />
                {errors.level && <div id="level-error" className="text-rose-400 text-sm mt-1">{errors.level}</div>}
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm text-neutral-300 mb-1">Why do you want to join BVA? *</span>
                <textarea
                  required
                  name="why"
                  value={form.why}
                  onChange={(e) => update("why", e.target.value)}
                  rows={5}
                  id="why"
                  className={`input bg-transparent ${errors.why ? "border-rose-500" : ""}`}
                />
                <span className="text-xs text-neutral-500 mt-1">Tell us what excites you about building. What do you want to learn or ship?</span>
                {errors.why && <div className="text-rose-400 text-sm mt-1">{errors.why}</div>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-neutral-300 mb-1">What have you built before?</span>
                <textarea
                  name="built"
                  placeholder="Projects, links, or anything you've worked on"
                  value={form.built}
                  onChange={(e) => update("built", e.target.value)}
                  rows={3}
                  id="built"
                  className="input bg-transparent"
                />
                <span className="text-xs text-neutral-500 mt-1">GitHub repos, live projects, prototypes — anything that shows you ship.</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Portfolio / GitHub / Link</span>
                <input name="link" value={form.link} onChange={(e) => update("link", e.target.value)} id="link" className="input bg-transparent" />
                <span className="text-xs text-neutral-500 mt-1">Optional but recommended — strengthens your application.</span>
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-neutral-300 mb-1">Availability *</span>
                <CustomSelect
                  options={["5-10 hrs/week", "10-20 hrs/week", "20+ hrs/week"]}
                  value={form.availability}
                  onChange={(v) => update("availability", v)}
                  name="availability"
                  ariaDescribedBy={errors.availability ? "availability-error" : undefined}
                  ariaInvalid={!!errors.availability}
                />
                {errors.availability && <div id="availability-error" className="text-rose-400 text-sm mt-1">{errors.availability}</div>}
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-neutral-500">Selection: Application → Review → Intro Call → Onboard</div>
              <button className="bg-gradient-to-r from-white/90 to-neutral-400 text-black px-6 py-2 rounded-full font-semibold" type="submit">
                Apply Now
              </button>
            </div>
            <p className="text-xs text-neutral-600 text-right">Completion = project + submission + evaluation</p>
          </form>

          {status === "success" && (
            <div className="mt-4 text-green-400">Application received. We review every submission — you'll hear from us within a week.</div>
          )}

          {status === "error" && Object.keys(errors).length === 0 && (
            <div className="mt-4 text-rose-400">Please fill all required fields or try again later.</div>
          )}
        </div>
      </div>
    </div>
  );
}

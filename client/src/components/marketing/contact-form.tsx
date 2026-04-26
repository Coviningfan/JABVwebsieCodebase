import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import { contactProjectOptions } from "@/content/marketing";
import { cn } from "@/lib/utils";
import { insertContactSchema, type InsertContact } from "@shared/schema";

type FormErrors = Partial<Record<keyof InsertContact, string>>;

const initialValues: InsertContact = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export function ContactForm() {
  const [formValues, setFormValues] = useState<InsertContact>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const selectOptions = useMemo(() => contactProjectOptions, []);

  const handleChange =
    (field: keyof InsertContact) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;

      setFormValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      if (status !== "idle") {
        setStatus("idle");
        setStatusMessage("");
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = insertContactSchema.safeParse(formValues);
    if (!parsed.success) {
      const nextErrors = parsed.error.errors.reduce<FormErrors>((current, issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in current)) {
          current[field as keyof InsertContact] = issue.message;
        }
        return current;
      }, {});

      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "We could not send your message. Please try again.");
      }

      setFormValues(initialValues);
      setErrors({});
      setStatus("success");
      setStatusMessage(payload.message || "Thank you. We will get back to you within 24 hours.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "We could not send your message. Please try again.");
    }
  };

  return (
    <div className="editorial-card p-7 sm:p-8">
      <div className="mb-8">
        <p className="editorial-eyebrow">Project inquiry</p>
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">Tell us what needs to change.</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-[color:var(--muted-foreground)]">
          A clear summary is enough. Share what is not working, what the business needs next, and what kind of
          engagement you are considering.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Name</span>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange("name")}
              className={cn("input-shell", errors.name && "input-shell-error")}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name ? <span className="form-error">{errors.name}</span> : null}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Email</span>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange("email")}
              className={cn("input-shell", errors.email && "input-shell-error")}
              placeholder="you@company.com"
              autoComplete="email"
            />
            {errors.email ? <span className="form-error">{errors.email}</span> : null}
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.92fr,1.08fr]">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Phone</span>
            <input
              type="tel"
              name="phone"
              value={formValues.phone}
              onChange={handleChange("phone")}
              className={cn("input-shell", errors.phone && "input-shell-error")}
              placeholder="(775) 555-0123"
              autoComplete="tel"
            />
            {errors.phone ? <span className="form-error">{errors.phone}</span> : null}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Project type</span>
            <select
              name="projectType"
              value={formValues.projectType}
              onChange={handleChange("projectType")}
              className={cn("input-shell", errors.projectType && "input-shell-error")}
            >
              <option value="">Select the closest fit</option>
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.projectType ? <span className="form-error">{errors.projectType}</span> : null}
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-[color:var(--foreground)]">Project details</span>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange("message")}
            className={cn("input-shell min-h-[180px] resize-y", errors.message && "input-shell-error")}
            placeholder="What are you building, redesigning, or trying to improve?"
          />
          {errors.message ? <span className="form-error">{errors.message}</span> : null}
        </label>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
          <button type="submit" className="button-primary w-full sm:w-fit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send inquiry"}
          </button>

          {status !== "idle" ? (
            <div
              className={cn(
                "rounded-2xl border px-4 py-3 text-sm leading-6",
                status === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
                  : "border-[color:var(--border-strong)] bg-[rgba(173,58,59,0.12)] text-[color:var(--foreground)]",
              )}
            >
              {statusMessage}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

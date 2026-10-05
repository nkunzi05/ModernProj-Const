import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from "react";
import { useRoute } from "../lib/router";
import { SITE } from "../lib/seo";
import { BUDGET_OPTIONS, PROJECT_TYPE_OPTIONS, TIMELINE_OPTIONS } from "../data/site";
import { Container, Eyebrow, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  location: string;
  budget: string;
  timeline: string;
  description: string;
  _honey: string;
};

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  location: "",
  budget: "",
  timeline: "",
  description: "",
  _honey: "",
};

type Errors = Partial<Record<keyof Values | "attachment", string>>;

/* ---------- Attachment rules ---------- */
export const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPT = ".jpg,.jpeg,.png,.webp,.heic,.pdf,.doc,.docx,.xls,.xlsx";
const ACCEPT_EXT = ACCEPT.split(",");

const formatBytes = (b: number) =>
  b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

function checkFile(f: File): string | null {
  const ext = "." + (f.name.split(".").pop() || "").toLowerCase();
  if (!ACCEPT_EXT.includes(ext)) return "Attach a photo (JPG, PNG, WEBP, HEIC), PDF, Word or Excel file.";
  if (f.size > MAX_FILE_BYTES) return `This file is ${formatBytes(f.size)}. Attach a file of 5 MB or less.`;
  return null;
}

function FileField({
  file,
  error,
  onPick,
  onClear,
}: {
  file: File | null;
  error?: string;
  onPick: (f: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onPick(f);
    e.target.value = ""; // allow re-picking the same file after removing it
  };
  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onPick(f);
  };

  return (
    <div className="sm:col-span-2">
      <span id="attachment-label" className="type-label text-smoke">
        Plans, photos or documents <span className="normal-case tracking-normal">(optional)</span>
      </span>

      {file ? (
        <div className="mt-3 flex items-center gap-4 border border-ink/25 bg-paper px-4 py-3">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 3H6v18h12V7z M14 3v4h4" strokeLinejoin="round" />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-sm text-smoke">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="type-action min-h-[44px] px-2 text-brand underline-offset-4 hover:underline"
          >
            Remove<span className="sr-only"> {file.name}</span>
          </button>
        </div>
      ) : (
        <label
          htmlFor="attachment"
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          className={cn(
            "mt-3 flex min-h-[112px] cursor-pointer flex-col items-center justify-center gap-1.5 border border-dashed px-5 py-6 text-center transition-colors",
            over ? "border-brand bg-brand/5" : error ? "border-brand" : "border-ink/30 hover:border-ink hover:bg-paper/60",
            "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand"
          )}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 text-smoke" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 16V4m0 0L7 9m5-5l5 5M4 15v5h16v-5" strokeLinecap="square" />
          </svg>
          <span className="text-base">
            <span className="font-semibold text-ink underline decoration-brand underline-offset-4">Choose a file</span>{" "}
            <span className="text-smoke">or drag it here</span>
          </span>
          <span className="text-sm text-smoke">Photos, PDF, Word or Excel. One file, up to 5 MB.</span>
        </label>
      )}

      <input
        ref={inputRef}
        id="attachment"
        name="attachment"
        type="file"
        accept={ACCEPT}
        onChange={onChange}
        aria-labelledby="attachment-label"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "attachment-err" : undefined}
        className="sr-only"
      />
      {error && (
        <p id="attachment-err" role="alert" className="mt-1.5 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim()))
    e.phone = "Use digits only, e.g. +263 77 123 4567.";
  if (!v.projectType) e.projectType = "Choose the closest project type.";
  if (v.description.trim().length < 20) e.description = "Add a few lines about what you are planning (20+ characters).";
  return e;
}

const fieldBase =
  "mt-2 block w-full min-h-[52px] border-0 border-b bg-transparent px-0 py-3 text-lg text-ink placeholder:text-smoke/60 focus:outline-none focus:ring-0 transition-colors";

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="type-label text-smoke">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const { query } = useRoute();
  const service = query.get("service");
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);

  const pickFile = (f: File) => {
    const err = checkFile(f);
    if (err) {
      setFile(null);
      setErrors((p) => ({ ...p, attachment: err }));
    } else {
      setFile(f);
      setErrors((p) => ({ ...p, attachment: undefined }));
    }
  };
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (service) setV((p) => (p.description ? p : { ...p, description: `I'm interested in: ${service}.\n\n` }));
  }, [service]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const fieldProps = (k: keyof Values) => ({
    id: k,
    name: k,
    value: v[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
    className: cn(fieldBase, errors[k] ? "border-brand" : "border-ink/30 focus:border-ink"),
  });

  const mailtoBody = () =>
    encodeURIComponent(
      [
        `Name: ${v.name}`,
        `Email: ${v.email}`,
        `Phone: ${v.phone}`,
        `Company: ${v.company}`,
        `Project type: ${v.projectType}`,
        `Location: ${v.location}`,
        `Budget: ${v.budget}`,
        `Timeline: ${v.timeline}`,
        "",
        v.description,
      ].join("\n")
    );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (v._honey) return; // bot
    const errs: Errors = validate(v);
    if (errors.attachment) errs.attachment = errors.attachment;
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      // Multipart so the optional attachment travels with the enquiry.
      const body = new FormData();
      const fields: Record<string, string> = {
        _subject: `New project enquiry: ${v.projectType} (${v.name})`,
        _template: "table",
        _captcha: "false",
        _replyto: v.email,
        "Full name": v.name,
        Email: v.email,
        Phone: v.phone || "—",
        Company: v.company || "—",
        "Project type": v.projectType,
        "Project location": v.location || "—",
        "Estimated budget": v.budget || "—",
        "Project timeline": v.timeline || "—",
        "Project description": v.description,
        Attachment: file ? `${file.name} (${formatBytes(file.size)})` : "None",
      };
      Object.entries(fields).forEach(([k, val]) => body.append(k, val));
      if (file) body.append("attachment", file, file.name);

      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false" || data.success === false) throw new Error("failed");
      setStatus("sent");
      setV(EMPTY);
      setFile(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="fade-up border-t border-ink pt-8">
        <h3 className="font-display text-4xl leading-none md:text-5xl">Enquiry sent.</h3>
        <p className="mt-6 max-w-md text-lg text-smoke">
          Thank you. Our team will review your project details and get back to you to discuss the next step.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-u mt-8 min-h-[44px] type-action"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const select = (k: "projectType" | "budget" | "timeline", opts: string[], placeholder: string) => (
    <select {...fieldProps(k)} className={cn(fieldProps(k).className, "select-chevron appearance-none rounded-none pr-8", !v[k] && "text-smoke/70")}>
      <option value="">{placeholder}</option>
      {opts.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Project enquiry form" className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="_honey">Leave this field empty</label>
        <input id="_honey" name="_honey" tabIndex={-1} autoComplete="off" value={v._honey} onChange={set("_honey")} />
      </div>

      <Field id="name" label="Full name" required error={errors.name}>
        <input type="text" autoComplete="name" {...fieldProps("name")} />
      </Field>
      <Field id="email" label="Email" required error={errors.email}>
        <input type="email" autoComplete="email" inputMode="email" {...fieldProps("email")} />
      </Field>
      <Field id="phone" label="Phone" error={errors.phone}>
        <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+263" {...fieldProps("phone")} />
      </Field>
      <Field id="company" label="Company">
        <input type="text" autoComplete="organization" {...fieldProps("company")} />
      </Field>
      <Field id="projectType" label="Project type" required error={errors.projectType}>
        {select("projectType", PROJECT_TYPE_OPTIONS, "Select a type")}
      </Field>
      <Field id="location" label="Project location">
        <input type="text" placeholder="City or suburb" {...fieldProps("location")} />
      </Field>
      <Field id="budget" label="Estimated budget">
        {select("budget", BUDGET_OPTIONS, "Select a range")}
      </Field>
      <Field id="timeline" label="Project timeline">
        {select("timeline", TIMELINE_OPTIONS, "Select a timeframe")}
      </Field>
      <Field id="description" label="Project description" required error={errors.description} className="sm:col-span-2">
        <textarea rows={5} placeholder="What are you planning, and what do you need from us?" {...fieldProps("description")} />
      </Field>

      <FileField
        file={file}
        error={errors.attachment}
        onPick={pickFile}
        onClear={() => {
          setFile(null);
          setErrors((p) => ({ ...p, attachment: undefined }));
        }}
      />

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-[58px] w-full items-center justify-center gap-3 bg-ink px-8 type-action text-paper transition-colors hover:bg-brand disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? (file ? "Uploading and sending…" : "Sending…") : "Send project enquiry"}
        </button>
        <p className="mt-4 text-sm text-smoke">
          We only use these details to respond to your enquiry.
        </p>
        {status === "error" && (
          <p role="alert" className="mt-5 border-l-2 border-brand pl-4 text-brand">
            Your enquiry could not be sent. Please{" "}
            <a className="underline" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Project enquiry")}&body=${mailtoBody()}`}>
              email us directly
            </a>
            {file ? " (attach your file to the email)" : ""} 
            or call{" "}
            <a className="underline" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

export function Contact({ asPage = false }: { asPage?: boolean }) {
  return (
    <section aria-labelledby="contact-title" className={cn("bg-sand pb-24 md:pb-36", asPage ? "pt-12 md:pt-20" : "pt-24 md:pt-36")}>
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <Eyebrow className="text-smoke">Start a project</Eyebrow>
              {asPage ? (
                <p id="contact-title" className="sr-only">
                  Project enquiry
                </p>
              ) : (
                <h2 id="contact-title" className="mt-6 type-display-md uppercase leading-[0.92]">
                  Have a project in mind?
                </h2>
              )}
              <p className="mt-6 max-w-sm text-lg text-smoke">
                Tell us what you&rsquo;re planning and our team will get back to you to discuss the next step.
              </p>
              <ul className="mt-10 space-y-5 border-t border-ink/20 pt-8">
                <li>
                  <span className="block type-label text-smoke">Phone</span>
                  <a href={SITE.phoneHref} className="link-u inline-block py-1 font-display text-3xl">
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <span className="block type-label text-smoke">Email</span>
                  <a href={`mailto:${SITE.email}`} className="link-u inline-block break-all py-1 text-lg">
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

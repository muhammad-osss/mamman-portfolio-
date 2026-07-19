import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ice/40">
          © {new Date().getFullYear()} {profile.brand}. All rights reserved.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ice/40">
          Built by {profile.name} — Nigeria
        </p>
      </div>
    </footer>
  );
}

"use client";

import { Mail, Github, Linkedin, MessageCircle, Download, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import ContactRobot from "./ContactRobot";
import useGeolocation from "@/hooks/useGeolocation";
import { profile } from "@/lib/data";

const links = [
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: (p) => `https://wa.me/${p.whatsapp}`,
  },
  {
    label: "Email",
    icon: Mail,
    href: (p) => `mailto:${p.email}`,
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: (p) => p.linkedin,
  },
  {
    label: "GitHub",
    icon: Github,
    href: (p) => p.github,
  },
];

function LocationPrompt() {
  const { status, request } = useGeolocation();

  return (
    <div className="mt-6 rounded-xl border border-line bg-panel/40 p-4">
      <div className="flex items-start gap-3">
        <MapPin size={18} className="mt-0.5 text-sky-light" />
        <div className="flex-1">
          <p className="text-sm text-ice/80">
            Booking an on-site visit? Sharing your location helps me plan — this is
            completely optional.
          </p>

          {status === "idle" && (
            <button
              onClick={request}
              className="mt-3 font-mono text-xs uppercase tracking-wider text-sky-light underline-offset-4 hover:underline"
            >
              Share my location
            </button>
          )}
          {status === "requesting" && (
            <p className="mt-3 font-mono text-xs text-ice/50">Requesting permission…</p>
          )}
          {status === "granted" && (
            <p className="mt-3 font-mono text-xs text-sky-light">
              Thanks — location received. I'll factor it into scheduling.
            </p>
          )}
          {status === "denied" && (
            <p className="mt-3 font-mono text-xs text-ice/50">
              No problem — you can continue without sharing your location.
            </p>
          )}
          {status === "unsupported" && (
            <p className="mt-3 font-mono text-xs text-ice/50">
              Location isn't supported on this browser — you can still reach out below.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 font-mono text-xs text-ice/50">
              Couldn't get your location, but you can still reach out below.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <ContactRobot />

        <Reveal>
          <p className="eyebrow mb-3">Contact</p>
          <h2 className="section-heading">
            Let's build something <span className="text-sky">worth shipping.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ice/70">
            Have a project in mind? Reach out on any channel below, or download my CV
            for the full picture.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {links.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href(profile)}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <GlassCard className="flex items-center gap-4 text-left">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky/10 text-sky-light transition-colors group-hover:bg-sky/20">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold text-white">
                      {label}
                    </span>
                    <span className="block text-xs text-ice/50">Reach out directly</span>
                  </span>
                </GlassCard>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto max-w-xl">
            <LocationPrompt />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a href={profile.cvPath} download className="btn-primary mt-10 inline-flex">
            <Download size={16} />
            Download CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}

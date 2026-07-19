import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects, profile } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default function CaseStudyPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-light/80 hover:text-sky"
        >
          <ArrowLeft size={14} /> Back to work
        </Link>

        <p className="eyebrow mt-8 mb-3">{project.category}</p>
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-ice/70">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-sky-light/80"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <ExternalLink size={16} /> Live demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            <Github size={16} /> Source
          </a>
        </div>

        <div className="mt-14 space-y-6">
          <GlassCard>
            <h2 className="font-display text-lg font-semibold text-white">The problem</h2>
            <p className="mt-2 text-sm text-ice/70">{project.caseStudy.problem}</p>
          </GlassCard>
          <GlassCard>
            <h2 className="font-display text-lg font-semibold text-white">The approach</h2>
            <p className="mt-2 text-sm text-ice/70">{project.caseStudy.approach}</p>
          </GlassCard>
          <GlassCard>
            <h2 className="font-display text-lg font-semibold text-white">The result</h2>
            <p className="mt-2 text-sm text-ice/70">{project.caseStudy.result}</p>
          </GlassCard>
        </div>

        <p className="mt-14 text-center text-sm text-ice/40">
          Interested in something similar?{" "}
          <a href="/#contact" className="text-sky-light hover:underline">
            Get in touch with {profile.name}
          </a>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}

import Reveal from "@/components/ui/Reveal";
import { experience } from "@/lib/data";
import { Briefcase, GraduationCap } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow mb-3">Experience &amp; Education</p>
          <h2 className="section-heading">
            The <span className="text-sky">path</span> so far.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-start">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky/10 text-sky-light">
                  {item.type === "work" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-light/70">
                    {item.range}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ice/60">{item.org}</p>
                  <p className="mt-2 text-sm text-ice/70">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

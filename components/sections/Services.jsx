import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/lib/data";
import { Check } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-3">Services</p>
          <h2 className="section-heading">
            What I <span className="text-sky">build.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <GlassCard className="h-full">
                <h3 className="font-display text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-ice/70">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-ice/80">
                      <Check size={14} className="text-sky-light" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

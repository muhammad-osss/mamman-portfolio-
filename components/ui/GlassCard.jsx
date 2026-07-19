import clsx from "clsx";

export default function GlassCard({ children, className, strong = false, ...props }) {
  return (
    <div
      className={clsx(
        strong ? "glass-strong" : "glass",
        "rounded-2xl p-6 shadow-glow transition-shadow duration-300 hover:shadow-glow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

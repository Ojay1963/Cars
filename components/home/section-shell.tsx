import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
  eyebrow,
  title,
  description,
  children,
  className
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            {title}
          </h2>
          <p className="text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

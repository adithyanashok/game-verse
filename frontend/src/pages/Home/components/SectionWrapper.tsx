import { memo, type ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const SectionWrapper = ({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-12 sm:py-14 ${className}`}>
      <div className="mx-auto mb-6 flex w-full max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[linear-gradient(90deg,var(--color-blue),var(--color-lime))]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
              GameVera picks
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#aeb7c8] md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl pb-3">{children}</div>
    </section>
  );
};

export default memo(SectionWrapper);

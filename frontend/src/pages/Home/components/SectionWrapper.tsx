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
    <section id={id} className={`py-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-white pl-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[#989fab] text-sm mb-3 pl-4">{subtitle}</p>
      )}

      {children}
    </section>
  );
};

export default memo(SectionWrapper);

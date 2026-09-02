interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`mb-2.5 flex items-center gap-2 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      <h3 className="text-sm font-semibold text-brand-500">{title}</h3>
    </div>
  );
}

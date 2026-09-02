interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`section-title ${className}`.trim()}>
      <span className="section-title__dot" />
      <h3 className="section-title__text">{title}</h3>
    </div>
  );
}

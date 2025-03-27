interface BannerContentProps {
  title: string;
  subtitle: string;
  date: string;
}

export function BannerContent({ title, subtitle, date }: BannerContentProps) {
  return (
    <div className="max-w-5xl mx-auto mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--marronf)]">
        {title}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-[var(--marronf)]">
        {subtitle}
      </h2>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--marronc)]">
        {date}
      </h2>
    </div>
  );
}
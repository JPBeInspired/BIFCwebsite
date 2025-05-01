interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  quote,
}: TestimonialCardProps) {
  return (
    <div className="bg-background-card p-8 shadow-lg w-[400px] flex-shrink-0 mx-4 border border-ui-border">
      <div className="mb-6">
        <h4 className="font-semibold text-lg text-text-primary">{name}</h4>
        <p className="text-sm text-text-secondary">{role}</p>
        <p className="text-sm text-text-secondary">{company}</p>
      </div>
      <blockquote>
        <p className="text-text-primary leading-relaxed">{quote}</p>
      </blockquote>
    </div>
  );
}
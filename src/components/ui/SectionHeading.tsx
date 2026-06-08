export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-saffron-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold text-maroon-900 sm:text-3xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function FormSection({
  number,
  title,
  description,
  children
}) {
  return (
    <section className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0">

      <div className="mb-6 flex gap-4">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600">
          {number}
        </div>

        <div>

          <h2 className="font-semibold text-slate-950">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>

        </div>

      </div>

      {children}

    </section>
  );
}

export default FormSection;
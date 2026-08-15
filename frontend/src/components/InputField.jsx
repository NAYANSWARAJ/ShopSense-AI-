function InputField({
  label,
  name,
  value,
  onChange,
  type = "number",
  min,
  max,
  step = "any"
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required
        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

    </label>
  );
}

export default InputField;
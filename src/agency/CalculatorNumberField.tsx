export default function CalculatorNumberField({ id, label, hint, value, onChange, prefix, suffix }: { id: string; label: string; hint?: string; value: string; onChange: (value: string) => void; prefix?: string; suffix: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium text-white/85">{label}</span>
      <div className="mt-2 flex items-center rounded-xl border border-white/[0.1] bg-[#06080d] focus-within:border-cyan-300/50">
        {prefix && <span className="pl-4 text-sm text-white/45">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full bg-transparent py-3 pr-4 text-base text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${prefix ? 'pl-1.5' : 'pl-4'}`}
        />
        <span className="shrink-0 pr-4 text-xs text-white/45">{suffix}</span>
      </div>
      {hint && <span className="mt-1.5 block text-xs leading-5 text-white/40">{hint}</span>}
    </label>
  );
}

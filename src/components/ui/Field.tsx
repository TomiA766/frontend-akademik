import type { InputHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: ReactNode;
  trailing?: ReactNode;
}

export function Field({
  label,
  icon: Icon,
  error,
  hint,
  trailing,
  id,
  className = '',
  ...inputProps
}: FieldProps) {
  const inputId = id ?? inputProps.name;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-600"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-navy-300">
            <Icon className="size-[18px]" aria-hidden="true" />
          </span>
        )}

        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white text-sm text-navy-950 outline-none transition placeholder:text-navy-300 ${
            Icon ? 'pl-11' : 'pl-4'
          } ${trailing ? 'pr-12' : 'pr-4'} ${
            error
              ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
              : 'border-navy-200 focus:border-gold-400 focus:ring-4 focus:ring-gold-100'
          }`}
          {...inputProps}
        />

        {trailing && (
          <span className="absolute inset-y-0 right-1 flex items-center">
            {trailing}
          </span>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : (
        hint && <div className="mt-1.5 text-xs leading-relaxed text-navy-400">{hint}</div>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  hint?: string;
  disabled?: boolean;
  name?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
  disabled,
  name,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-600"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-navy-200 bg-white px-4 text-sm text-navy-950 outline-none transition focus:border-gold-400 focus:ring-4 focus:ring-gold-100 disabled:cursor-not-allowed disabled:bg-navy-50 disabled:text-navy-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hint && <p className="mt-1.5 text-xs leading-relaxed text-navy-400">{hint}</p>}
    </div>
  );
}

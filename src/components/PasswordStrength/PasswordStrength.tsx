import type { PasswordStrengthProps } from "./@type";

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength =
    Number(password.length >= 8) +
    Number(/[0-9]/.test(password)) +
    Number(/[^a-zA-Z0-9\s]/.test(password)) +
    Number(/[a-z]/.test(password) && /[A-Z]/.test(password));
  const label = strength < 3 ? "Weak" : strength === 3 ? "Good" : "Strong";
  return (
    <div id="password-guidance" className="mt-2">
      <div className="flex items-center gap-2">
        <meter
          aria-label="Password strength"
          min={0}
          max={4}
          value={strength}
          aria-valuetext={label}
          className="sr-only"
        />
        <div
          aria-hidden="true"
          className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200"
        >
          <div
            className={`h-full transition-all ${strength < 3 ? "bg-red-400" : strength === 3 ? "bg-amber-400" : "bg-brand"}`}
            style={{ width: password ? `${strength * 25}%` : "0%" }}
          />
        </div>
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-1 text-xs leading-4 text-slate-500">
        Must be at least 8 characters with numbers and symbols
      </p>
    </div>
  );
}

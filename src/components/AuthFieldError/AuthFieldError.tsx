import type { AuthFieldErrorProps } from "./@type";

export function AuthFieldError({ id, message }: AuthFieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-sm text-red-600" aria-live="polite">
      {message}
    </p>
  );
}

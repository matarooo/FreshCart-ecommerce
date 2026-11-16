export const egyptianPhoneError = "Please enter a valid Egyptian phone number";

export function normalizeEgyptianMobile(value: string): string | null {
  const number = value
    .replace(/[٠-٩۰-۹]/g, (digit) =>
      String(digit.charCodeAt(0) - (digit <= "٩" ? 0x660 : 0x6f0)),
    )
    .replace(/[\s().-]/g, "")
    .replace(/^(?:\+20|0020)/, "0");

  return /^01[0125]\d{8}$/.test(number) ? number : null;
}

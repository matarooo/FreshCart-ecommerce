export type PasswordInputProps = {
  id: string;
  name: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  showIcon?: boolean;
  describedBy?: string;
  invalid?: boolean;
  onValueChange?: (value: string) => void;
};

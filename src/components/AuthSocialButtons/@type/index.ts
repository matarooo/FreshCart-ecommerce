export type AuthSocialButtonsProps = {
  compact: boolean;
  onSelect: (provider: "Google" | "Facebook") => void;
};

export type AuthIconName =
  | "google"
  | "facebook"
  | "lock"
  | "eye"
  | "eyeOff"
  | "star"
  | "users"
  | "userPlus";

export type AuthIconProps = {
  name: AuthIconName;
  className?: string;
};

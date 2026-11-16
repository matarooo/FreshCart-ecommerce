export type NavIconName =
  | "cart"
  | "heart"
  | "search"
  | "menu"
  | "chevron"
  | "headset"
  | "account"
  | "profile"
  | "orders"
  | "settings"
  | "user"
  | "signOut"
  | "phone"
  | "mail"
  | "truck"
  | "gift";

export type NavIconProps = {
  name: NavIconName;
  className?: string;
};

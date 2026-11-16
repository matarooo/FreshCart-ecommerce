export type FooterIconName =
  | "returns"
  | "shield"
  | "location"
  | "card"
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube";

export type FooterIconProps = {
  name: FooterIconName;
  className?: string;
};

import type { ReactNode } from "react";
import type { StoreIconName } from "@/components/icons/StoreIcon/@type";
export type PageBannerProps = {
  title: string;
  subtitle: ReactNode;
  icon: StoreIconName;
  purple?: boolean;
  spacious?: boolean;
  prominent?: boolean;
  breadcrumb?: string;
  parent?: { label: string; href: string };
  image?: string;
};

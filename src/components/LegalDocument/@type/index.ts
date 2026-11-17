import type { ReactNode } from "react";
import type { StoreIconName } from "@/components/icons/StoreIcon/@type";

interface LegalClause {
  label?: string;
  text: string;
}

export type LegalArticle = {
  title: string;
  icon: ReactNode;
} & ({ clauses: LegalClause[] } | { body: ReactNode });

export interface LegalDocumentProps {
  title: string;
  icon: StoreIconName;
  notice: {
    title: string;
    text: string;
    tone: "green" | "amber";
  };
  articles: LegalArticle[];
  related: { href: string; label: string };
}

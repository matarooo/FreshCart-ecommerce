import type { Metadata } from "next";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { LegalArticle } from "@/components/LegalDocument/@type";
import { LegalDocument } from "@/components/LegalDocument/LegalDocument";
import { NavIcon } from "@/components/NavIcon/NavIcon";

export const metadata: Metadata = {
  title: "Terms of Service | FreshCart",
  description: "Read the terms for using FreshCart and placing orders.",
};

const articles: LegalArticle[] = [
  {
    title: "Acceptance of Terms",
    icon: <StoreIcon name="handshake" />,
    clauses: [
      {
        text: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      },
      {
        text: "If you do not agree to these Terms, you must not access or use the Service.",
      },
      {
        text: "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
      },
    ],
  },
  {
    title: "User Eligibility",
    icon: <StoreIcon name="verifiedUser" />,
    clauses: [
      {
        text: "The Service is intended for users who are at least eighteen (18) years of age.",
      },
      {
        text: "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
      },
      {
        text: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
      },
    ],
  },
  {
    title: "Account Registration",
    icon: <NavIcon name="account" />,
    clauses: [
      {
        text: "You may be required to create an account to access certain features of the Service.",
      },
      {
        text: "You agree to provide accurate, current, and complete information during registration.",
      },
      {
        text: "You are solely responsible for maintaining the confidentiality of your account credentials.",
      },
      {
        text: "You agree to notify us immediately of any unauthorized use of your account.",
      },
    ],
  },
  {
    title: "Orders and Payments",
    icon: <FooterIcon name="card" />,
    clauses: [
      {
        text: "All orders placed through the Service are subject to acceptance and availability.",
      },
      {
        text: "Prices are subject to change without notice prior to order confirmation.",
      },
      {
        text: "Pay online at checkout or in cash upon delivery.",
      },
      {
        text: "We reserve the right to refuse or cancel any order at our sole discretion.",
      },
    ],
  },
  {
    title: "Shipping and Delivery",
    icon: <StoreIcon name="truck" />,
    clauses: [
      { text: "Shipping times are estimates only and are not guaranteed." },
      {
        text: "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      },
      {
        text: "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
      },
    ],
  },
  {
    title: "Returns and Refunds",
    icon: <StoreIcon name="return" />,
    clauses: [
      {
        text: "Our return policy allows returns within 14 days of delivery for most items.",
      },
      { text: "Products must be unused and in original packaging." },
      {
        text: "Refunds will be processed within 5–7 business days after receiving the returned item.",
      },
    ],
  },
  {
    title: "Limitation of Liability",
    icon: <StoreIcon name="scales" />,
    body: "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
  },
  {
    title: "Contact Us",
    icon: <StoreIcon name="mail" />,
    body: (
      <>
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:support@freshcart.com"
          className="font-semibold text-green-700 hover:underline"
        >
          support@freshcart.com
        </a>
        .
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title="Terms of Service"
      icon="file"
      notice={{
        title: "Important Notice",
        text: "By accessing and using FreshCart, you accept and agree to be bound by the terms and provisions of this agreement. Please read these terms carefully before using our services.",
        tone: "amber",
      }}
      articles={articles}
      related={{ href: "/privacy-policy", label: "View Privacy Policy" }}
    />
  );
}

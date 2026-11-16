import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import type { StoreIconName } from "@/components/icons/StoreIcon/@type";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { PageBanner } from "@/components/PageBanner/PageBanner";
export const metadata: Metadata = { title: "Contact Us | FreshCart" };
const contactItems: {
  title: string;
  icon: StoreIconName;
  details: string;
  link?: string;
  value?: string;
}[] = [
  {
    title: "Phone",
    icon: "headset",
    details: "Mon–Fri from 8am to 6pm",
    link: "tel:+18001234567",
    value: "+1 (800) 123-4567",
  },
  {
    title: "Email",
    icon: "mail",
    details: "We’ll respond within 24 hours",
    link: "mailto:support@freshcart.com",
    value: "support@freshcart.com",
  },
  {
    title: "Office",
    icon: "box",
    details: "123 Commerce Street\nNew York, NY 10001\nUnited States",
  },
  {
    title: "Business Hours",
    icon: "return",
    details: "Monday–Friday: 8am–6pm\nSaturday: 9am–4pm\nSunday: Closed",
  },
];
export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1 bg-gray-50/60">
      <PageBanner
        title="Contact Us"
        subtitle="We’d love to hear from you. Get in touch with our team."
        icon="headset"
      />
      <div className="store-container grid items-start gap-6 py-10 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-5">
          {contactItems.map((item) => (
            <section
              key={item.title}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand">
                <StoreIcon name={item.icon} />
              </span>
              <div>
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <p className="mt-2 whitespace-pre-line text-xs leading-5 text-muted">
                  {item.details}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    className="mt-2 inline-block break-all text-sm text-brand hover:underline"
                  >
                    {item.value}
                  </a>
                )}
              </div>
            </section>
          ))}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Follow Us</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                ["Facebook", "https://www.facebook.com/"],
                ["Instagram", "https://www.instagram.com/"],
                ["LinkedIn", "https://www.linkedin.com/"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 px-3 py-2 text-xs text-muted hover:text-brand"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>
        </aside>
        <div>
          <ContactForm />
          <section className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5">
            <h2 className="text-sm font-semibold">
              Looking for quick answers?
            </h2>
            <p className="mt-2 text-xs leading-6 text-muted">
              For questions about orders, shipping, or returns, our support team
              is ready to help.
            </p>
            <a
              href="mailto:support@freshcart.com"
              className="mt-3 inline-block text-xs font-medium text-brand hover:underline"
            >
              Contact Support →
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}

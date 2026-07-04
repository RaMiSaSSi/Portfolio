import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sassi Rami --- available for freelance projects, full-time roles, and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      <Contact />
    </div>
  );
}

import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sassi Rami --- a Full-Stack Engineer from Tunis, Tunisia, specialising in Java, Spring Boot, Angular and React Native.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <AboutContent />
    </div>
  );
}

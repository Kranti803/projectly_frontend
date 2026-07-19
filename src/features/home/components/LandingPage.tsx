import {
  CTASection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  HowItWorksSection,
  Navbar,
  PricingSection,
  TestimonialSection,
} from "@/features/home/components";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <HeroSection onPrimaryClick={() => console.log("navigate to /signup")} />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection
        onSelectPlan={(plan) => console.log("selected plan:", plan)}
      />
      <TestimonialSection />
      <CTASection onPrimaryClick={() => console.log("navigate to /signup")} />
      <FooterSection />
    </div>
  );
}

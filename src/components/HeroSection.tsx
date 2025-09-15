import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      <div className="container px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="hero-title mb-6 fade-in-up">
            Simplify Your HOA Management
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up stagger-1">
            A single platform for communication, payments, and community engagement.
            Transform your homeowners association with modern, user-friendly tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-2">
            <Button size="lg" className="btn-hero px-8 py-6 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="btn-outline px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
import { UserPlus, Settings, Heart } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up",
    description: "Create your HOA account in minutes. Add board members and begin the setup process with our guided onboarding."
  },
  {
    icon: Settings,
    number: "02", 
    title: "Manage",
    description: "Set up your community profile, upload documents, configure payment systems, and customize communication preferences."
  },
  {
    icon: Heart,
    number: "03",
    title: "Engage",
    description: "Connect with residents, facilitate discussions, share updates, and build a stronger, more engaged community."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-subtle">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up stagger-1">
            Get your HOA up and running in three simple steps. No technical expertise required.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className={`text-center fade-in-up stagger-${index + 2}`}>
                <div className="relative mb-8">
                  <div className="icon-container-secondary mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-12 h-px bg-border transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
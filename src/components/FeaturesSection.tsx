import { MessageSquare, CreditCard, Users } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Streamlined Communication",
    description: "Keep residents informed with announcements, newsletters, and real-time updates. No more lost emails or missed notices."
  },
  {
    icon: CreditCard,
    title: "Easy Online Payments",
    description: "Collect HOA fees, assessments, and fines online. Automated reminders and transparent payment tracking for all residents."
  },
  {
    icon: Users,
    title: "Transparent Community Management",
    description: "Access meeting minutes, financial reports, and community documents. Build trust through complete transparency."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            Everything Your HOA Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up stagger-1">
            Powerful tools designed specifically for homeowners associations to improve efficiency and resident satisfaction.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card fade-in-up stagger-${index + 2}`}>
              <div className="icon-container mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
import { Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HOA Board President",
    image: testimonial1,
    content: "This platform has revolutionized how we manage our community. Residents are more engaged, payments are on time, and communication has never been clearer."
  },
  {
    name: "Michael Chen",
    role: "Community Manager",
    image: testimonial2,
    content: "The time savings alone have been incredible. What used to take hours of manual work now happens automatically. Our residents love the transparency and ease of use."
  },
  {
    name: "Emily Rodriguez",
    role: "HOA Treasurer",
    image: testimonial3,
    content: "Financial management became so much simpler. Online payments, automatic tracking, and clear reporting have made my role as treasurer much more manageable."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            Trusted by HOA Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up stagger-1">
            See what community leaders are saying about their experience with our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`testimonial-card fade-in-up stagger-${index + 2}`}>
              {/* Star rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
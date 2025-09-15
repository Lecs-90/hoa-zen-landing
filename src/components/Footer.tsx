import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-up">
              Ready to Modernize Your HOA?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto fade-in-up stagger-1">
              Join hundreds of communities that have transformed their management with our platform. 
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-2">
              <Button size="lg" className="btn-hero px-8 py-6 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-neutral-800 px-8 py-6 text-lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="border-t border-neutral-700">
        <div className="container px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-primary mr-2" />
                <span className="text-xl font-bold">HOA Manager</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Simplifying homeowners association management with modern, user-friendly tools.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-neutral-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row gap-6 mb-4 md:mb-0">
                <div className="flex items-center text-neutral-400">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@hoamanager.com
                </div>
                <div className="flex items-center text-neutral-400">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </div>
              </div>
              <div className="text-neutral-400 text-sm">
                © 2024 HOA Manager. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
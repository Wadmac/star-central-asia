import { Link } from "react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.svg";

const quickLinks = [
  { href: "/tours", label: "All Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About Us" },
  { href: "/travel-guide", label: "Travel Guide" },
  { href: "/contact", label: "Contact" },
  { href: "/request-quote", label: "Request a Quote" },
];

const destinations = [
  { label: "Uzbekistan Tours", href: "/tours?country=uzbekistan" },
  { label: "Kazakhstan Tours", href: "/tours?country=kazakhstan" },
  { label: "Kyrgyzstan Tours", href: "/tours?country=kyrgyzstan" },
  { label: "Tajikistan Tours", href: "/tours?country=tajikistan" },
  { label: "Turkmenistan Tours", href: "/tours?country=turkmenistan" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Star Central Asia" className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">
                Star <span className="text-gold">Central Asia</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Curated journeys across Central Asia — planned by travel experts in Delhi NCR.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/918368032837"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:+918368032837"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              {destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  RC-1045, Bharat Nagar Rd, Makanpur Colony, Sector 62A, Ghaziabad, Uttar Pradesh 201309
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+918368032837" className="hover:text-gold transition-colors">
                  +91 83680 32837
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@starcentralasia.com" className="hover:text-gold transition-colors">
                  info@starcentralasia.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4 shrink-0" />
                Open 24 Hours
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Star Central Asia. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

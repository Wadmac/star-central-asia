import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/travel-guide", label: "Travel Guide" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wide flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Star Central Asia" className="h-8 w-8" />
          <span className="font-serif text-xl font-bold text-navy">
            Star <span className="text-gold">Central Asia</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === link.href
                  ? "text-gold"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://wa.me/918368032837"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link to="/request-quote">Get Free Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="font-serif text-left">
                Star <span className="text-gold">Central Asia</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-gold ${
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-8">
              <Button asChild>
                <Link to="/request-quote" onClick={() => setIsOpen(false)}>
                  Get Free Quote
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://wa.me/918368032837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+918368032837" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
            {!isAuthenticated && (
              <div className="mt-6 pt-6 border-t">
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Phone,
  MessageCircle,
  Shield,
  Award,
  Globe,
  Compass,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const featuredDestinations = [
  {
    name: "Uzbekistan",
    tagline: "Heart of the Silk Road",
    image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80",
    tours: 12,
  },
  {
    name: "Kazakhstan",
    tagline: "Where Steppe Meets Sky",
    image: "https://images.unsplash.com/photo-1580974852861-c381510bc99a?w=800&q=80",
    tours: 8,
  },
  {
    name: "Kyrgyzstan",
    tagline: "Peak of Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tours: 9,
  },
  {
    name: "Tajikistan",
    tagline: "Roof of the World",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    tours: 5,
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Trusted & Transparent",
    description: "No hidden fees, no surprises. Honest pricing and clear communication.",
  },
  {
    icon: Award,
    title: "Expert Local Knowledge",
    description: "Deep roots in Central Asia with authentic insights and connections.",
  },
  {
    icon: Globe,
    title: "5 Countries Covered",
    description: "Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, and Turkmenistan.",
  },
  {
    icon: Compass,
    title: "Custom Itineraries",
    description: "Tailored trips designed around your interests and preferences.",
  },
];

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    text: "An incredible journey through Uzbekistan. The team handled everything perfectly, from visas to hidden gem restaurants.",
    tour: "Silk Road Splendor",
  },
  {
    name: "Priya Singh",
    location: "Noida",
    rating: 5,
    text: "Our Kyrgyzstan adventure was beyond expectations. The yurt stays and mountain treks were unforgettable.",
    tour: "Kyrgyzstan Adventure",
  },
  {
    name: "Amit Sharma",
    location: "Ghaziabad",
    rating: 5,
    text: "Professional, responsive, and truly passionate about Central Asia. Will definitely book again!",
    tour: "Central Asia Grand Tour",
  },
];

export default function Landing() {
  const [searchData, setSearchData] = useState({
    destination: "",
    date: "",
    travelers: "",
    tripType: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80"
            alt="Central Asia Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
        </div>
        <div className="relative container-wide px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">Rated 4.9★ by our travelers</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Discover Central Asia,
                <span className="text-gold block">Your Way.</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-xl">
                Curated journeys across Uzbekistan, Kazakhstan, Kyrgyzstan and beyond — planned by travel experts in Delhi NCR.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gold text-navy hover:bg-gold-dark text-lg px-8" asChild>
                  <Link to="/tours">
                    Explore Tours
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg"
                  asChild
                >
                  <Link to="/request-quote">Get Free Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Enquiry Bar */}
      <section className="relative -mt-16 z-10">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl">
            <CardContent className="p-6">
              <form className="grid md:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Where do you want to go?
                  </label>
                  <Select
                    value={searchData.destination}
                    onValueChange={(value) => setSearchData({ ...searchData, destination: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uzbekistan">Uzbekistan</SelectItem>
                      <SelectItem value="kazakhstan">Kazakhstan</SelectItem>
                      <SelectItem value="kyrgyzstan">Kyrgyzstan</SelectItem>
                      <SelectItem value="tajikistan">Tajikistan</SelectItem>
                      <SelectItem value="turkmenistan">Turkmenistan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    When are you travelling?
                  </label>
                  <Input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    How many travellers?
                  </label>
                  <Select
                    value={searchData.travelers}
                    onValueChange={(value) => setSearchData({ ...searchData, travelers: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Traveler</SelectItem>
                      <SelectItem value="2">2 Travelers</SelectItem>
                      <SelectItem value="3-5">3-5 Travelers</SelectItem>
                      <SelectItem value="6+">6+ Travelers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">What type of trip?</label>
                  <Select
                    value={searchData.tripType}
                    onValueChange={(value) => setSearchData({ ...searchData, tripType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="couple">Couple</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                      <SelectItem value="solo">Solo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" size="lg" className="w-full" asChild>
                  <Link to="/request-quote">
                    Plan My Trip
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold mb-4">
                Featured <span className="text-gold">Destinations</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the ancient Silk Road cities, majestic mountains, and vibrant cultures of Central Asia.
              </p>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/tours?country=${dest.name.toLowerCase()}`}>
                  <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-serif text-2xl font-bold text-white mb-1">
                          {dest.name}
                        </h3>
                        <p className="text-white/80 text-sm mb-2">{dest.tagline}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gold text-sm font-medium">
                            {dest.tours} tours available
                          </span>
                          <ChevronRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/destinations">
                View All Destinations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-cream">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold mb-4">
                Why Travel With <span className="text-gold">Star Central Asia?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                We're not just a travel agency — we're your local experts with deep connections across Central Asia.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80"
                alt="Central Asia"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-gold text-gold" />
                  <span className="font-bold text-lg">4.9/5</span>
                </div>
                <p className="text-sm text-muted-foreground">12 Google Reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold mb-4">
                What Our <span className="text-gold">Travelers Say</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real experiences from real travelers who explored Central Asia with us.
              </p>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location} • {testimonial.tour}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold mb-4">
                Ready to Start Your Central Asian Adventure?
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Get a free, personalized quote from our travel experts. No obligation, no hidden fees — just honest advice and transparent pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gold text-navy hover:bg-gold-dark" asChild>
                  <Link to="/request-quote">
                    Get Free Quote
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <a href="tel:+918368032837" className="gap-2">
                    <Phone className="h-5 w-5" />
                    Call +91 83680 32837
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                  <MessageCircle className="h-6 w-6 text-gold" />
                </div>
                <h4 className="font-semibold mb-1">WhatsApp Us</h4>
                <p className="text-sm text-gray-300">Quick responses 24/7</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <h4 className="font-semibold mb-1">Call Us</h4>
                <p className="text-sm text-gray-300">+91 83680 32837</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <h4 className="font-semibold mb-1">Visit Us</h4>
                <p className="text-sm text-gray-300">Ghaziabad, NCR</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                  <Star className="h-6 w-6 text-gold" />
                </div>
                <h4 className="font-semibold mb-1">4.9★ Rating</h4>
                <p className="text-sm text-gray-300">12 Google Reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

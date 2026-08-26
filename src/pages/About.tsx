import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import {
  MapPin,
  Users,
  Award,
  Heart,
  Shield,
  Globe,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "No hidden fees, no surprises. We believe in honest pricing and clear communication throughout your journey.",
  },
  {
    icon: Heart,
    title: "Personalized Experiences",
    description: "Every traveler is unique. We craft tailored itineraries that match your interests, pace, and budget.",
  },
  {
    icon: Globe,
    title: "Local Expertise",
    description: "Our team has deep roots in Central Asia, providing authentic insights and connections you won't find elsewhere.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "We partner with trusted hotels, airlines, and local operators to ensure every aspect of your trip meets our high standards.",
  },
];

const stats = [
  { number: "500+", label: "Happy Travelers" },
  { number: "50+", label: "Tour Packages" },
  { number: "5", label: "Countries Covered" },
  { number: "8+", label: "Years Experience" },
];

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & Managing Director",
    description: "With over 15 years in the travel industry, Rajesh founded Star Central Asia to share his passion for Central Asian culture and hospitality.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    description: "Priya ensures every trip runs smoothly, coordinating with local partners and managing logistics with meticulous attention to detail.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Alisher Navoi",
    role: "Senior Tour Specialist",
    description: "Born and raised in Uzbekistan, Alisher brings authentic local knowledge and cultural insights to every itinerary he designs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 bg-navy text-white">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Your Trusted Partner for{" "}
                <span className="text-gold">Central Asian Adventures</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Star Central Asia was born from a simple belief: everyone deserves to experience the magic of Central Asia without the hassle of planning. We handle every detail so you can focus on creating memories.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/tours">Explore Tours</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80"
                alt="Central Asia"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold text-navy p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-navy" />
                  <span className="font-bold text-lg">4.9/5</span>
                </div>
                <p className="text-sm">12 Google Reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-cream">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl font-bold text-navy">{stat.number}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">Our Story</h2>
                <div className="w-16 h-1 bg-gold mb-6" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2016 in Ghaziabad, Star Central Asia started with a mission to bridge the gap between Indian travelers and the untouched beauty of Central Asia. What began as a small team of passionate travel enthusiasts has grown into a trusted name in Silk Road tourism.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our founders, having explored every corner of Central Asia personally, understood the challenges travelers face: language barriers, complex logistics, and the difficulty of finding authentic experiences. We built Star Central Asia to solve these problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've helped over 500 travelers discover the magic of Uzbekistan's ancient cities, Kazakhstan's vast steppes, Kyrgyzstan's mountain lakes, and beyond. Our local partnerships and deep regional expertise mean we can offer experiences that go beyond typical tourist routes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from designing tours to providing customer support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate experts dedicated to creating unforgettable Central Asian experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gold text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 mb-6">
              Let us help you plan the perfect Central Asian adventure. Reach out today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-dark" asChild>
                <Link to="/request-quote">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10" asChild>
                <a href="tel:+918368032837" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

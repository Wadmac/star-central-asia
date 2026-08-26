import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Compass, Landmark, Mountain, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const destinations = [
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    tagline: "Heart of the Silk Road",
    description:
      "Discover ancient cities, stunning Islamic architecture, and vibrant bazaars. From Samarkand's Registan to Bukhara's old town, Uzbekistan offers a journey through millennia of history.",
    image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80",
    cities: ["Samarkand", "Bukhara", "Tashkent", "Khiva"],
    highlights: ["Registan Square", "Silk Road Heritage", "Islamic Architecture", "Ancient Bazaars"],
    toursCount: 12,
    icon: Landmark,
  },
  {
    id: "kazakhstan",
    name: "Kazakhstan",
    tagline: "Where Steppe Meets Sky",
    description:
      "Experience the vastness of the Central Asian steppe, futuristic cityscapes, and breathtaking natural wonders. Kazakhstan blends modern ambition with ancient nomadic traditions.",
    image: "https://images.unsplash.com/photo-1580974852861-c381510bc99a?w=800&q=80",
    cities: ["Almaty", "Astana", "Shymkent", "Charyn Canyon"],
    highlights: ["Charyn Canyon", "Mountain Lakes", "Modern Architecture", "Nomadic Culture"],
    toursCount: 8,
    icon: Mountain,
  },
  {
    id: "kyrgyzstan",
    name: "Kyrgyzstan",
    tagline: "Peak of Adventure",
    description:
      "A paradise for nature lovers and adventure seekers. Kyrgyzstan's pristine mountains, crystal-clear lakes, and traditional yurt camps offer authentic Central Asian experiences.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    cities: ["Bishkek", "Issyk-Kul", "Osh", "Naryn"],
    highlights: ["Issyk-Kul Lake", "Ala-Archa National Park", "Yurt Stays", "Mountain Trekking"],
    toursCount: 9,
    icon: Compass,
  },
  {
    id: "tajikistan",
    name: "Tajikistan",
    tagline: "Roof of the World",
    description:
      "Home to some of the world's highest peaks and the legendary Pamir Highway, Tajikistan offers raw, untouched beauty and warm hospitality in the heart of Central Asia.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    cities: ["Dushanbe", "Khorog", "Murghab", "Karakul"],
    highlights: ["Pamir Highway", "Pamir Mountains", "Afghan Border Views", "Ancient Fortresses"],
    toursCount: 5,
    icon: Mountain,
  },
  {
    id: "turkmenistan",
    name: "Turkmenistan",
    tagline: "Mysteries of the East",
    description:
      "One of Central Asia's most enigmatic destinations, Turkmenistan captivates with its white marble capital, ancient ruins, and the surreal Darvaza Gas Crater.",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
    cities: ["Ashgabat", "Mary", "Turkmenbashi", "Darvaza"],
    highlights: ["Darvaza Gas Crater", "Ancient Merv", "White Marble City", "Desert Landscapes"],
    toursCount: 4,
    icon: Globe,
  },
];

export default function Destinations() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 bg-navy text-white">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gold">Destinations</span>
            </h1>
            <p className="text-lg text-gray-300">
              Explore the diverse landscapes, rich cultures, and ancient histories of Central Asia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    {/* Image */}
                    <div className={`relative aspect-[4/3] md:aspect-auto ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy/10" />
                      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                        <div className="flex items-center gap-2 text-white">
                          <destination.icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{destination.toursCount} tours available</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="space-y-4">
                        <div>
                          <h2 className="font-serif text-3xl font-bold mb-2">{destination.name}</h2>
                          <p className="text-gold font-medium">{destination.tagline}</p>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {destination.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Key Destinations</h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.cities.map((city) => (
                              <span
                                key={city}
                                className="px-3 py-1 bg-cream text-navy text-sm rounded-full"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Highlights</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {destination.highlights.map((highlight) => (
                              <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-gold" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button asChild>
                            <Link to={`/tours?country=${destination.id}`}>
                              View Tours
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link to="/request-quote">
                              Get Quote
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-6">
              We specialize in creating custom itineraries tailored to your preferences. Let us design the perfect trip for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/request-quote">Request Custom Tour</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+918368032837">Talk to an Expert</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

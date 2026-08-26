import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Users, Star, ArrowRight, Filter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Tour {
  id: string;
  title: string;
  slug: string;
  country: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  category: string;
}

const sampleTours: Tour[] = [
  {
    id: "1",
    title: "Silk Road Splendor",
    slug: "silk-road-splendor",
    country: "Uzbekistan",
    duration: "8 Days / 7 Nights",
    groupSize: "2-12",
    price: 1299,
    rating: 4.9,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80",
    highlights: ["Samarkand", "Bukhara", "Tashkent", "Khiva"],
    category: "Cultural",
  },
  {
    id: "2",
    title: "Kazakhstan Discovery",
    slug: "kazakhstan-discovery",
    country: "Kazakhstan",
    duration: "6 Days / 5 Nights",
    groupSize: "2-10",
    price: 1099,
    rating: 4.8,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1580974852861-c381510bc99a?w=800&q=80",
    highlights: ["Almaty", "Astana", "Charyn Canyon"],
    category: "Adventure",
  },
  {
    id: "3",
    title: "Kyrgyzstan Adventure",
    slug: "kyrgyzstan-adventure",
    country: "Kyrgyzstan",
    duration: "7 Days / 6 Nights",
    groupSize: "2-8",
    price: 999,
    rating: 4.9,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Bishkek", "Issyk-Kul", "Ala-Archa"],
    category: "Adventure",
  },
  {
    id: "4",
    title: "Pamir Highway Expedition",
    slug: "pamir-highway-expedition",
    country: "Tajikistan",
    duration: "10 Days / 9 Nights",
    groupSize: "2-6",
    price: 1599,
    rating: 4.9,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    highlights: ["Dushanbe", "Pamir Region", "Karakul Lake"],
    category: "Adventure",
  },
  {
    id: "5",
    title: "Central Asia Grand Tour",
    slug: "central-asia-grand-tour",
    country: "Multiple",
    duration: "18 Days / 17 Nights",
    groupSize: "2-10",
    price: 3499,
    rating: 5.0,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    highlights: ["Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan"],
    category: "Multi-Country",
  },
  {
    id: "6",
    title: "Turkmenistan Cultural Journey",
    slug: "turkmenistan-cultural-journey",
    country: "Turkmenistan",
    duration: "5 Days / 4 Nights",
    groupSize: "2-8",
    price: 1299,
    rating: 4.8,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
    highlights: ["Ashgabat", "Darvaza Gas Crater", "Ancient Merv"],
    category: "Cultural",
  },
];

const countries = ["All", "Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Multiple"];
const categories = ["All", "Cultural", "Adventure", "Multi-Country"];
const durations = ["All", "1-5 Days", "6-10 Days", "11-15 Days", "16+ Days"];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const initialCountry = searchParams.get("country") || "All";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTours = useMemo(() => {
    let result = sampleTours;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(query) ||
          tour.country.toLowerCase().includes(query) ||
          tour.highlights.some((h) => h.toLowerCase().includes(query))
      );
    }

    // Country filter
    if (selectedCountry !== "All") {
      result = result.filter((tour) => tour.country === selectedCountry);
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((tour) => tour.category === selectedCategory);
    }

    // Duration filter
    if (selectedDuration !== "All") {
      result = result.filter((tour) => {
        const days = parseInt(tour.duration.split(" ")[0]);
        switch (selectedDuration) {
          case "1-5 Days":
            return days <= 5;
          case "6-10 Days":
            return days >= 6 && days <= 10;
          case "11-15 Days":
            return days >= 11 && days <= 15;
          case "16+ Days":
            return days >= 16;
          default:
            return true;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [searchQuery, selectedCountry, selectedCategory, selectedDuration, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero */}
      <section className="relative py-16 bg-navy text-white">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="text-gold">Tours</span>
            </h1>
            <p className="text-lg text-gray-300">
              Discover handcrafted journeys through Central Asia's most breathtaking destinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12 flex-1">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredTours.length}</span> tours
            </p>
          </div>

          {filteredTours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No tours found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("All");
                  setSelectedCategory("All");
                  setSelectedDuration("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/tours/${tour.slug}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gold text-navy font-semibold">
                            {tour.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-navy">
                            {tour.country}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                          {tour.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tour.highlights.slice(0, 3).map((highlight) => (
                            <span key={highlight} className="text-xs text-muted-foreground">
                              {highlight}
                            </span>
                          ))}
                          {tour.highlights.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{tour.highlights.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {tour.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {tour.groupSize}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-2xl font-bold text-navy">${tour.price}</p>
                            <p className="text-xs text-muted-foreground">per person</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-gold text-gold" />
                            <span className="font-semibold">{tour.rating}</span>
                            <span className="text-sm text-muted-foreground">({tour.reviews})</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

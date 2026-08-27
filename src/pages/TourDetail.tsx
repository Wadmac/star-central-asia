import { useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  Star,
  Check,
  Phone,
  MessageCircle,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface TourData {
  id: string;
  title: string;
  slug: string;
  country: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  category: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

// Sample tour data (in production, this would come from API/database)
const toursData: Record<string, TourData> = {
  "silk-road-splendor": {
    id: "1",
    title: "Silk Road Splendor",
    slug: "silk-road-splendor",
    country: "Uzbekistan",
    duration: "8 Days / 7 Nights",
    groupSize: "2-12",
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 47,
    image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200&q=80",
    highlights: ["Samarkand", "Bukhara", "Tashkent", "Khiva"],
    category: "Cultural",
    description:
      "Embark on a captivating journey along the ancient Silk Road, exploring Uzbekistan's most iconic cities. From the Registan Square in Samarkand to the walled city of Khiva, experience centuries of history, architecture, and culture.",
    inclusions: [
      "7 nights accommodation in 4-star hotels",
      "Daily breakfast and 5 dinners",
      "All ground transportation in air-conditioned vehicles",
      "English-speaking local guides",
      "All entrance fees and permits",
      "Airport transfers",
      "24/7 local support",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips for guides and drivers",
      "Visa fees (if applicable)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Tashkent",
        description: "Welcome to Uzbekistan! Meet at the airport and transfer to your hotel. Evening welcome dinner.",
      },
      {
        day: 2,
        title: "Tashkent City Tour",
        description: "Explore the capital's modern and historic sights, including Chorsu Bazaar and Khast-Imam Complex.",
      },
      {
        day: 3,
        title: "Tashkent to Samarkand",
        description: "High-speed train to Samarkand. Afternoon visit to Registan Square.",
      },
      {
        day: 4,
        title: "Samarkand Exploration",
        description: "Full day exploring Shah-i-Zinda, Bibi-Khanym Mosque, and Ulugh Beg Observatory.",
      },
      {
        day: 5,
        title: "Samarkand to Bukhara",
        description: "Scenic drive to Bukhara. Evening walk through the old city.",
      },
      {
        day: 6,
        title: "Bukhara Heritage",
        description: "Discover the Ark Fortress, Po-i-Kalyan Complex, and traditional craft workshops.",
      },
      {
        day: 7,
        title: "Bukhara to Khiva",
        description: "Cross the Kyzylkum desert to Khiva. Explore the walled city of Itchan-Kala.",
      },
      {
        day: 8,
        title: "Departure from Khiva",
        description: "Morning at leisure, then transfer to airport for your onward journey.",
      },
    ],
    faqs: [
      {
        question: "What is the best time to visit Uzbekistan?",
        answer: "The best time is spring (April-May) and autumn (September-October) when temperatures are pleasant.",
      },
      {
        question: "Do I need a visa?",
        answer: "Many nationalities can get an e-visa or visa-free entry. We'll assist with the process.",
      },
      {
        question: "What should I pack?",
        answer: "Comfortable walking shoes, layers for varying temperatures, and modest clothing for religious sites.",
      },
    ],
  },
};

// Default tour for unknown slugs
const defaultTour = {
  id: "0",
  title: "Central Asia Tour",
  slug: "central-asia-tour",
  country: "Central Asia",
  duration: "7 Days / 6 Nights",
  groupSize: "2-10",
  price: 1199,
  originalPrice: 1399,
  rating: 4.9,
  reviews: 32,
  image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
  highlights: ["Tashkent", "Samarkand", "Bukhara", "Almaty"],
  category: "Cultural",
  description:
    "Experience the magic of Central Asia on this comprehensive tour covering the region's most fascinating destinations. From ancient Silk Road cities to modern metropolises, this journey offers a perfect blend of history, culture, and natural beauty.",
  inclusions: [
    "6 nights accommodation in premium hotels",
    "Daily breakfast and selected dinners",
    "All ground transportation",
    "Expert English-speaking guides",
    "All entrance fees",
    "Airport transfers",
  ],
  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Tips",
    "Visa fees",
  ],
  itinerary: [
    { day: 1, title: "Arrival", description: "Welcome to Central Asia! Airport pickup and hotel check-in." },
    { day: 2, title: "City Exploration", description: "Full day guided tour of the city's highlights." },
    { day: 3, title: "Heritage Sites", description: "Visit UNESCO World Heritage sites and cultural landmarks." },
    { day: 4, title: "Nature & Adventure", description: "Explore stunning natural landscapes and outdoor activities." },
    { day: 5, title: "Local Experiences", description: "Immerse yourself in local culture and traditions." },
    { day: 6, title: "Free Day", description: "Day at leisure for shopping and personal exploration." },
    { day: 7, title: "Departure", description: "Transfer to airport for your onward journey." },
  ],
  faqs: [
    { question: "Is this tour suitable for families?", answer: "Yes, this tour is perfect for families with children of all ages." },
    { question: "What is the group size?", answer: "We keep groups small (2-10 people) for a more personalized experience." },
  ],
};

export default function TourDetail() {
  const { slug } = useParams();
  const tour = toursData[slug || ""] || defaultTour;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your inquiry! We'll contact you shortly.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container-wide">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tours
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge className="bg-gold text-navy">{tour.category}</Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {tour.country}
              </Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {tour.groupSize} people
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-gold text-gold" />
                {tour.rating} ({tour.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 flex-1">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="faqs">FAQs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="prose max-w-none">
                    <h2 className="font-serif text-2xl font-bold mb-4">Tour Overview</h2>
                    <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
                    
                    <h3 className="font-serif text-xl font-bold mt-8 mb-4">Highlights</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {tour.highlights.map((highlight: string) => (
                        <div key={highlight} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-gold" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-4">
                    {tour.itinerary.map((day) => (
                      <Card key={day.day}>
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                              <span className="font-serif font-bold text-gold">D{day.day}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{day.title}</h4>
                              <p className="text-sm text-muted-foreground">{day.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {tour.inclusions.map((item: string) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-4">What's Not Included</h3>
                      <ul className="space-y-3">
                        {tour.exclusions.map((item: string) => (
                          <li key={item} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-red-500">✕</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faqs" className="mt-6">
                  <h2 className="font-serif text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {tour.faqs.map((faq, index) => (
                      <Card key={index}>
                        <CardContent className="p-5">
                          <h4 className="font-semibold mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-navy">${tour.price}</span>
                      {tour.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${tour.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Travelers</label>
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          value={formData.travelers}
                          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Travel Date</label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message (Optional)</label>
                      <Textarea
                        placeholder="Any special requirements or questions?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Book Now
                    </Button>
                  </form>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <a href="tel:+918368032837">
                        <Phone className="h-4 w-4" />
                        Call to Inquire
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <a
                        href="https://wa.me/918368032837?text=Hi! I'm interested in the ${tour.title} tour."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp Inquiry
                      </a>
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="icon" className="flex-1">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="flex-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

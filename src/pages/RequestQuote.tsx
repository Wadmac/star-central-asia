import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MessageCircle,
  Phone,
  Check,
  Clock,
  Shield,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const destinations = [
  "Uzbekistan",
  "Kazakhstan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Multiple Countries",
  "Not Sure Yet",
];

const tripTypes = [
  "Cultural & Heritage",
  "Adventure & Trekking",
  "Luxury & Relaxation",
  "Photography Tour",
  "Honeymoon",
  "Family Vacation",
  "Group Tour",
  "Custom Itinerary",
];

const budgetRanges = [
  "Economy ($800 - $1,200)",
  "Standard ($1,200 - $2,000)",
  "Premium ($2,000 - $3,500)",
  "Luxury ($3,500+)",
  "Not Sure / Flexible",
];

const benefits = [
  {
    icon: Check,
    title: "Free Custom Quote",
    description: "No obligation, completely free",
  },
  {
    icon: Clock,
    title: "24-Hour Response",
    description: "We'll get back to you quickly",
  },
  {
    icon: Shield,
    title: "No Hidden Fees",
    description: "Transparent pricing always",
  },
];

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    tripType: "",
    travelers: "",
    startDate: "",
    duration: "",
    budget: "",
    accommodation: "",
    specialRequirements: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuote = useMutation(api.tours.submitQuote);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitQuote({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        tripType: formData.tripType || undefined,
        travelers: parseInt(formData.travelers) || 1,
        startDate: formData.startDate,
        duration: formData.duration || undefined,
        budget: formData.budget || undefined,
        accommodation: formData.accommodation || undefined,
        specialRequirements: formData.specialRequirements || undefined,
      });
      alert("Thank you for your request! Our travel experts will contact you within 24 hours with a personalized quote.");
      setFormData({
        name: "", email: "", phone: "", destination: "", tripType: "",
        travelers: "", startDate: "", duration: "", budget: "",
        accommodation: "", specialRequirements: "", newsletter: false,
      });
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Get Your <span className="text-gold">Free Quote</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Tell us about your dream trip, and our travel experts will create a personalized itinerary with transparent pricing.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="text-center">
                    <benefit.icon className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <p className="text-sm font-medium">{benefit.title}</p>
                    <p className="text-xs text-gray-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
                alt="Central Asia"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 flex-1">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">
                      Tell Us About Your Trip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Personal Information</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Trip Details</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Destination <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.destination}
                              onValueChange={(value) => setFormData({ ...formData, destination: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select destination" />
                              </SelectTrigger>
                              <SelectContent>
                                {destinations.map((dest) => (
                                  <SelectItem key={dest} value={dest}>
                                    {dest}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Trip Type</label>
                            <Select
                              value={formData.tripType}
                              onValueChange={(value) => setFormData({ ...formData, tripType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select trip type" />
                              </SelectTrigger>
                              <SelectContent>
                                {tripTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Number of Travelers <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="number"
                              min="1"
                              max="50"
                              placeholder="2"
                              value={formData.travelers}
                              onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Preferred Start Date <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="date"
                              value={formData.startDate}
                              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Duration</label>
                            <Input
                              placeholder="e.g., 10 days"
                              value={formData.duration}
                              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Budget Range (per person)</label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => setFormData({ ...formData, budget: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                              <SelectContent>
                                {budgetRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Accommodation Preference</label>
                            <Select
                              value={formData.accommodation}
                              onValueChange={(value) => setFormData({ ...formData, accommodation: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="budget">Budget / Hostels</SelectItem>
                                <SelectItem value="3star">3-Star Hotels</SelectItem>
                                <SelectItem value="4star">4-Star Hotels</SelectItem>
                                <SelectItem value="5star">5-Star / Luxury</SelectItem>
                                <SelectItem value="mix">Mix of Options</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Additional Information</h3>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Special Requirements or Questions</label>
                          <Textarea
                            placeholder="Tell us about any dietary requirements, accessibility needs, special occasions, or questions you have..."
                            value={formData.specialRequirements}
                            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                            rows={4}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, newsletter: checked as boolean })
                            }
                          />
                          <label
                            htmlFor="newsletter"
                            className="text-sm text-muted-foreground cursor-pointer"
                          >
                            Send me travel tips and exclusive offers
                          </label>
                        </div>
                      </div>

                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Submit Quote Request
                            <MessageCircle className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-serif text-lg font-bold">Prefer to Talk?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our travel experts are available 24/7 to help plan your perfect trip.
                  </p>
                  <Button className="w-full gap-2" asChild>
                    <a href="tel:+918368032837">
                      <Phone className="h-4 w-4" />
                      Call +91 83680 32837
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a
                      href="https://wa.me/918368032837?text=Hi! I'd like to plan a trip to Central Asia."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* What Happens Next */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-bold mb-4">What Happens Next?</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-gold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Review Your Request</p>
                        <p className="text-xs text-muted-foreground">Our experts review your requirements</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-gold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Custom Itinerary</p>
                        <p className="text-xs text-muted-foreground">We create a personalized travel plan</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-gold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Transparent Quote</p>
                        <p className="text-xs text-muted-foreground">Receive detailed pricing with no hidden fees</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-gold">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Book Your Trip</p>
                        <p className="text-xs text-muted-foreground">Confirm and start your adventure</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="bg-cream">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-gold text-gold"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm italic mb-4">
                    "Star Central Asia made our Silk Road journey absolutely unforgettable. The attention to detail and local expertise was exceptional!"
                  </p>
                  <p className="text-sm font-medium">— Rahul M., Delhi</p>
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

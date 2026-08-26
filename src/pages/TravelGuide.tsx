import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, User, ArrowRight, BookOpen, Compass, Map } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Ultimate Guide to the Silk Road in Uzbekistan",
    slug: "ultimate-guide-silk-road-uzbekistan",
    excerpt: "Everything you need to know about exploring the ancient Silk Road cities of Uzbekistan, from Tashkent to Khiva.",
    content: "",
    image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80",
    category: "Destination Guide",
    author: "Rajesh Kumar",
    date: "March 15, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Best Time to Visit Central Asia: Seasonal Guide",
    slug: "best-time-visit-central-asia",
    excerpt: "Discover the ideal months to explore each Central Asian country based on weather, festivals, and crowds.",
    content: "",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Travel Tips",
    author: "Priya Sharma",
    date: "March 10, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "3",
    title: "Central Asia Visa Guide for Indian Travelers",
    slug: "central-asia-visa-guide-indian-travelers",
    excerpt: "A comprehensive guide to visa requirements and application processes for all Central Asian countries.",
    content: "",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    category: "Visa & Documents",
    author: "Rajesh Kumar",
    date: "March 5, 2024",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Pamir Highway: The Ultimate Road Trip Guide",
    slug: "pamir-highway-road-trip-guide",
    excerpt: "Plan your journey along one of the world's most spectacular mountain roads with this detailed guide.",
    content: "",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Adventure",
    author: "Alisher Navoi",
    date: "February 28, 2024",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "5",
    title: "What to Pack for a Central Asia Trip",
    slug: "what-to-pack-central-asia",
    excerpt: "Essential packing list and tips for traveling through Central Asia's diverse climates and terrain.",
    content: "",
    image: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=800&q=80",
    category: "Travel Tips",
    author: "Priya Sharma",
    date: "February 20, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Kyrgyzstan's Yurt Stays: An Authentic Experience",
    slug: "kyrgyzstan-yurt-stays-authentic-experience",
    excerpt: "Discover the magic of staying in traditional yurts in Kyrgyzstan's stunning mountain landscapes.",
    content: "",
    image: "https://images.unsplash.com/photo-1580974852861-c381510bc99a?w=800&q=80",
    category: "Cultural Experience",
    author: "Alisher Navoi",
    date: "February 15, 2024",
    readTime: "7 min read",
    featured: false,
  },
];

const categories = ["All", "Destination Guide", "Travel Tips", "Visa & Documents", "Adventure", "Cultural Experience"];

export default function TravelGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post !== featuredPost);

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
              Travel <span className="text-gold">Guide</span>
            </h1>
            <p className="text-lg text-gray-300">
              Expert tips, destination guides, and travel inspiration for your Central Asian adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/travel-guide/${featuredPost.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-[16/10] md:aspect-auto">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gold text-navy">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-4">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 hover:text-gold transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <Button className="w-fit gap-2">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-6 border-b sticky top-16 z-40 bg-background/95 backdrop-blur">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 flex-1">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          {regularPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/travel-guide/${post.slug}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5">
                        <Badge variant="secondary" className="mb-3">
                          {post.category}
                        </Badge>
                        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
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

      {/* Newsletter CTA */}
      <section className="py-16 bg-cream">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <BookOpen className="h-10 w-10 mx-auto text-gold mb-4" />
            <h2 className="font-serif text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest travel guides, tips, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, LogOut, MapPin, Calendar, Package, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Navbar } from "@/components/Navbar";

const quickActions = [
  {
    icon: Package,
    title: "Browse Tours",
    description: "Explore our curated Central Asia tour packages",
    href: "/tours",
    color: "text-gold",
  },
  {
    icon: MapPin,
    title: "View Destinations",
    description: "Discover breathtaking destinations across the region",
    href: "/destinations",
    color: "text-sky",
  },
  {
    icon: Calendar,
    title: "Request Quote",
    description: "Get a personalized travel quote in 24 hours",
    href: "/request-quote",
    color: "text-green-600",
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Chat with our travel experts anytime",
    href: "/contact",
    color: "text-purple-600",
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-6 py-10 text-foreground">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Welcome back to Star Central Asia
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Hello{user?.name ? `, ${user.name}` : " Traveler"}! 👋
              </h1>
            </div>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-2 self-start"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </header>

          {/* Welcome Card */}
          <Card className="border-border/70 shadow-sm bg-gradient-to-r from-navy to-navy-light text-white">
            <CardContent className="p-8">
              <h2 className="font-serif text-2xl font-bold mb-2">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                Explore our curated collection of Central Asian tours or request a custom itinerary tailored just for you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gold text-navy hover:bg-gold-dark" asChild>
                  <Link to="/tours">Browse Tours</Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/request-quote">Get Custom Quote</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h2 className="font-serif text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.href} className="block">
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-5">
                      <action.icon className={`h-8 w-8 mb-3 ${action.color}`} />
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity / Placeholder */}
          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="font-serif text-lg">Your Travel Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your booking history, saved tours, and travel documents will appear here. Start exploring our tours to begin your Central Asian adventure!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

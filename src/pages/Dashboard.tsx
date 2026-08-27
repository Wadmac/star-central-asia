import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, MapPin, Calendar, Package, MessageCircle, Clock, CheckCircle, XCircle } from "lucide-react";
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

          {/* User Bookings */}
          <UserBookings />
        </div>
      </main>
    </div>
  );
}

function UserBookings() {
  const bookings = useQuery(api.tours.getUserBookings);

  if (bookings === undefined) {
    return (
      <Card className="border-border/70 shadow-none">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Your Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="border-border/70 shadow-none">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Your Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            You haven't booked any tours yet. Start exploring our curated collection of Central Asian tours!
          </p>
          <Button asChild>
            <Link to="/tours">Browse Tours</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Card className="border-border/70 shadow-none">
      <CardHeader>
        <CardTitle className="font-serif text-lg">Your Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                {getStatusIcon(booking.status)}
                <div>
                  <Link to={`/tours/${booking.tourSlug}`} className="font-semibold hover:text-gold transition-colors">
                    {booking.tourTitle}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {booking.startDate} · {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
                <p className="text-sm font-semibold mt-1">${booking.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>    </Card>
  );
}

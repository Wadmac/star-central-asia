import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all active tours
export const list = query({
  args: {
    country: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let tours = await ctx.db
      .query("tours")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    if (args.country && args.country !== "All") {
      tours = tours.filter((tour) => tour.country === args.country);
    }
    if (args.category && args.category !== "All") {
      tours = tours.filter((tour) => tour.category === args.category);
    }

    return tours;
  },
});

// Get tour by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const tour = await ctx.db
      .query("tours")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return tour;
  },
});

// Get tour by ID
export const getById = query({
  args: { id: v.id("tours") },
  handler: async (ctx, args) => {
    const tour = await ctx.db.get(args.id);
    return tour;
  },
});

// Get reviews for a tour
export const getReviews = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .filter((q) => q.eq(q.field("isApproved"), true))
      .order("desc")
      .collect();
    return reviews;
  },
});

// Add a review
export const addReview = mutation({
  args: {
    tourId: v.id("tours"),
    tourTitle: v.string(),
    rating: v.number(),
    comment: v.string(),
    authorName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be signed in to leave a review");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq("email", identity.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user already reviewed this tour
    const existingReview = await ctx.db
      .query("reviews")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("tourId"), args.tourId))
      .first();

    if (existingReview) {
      throw new Error("You have already reviewed this tour");
    }

    const reviewId = await ctx.db.insert("reviews", {
      userId: user._id,
      tourId: args.tourId,
      tourTitle: args.tourTitle,
      rating: args.rating,
      comment: args.comment,
      authorName: args.authorName,
      authorImage: user.image,
      isApproved: false,
      createdAt: Date.now(),
    });

    return reviewId;
  },
});

// Create a booking
export const createBooking = mutation({
  args: {
    tourId: v.id("tours"),
    tourTitle: v.string(),
    tourSlug: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    travelers: v.number(),
    startDate: v.string(),
    message: v.optional(v.string()),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity
      ? (await ctx.db.query("users").filter((q) => q.eq("email", identity.email)).first())?._id
      : undefined;

    const bookingId = await ctx.db.insert("bookings", {
      userId,
      tourId: args.tourId,
      tourTitle: args.tourTitle,
      tourSlug: args.tourSlug,
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      travelers: args.travelers,
      startDate: args.startDate,
      message: args.message,
      status: "pending",
      totalAmount: args.totalAmount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return bookingId;
  },
});

// Get user's bookings
export const getUserBookings = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq("email", identity.email))
      .first();

    if (!user) {
      return [];
    }

    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return bookings;
  },
});

// Send a message
export const sendMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    tourId: v.optional(v.id("tours")),
    tourTitle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity
      ? (await ctx.db.query("users").filter((q) => q.eq("email", identity.email)).first())?._id
      : undefined;

    const messageId = await ctx.db.insert("messages", {
      userId,
      name: args.name,
      email: args.email,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      tourId: args.tourId,
      tourTitle: args.tourTitle,
      isRead: false,
      createdAt: Date.now(),
    });

    return messageId;
  },
});

// Submit a quote request
export const submitQuote = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    destination: v.string(),
    tripType: v.optional(v.string()),
    travelers: v.number(),
    startDate: v.string(),
    duration: v.optional(v.string()),
    budget: v.optional(v.string()),
    accommodation: v.optional(v.string()),
    specialRequirements: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity
      ? (await ctx.db.query("users").filter((q) => q.eq("email", identity.email)).first())?._id
      : undefined;

    const quoteId = await ctx.db.insert("quoteRequests", {
      userId,
      name: args.name,
      email: args.email,
      phone: args.phone,
      destination: args.destination,
      tripType: args.tripType,
      travelers: args.travelers,
      startDate: args.startDate,
      duration: args.duration,
      budget: args.budget,
      accommodation: args.accommodation,
      specialRequirements: args.specialRequirements,
      status: "pending",
      createdAt: Date.now(),
    });

    return quoteId;
  },
});

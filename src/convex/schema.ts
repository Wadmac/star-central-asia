import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

// Booking status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PAID: "paid",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const bookingStatusValidator = v.union(
  v.literal(BOOKING_STATUS.PENDING),
  v.literal(BOOKING_STATUS.CONFIRMED),
  v.literal(BOOKING_STATUS.PAID),
  v.literal(BOOKING_STATUS.COMPLETED),
  v.literal(BOOKING_STATUS.CANCELLED),
);

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
      phone: v.optional(v.string()),
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Tour packages
    tours: defineTable({
      title: v.string(),
      slug: v.string(),
      country: v.string(),
      duration: v.string(),
      groupSize: v.string(),
      price: v.number(),
      originalPrice: v.optional(v.number()),
      rating: v.number(),
      reviews: v.number(),
      image: v.string(),
      highlights: v.array(v.string()),
      category: v.string(),
      description: v.string(),
      inclusions: v.array(v.string()),
      exclusions: v.array(v.string()),
      itinerary: v.array(v.object({
        day: v.number(),
        title: v.string(),
        description: v.string(),
      })),
      faqs: v.array(v.object({
        question: v.string(),
        answer: v.string(),
      })),
      isActive: v.boolean(),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_slug", ["slug"])
      .index("by_country", ["country"])
      .index("by_category", ["category"]),

    // Bookings
    bookings: defineTable({
      userId: v.optional(v.id("users")),
      tourId: v.id("tours"),
      tourTitle: v.string(),
      tourSlug: v.string(),
      customerName: v.string(),
      customerEmail: v.string(),
      customerPhone: v.string(),
      travelers: v.number(),
      startDate: v.string(),
      message: v.optional(v.string()),
      status: bookingStatusValidator,
      totalAmount: v.number(),
      paymentId: v.optional(v.string()),
      paidAt: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_tour", ["tourId"])
      .index("by_status", ["status"]),

    // Messages / Inquiries
    messages: defineTable({
      userId: v.optional(v.id("users")),
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      subject: v.string(),
      message: v.string(),
      tourId: v.optional(v.id("tours")),
      tourTitle: v.optional(v.string()),
      isRead: v.boolean(),
      createdAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_tour", ["tourId"])
      .index("by_read", ["isRead"]),

    // Reviews / Comments
    reviews: defineTable({
      userId: v.id("users"),
      tourId: v.id("tours"),
      tourTitle: v.string(),
      rating: v.number(),
      comment: v.string(),
      authorName: v.string(),
      authorImage: v.optional(v.string()),
      isApproved: v.boolean(),
      createdAt: v.number(),
    })
      .index("by_tour", ["tourId"])
      .index("by_user", ["userId"])
      .index("by_approved", ["isApproved"]),

    // Quote requests
    quoteRequests: defineTable({
      userId: v.optional(v.id("users")),
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
      status: v.string(),
      createdAt: v.number(),
    })
      .index("by_user", ["userId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;

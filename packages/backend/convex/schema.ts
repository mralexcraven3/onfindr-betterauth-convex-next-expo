// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  businesses: defineTable({
    ownerId: v.optional(v.id("users")),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    phone: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    // status: defaulting to 'active' should be set by your insert mutation
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("inactive"),
        v.literal("closed"),
        v.literal("pending")
      )
    ),
    isClaimed: v.optional(v.boolean()),
    isVerified: v.optional(v.boolean()),
    avgRating: v.optional(v.number()), // float
    reviewCount: v.optional(v.number()), // integer-ish
    updatedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_ownerId", ["ownerId"])
    .index("by_status", ["status"]),

  businessLocations: defineTable({
    businessId: v.id("businesses"),
    label: v.optional(v.string()),
    addressLine1: v.optional(v.string()),
    addressLine2: v.optional(v.string()),
    city: v.optional(v.string()),
    region: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    country: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    isPrimary: v.optional(v.boolean()),
    phone: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
  }).index("by_businessId", ["businessId"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    parentId: v.optional(v.id("categories")),
    isActive: v.optional(v.boolean()),
  })
    .index("by_slug", ["slug"])
    .index("by_parentId", ["parentId"]),

  businessCategories: defineTable({
    businessId: v.id("businesses"),
    categoryId: v.id("categories"),
    isPrimary: v.optional(v.boolean()),
  })
    .index("by_businessId", ["businessId"])
    .index("by_categoryId", ["categoryId"]),

  reviews: defineTable({
    businessId: v.id("businesses"),
    userId: v.optional(v.id("users")),
    rating: v.number(), // 1..5 enforced in your app / mutation
    title: v.optional(v.string()),
    body: v.optional(v.string()),
    isRecommended: v.optional(v.boolean()),
    language: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("published"),
        v.literal("flagged"),
        v.literal("removed")
      )
    ),
    updatedAt: v.optional(v.number()),
  })
    .index("by_businessId", ["businessId"])
    .index("by_business_user", ["businessId", "userId"])
    .index("by_business_status", ["businessId", "status"]),

  businessPhotos: defineTable({
    businessId: v.id("businesses"),
    url: v.string(),
    caption: v.optional(v.string()),
    isPrimary: v.optional(v.boolean()),
    uploadedBy: v.optional(v.id("users")),
  }).index("by_businessId", ["businessId"]),

  reviewPhotos: defineTable({
    reviewId: v.id("reviews"),
    url: v.string(),
    caption: v.optional(v.string()),
    uploadedBy: v.optional(v.id("users")),
  }).index("by_reviewId", ["reviewId"]),

  businessHours: defineTable({
    locationId: v.id("businessLocations"),
    weekday: v.number(), // 0=Sunday..6=Saturday
    opens: v.string(), // store as "HH:MM" or ISO time string
    closes: v.string(),
    isClosed: v.optional(v.boolean()),
  }).index("by_locationId", ["locationId"]),
});
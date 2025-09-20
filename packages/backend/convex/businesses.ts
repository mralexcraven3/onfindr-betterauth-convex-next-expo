import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("businesses").collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        website: v.optional(v.string()),
        phone: v.optional(v.string()),
        contactEmail: v.optional(v.string()),
        status:v.optional(v.union(
            v.literal("active"),
            v.literal("inactive"),
            v.literal("closed"),
            v.literal("pending")
        )),
        isClaimed: v.optional(v.boolean()),
        isVerified: v.optional(v.boolean()),
        avgRating: v.optional(v.number()), // float
        reviewCount: v.optional(v.number()), // integer-ish
    },
    handler: async (ctx, args) => {
        const newTodoId = await ctx.db.insert("businesses", {
            name: args.name,
            slug: args.slug,
            website: args.website,
            phone: args.phone,
            contactEmail: args.contactEmail,
            status: args.status,
            isClaimed: args.isClaimed,
            isVerified: args.isVerified,
            avgRating: args.avgRating,
            reviewCount: args.reviewCount 
        });
        return await ctx.db.get(newTodoId);
    },
});
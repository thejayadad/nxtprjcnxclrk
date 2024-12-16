import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    userId: v.string(),
    classId: v.id("events"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!user || user !== args.userId) {
      throw new Error("User not authenticated or mismatched userId");
    }

    // Fetch the event to check capacity
    const event = await ctx.db.get(args.classId);
    if (!event) {
      throw new Error("Event not found");
    }

    // Count existing bookings for the event
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_class_id", (q) => q.eq("classId", args.classId))
      .collect();

    if (bookings.length >= event.capacity) {
      throw new Error("Event is fully booked");
    }

    // Create the booking
    const bookingId = await ctx.db.insert("bookings", {
      userId: args.userId,
      classId: args.classId,
      status: args.status,
      createdAt: new Date().toISOString(),
    });

    return bookingId;
  },
});

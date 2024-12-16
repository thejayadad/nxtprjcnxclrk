import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.string(),
    createdAt: v.string(),
  }).index("by_email", ["email"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    instructorId: v.string(),
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    capacity: v.number(),
    createdAt: v.string(),
    imageUrl: v.optional(v.id("_storage")),
  })
    .index("by_instructor_id", ["instructorId"])
    .index("by_date", ["date"]),

  bookings: defineTable({
    userId: v.string(),
    classId: v.id("events"), // Corrected to reference `events` table
    status: v.string(),
    createdAt: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_class_id", ["classId"]),

  notifications: defineTable({
    userId: v.string(),
    message: v.string(),
    type: v.string(),
    isRead: v.boolean(),
    createdAt: v.string(),
  }).index("by_user_id", ["userId"]),
});

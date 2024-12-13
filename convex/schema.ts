import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.string(),
    createdAt: v.string(), // Store dates as ISO strings
  }).index("by_email", ["email"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    instructorId: v.string(), // References a user
    date: v.string(), // ISO string
    startTime: v.string(), // e.g., "15:00"
    endTime: v.string(), // e.g., "16:00"
    capacity: v.number(), // Max number of attendees
    createdAt: v.string(),
  })
    .index("by_instructor_id", ["instructorId"])
    .index("by_date", ["date"]),

  bookings: defineTable({
    userId: v.string(), // References a user
    classId: v.string(), // References a class
    status: v.string(), // e.g., "confirmed", "canceled"
    
    createdAt: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_class_id", ["classId"]),

  notifications: defineTable({
    userId: v.string(),
    message: v.string(),
    type: v.string(), // e.g., "reminder", "class_full"
    isRead: v.boolean(),
    createdAt: v.string(),
  }).index("by_user_id", ["userId"]),
});

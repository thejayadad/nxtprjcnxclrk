import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to list all events
export const listEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    const eventsImages = await Promise.all(events.map(async (event) => {
      if(event.imageUrl){
        const imageUrl = await ctx.storage.getUrl(event.imageUrl)
        return {...event, imageUrl}
      } else {
        return event
      }
    }))
    return eventsImages
  },
});






// Mutation to create a new event with storage
export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    date: v.string(), // ISO string
    startTime: v.string(), // e.g., "15:00"
    endTime: v.string(), // e.g., "16:00"
    imageUrl: v.optional(v.id("_storage")), // Corrected the field name to `imageUrl`
  },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const instructorId = user;
    const newEventId = await ctx.db.insert("events", {
      ...args,
      imageUrl: args.imageUrl, // Corrected the field name to `imageUrl`
      instructorId,
      createdAt: new Date().toISOString(),
      capacity: 0
    });

    return newEventId;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
  args: {
    storageId: v.id("_storage"),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("images", {
      storageId: args.storageId, // `storageId` in the schema matches this
      author: args.author,
      format: "image", // Assuming all images are of "image" format
      createdAt: new Date().toISOString(),
    });
  },
});






// export const getEventById = query({
//   args: {
//     eventId: v.id("events"), // Ensure eventId is a valid Convex ID for the events table
//   },
//   handler: async (ctx, args) => {
//     const event = await ctx.db.get(args.eventId);

//     if (!event) {
//       throw new Error("Event not found");
//     }

//     if (event.imageUrl) {
//       const imageUrl = await ctx.storage.getUrl(event.imageUrl);
//       return { ...event, imageUrl };
//     }

   
//   },
// });



export const getEventById = query({
  args: {
    id: v.id("events"), // Validate eventId as a Convex ID
  },
  handler: async (ctx, args) => {
    // const event = await ctx.db.get(args.id); // Fetch event by ID

    // if (!event) {
    //   throw new Error("Event not found");
    // }
    // console.log("Backend Get Request " + event)
    // return event;
    return await ctx.db.get(args.id)
  },
});

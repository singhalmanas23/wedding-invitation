import mongoose, { Schema, type Document } from "mongoose";

export interface IRsvp extends Document {
  name: string;
  email: string;
  phone?: string;
  attending: "yes" | "no" | "maybe";
  eventsAttending: string[];
  dietaryRestrictions?: string;
  plusOne: boolean;
  plusOneName?: string;
  notes?: string;
  submittedAt: Date;
}

const RsvpSchema = new Schema<IRsvp>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    attending: {
      type: String,
      enum: ["yes", "no", "maybe"],
      required: true,
    },
    eventsAttending: [{ type: String }],
    dietaryRestrictions: { type: String, trim: true },
    plusOne: { type: Boolean, default: false },
    plusOneName: { type: String, trim: true },
    notes: { type: String, trim: true },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

RsvpSchema.index({ email: 1 });

export default mongoose.models.Rsvp ||
  mongoose.model<IRsvp>("Rsvp", RsvpSchema);

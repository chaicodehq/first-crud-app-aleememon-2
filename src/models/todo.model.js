import mongoose from "mongoose";

/**
 * TODO: Define Todo schema
 *
 * Fields:
 * - title: String, required, trim, min 3, max 120 chars
 * - completed: Boolean, default false
 * - priority: Enum ["low", "medium", "high"], default "medium"
 * - tags: Array of Strings, max 10 items, default []
 * - dueDate: Date, optional
 *
 * Options:
 * - Enable timestamps
 * - Add index: { completed: 1, createdAt: -1 }
 */

const todoSchema = new mongoose.Schema(
  {
    // Your schema fields here
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 120,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: {
      type: [String],
      validate: [(val) => val.length <= 10, `{PATH} exceeds the limit of 10`],
    },
    dueDate: {
      type: Date,
      optional: true,
    },
  },
  {
    // Schema options here
    timestamps: true,
  },
);

// TODO: Add index
todoSchema.index({ completed: 1, createdAt: -1 });
// TODO: Create and export the Todo model
export const Todo = mongoose.model("Todo", todoSchema);

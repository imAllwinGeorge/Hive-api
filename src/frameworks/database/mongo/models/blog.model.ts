import { model, Schema, type ObjectId } from "mongoose";
import type { IBlogEntity } from "../../../../entities/models/blog.entity";

export interface IBlogModel extends IBlogEntity {
  _id: ObjectId;
}

const BlogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    sections: [
      {
        sectionTitle: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [String],
      default: [],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = model<IBlogModel>("Blog", BlogSchema);

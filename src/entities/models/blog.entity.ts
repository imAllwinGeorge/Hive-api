import type { ObjectId } from "mongoose";
import type { IBaseEntity } from "./base.entity.js";

export interface IBlogEntity extends IBaseEntity {
  userId: string; // Author's user ID
  title: string; // Blog title
  author: string; // Author name (redundant but useful for fast access)
  introduction: string; // Short intro or preview text
  sections: BlogSection[]; // Multiple sections in the blog
  image: string; // Main or introduction image
  views: number; // Number of views
  likes: string[]; // Array of userIds who liked it
}

export interface BlogSection {
  sectionTitle: string; // Title of the section
  content: string; // Body content (Markdown or HTML)
  image: string; // Optional image for the section
}
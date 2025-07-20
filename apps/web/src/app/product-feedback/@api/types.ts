import { z } from "zod";

// Comment schema
export const CommentSchema = z.object({
    id: z.number(),
    content: z.string(),
    replyingTo: z.string().optional(),
    replies: z.array(z.lazy(() => CommentSchema)).optional(),
    user: z.object({
        image: z.string(),
        name: z.string(),
        username: z.string(),
    }),
});

export type Comment = z.infer<typeof CommentSchema>;

// ProductRequest schema
export const ProductRequestSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    title: z.string().optional(),
    category: z.string().default(''),
    upvotes: z.number().default(0),
    status: z.string().default(''),
    description: z.string().optional(),
    comments: z.array(CommentSchema).optional(),
});

export type ProductRequest = z.infer<typeof ProductRequestSchema>;

export const emptyProductRequest = ProductRequestSchema.parse({});

export type User = {
    "image": string,
    "name": string,
    "username": string
}
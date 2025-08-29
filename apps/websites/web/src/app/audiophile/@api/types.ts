import { z } from "zod";

const imageSchema = z.object({
    mobile: z.string(),
    tablet: z.string(),
    desktop: z.string(),
});

const includeItemSchema = z.object({
    quantity: z.number(),
    item: z.string(),
});

const gallerySchema = z.object({
    first: imageSchema,
    second: imageSchema,
    third: imageSchema,
});

const otherProductSchema = z.object({
    slug: z.string(),
    name: z.string(),
    image: imageSchema,
});

export const productSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    image: imageSchema,
    category: z.string(),
    categoryImage: imageSchema,
    new: z.boolean(),
    price: z.number(),
    description: z.string(),
    features: z.string(),
    includes: z.array(includeItemSchema),
    gallery: gallerySchema,
    others: z.array(otherProductSchema),
});

// ✅ Inferred Type
export type Product = z.infer<typeof productSchema>;
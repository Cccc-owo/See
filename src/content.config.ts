import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsLoader = glob({
	base: "./src/content/posts",
	pattern: "**/*.{md,mdx}",
});

const postsSchema = z.object({
	title: z.string(),
	published: z.date(),
	updated: z.date().optional(),
	draft: z.boolean().optional().default(false),
	description: z.string().optional().default(""),
	image: z.string().optional().default(""),
	tags: z.array(z.string()).optional().default([]),
	category: z.string().optional().nullable().default(""),
	lang: z.string().optional().default(""),

	/* For internal use */
	prevTitle: z.string().default(""),
	prevSlug: z.string().default(""),
	nextTitle: z.string().default(""),
	nextSlug: z.string().default(""),
});

const postsCollection: CollectionConfig<
	typeof postsSchema,
	typeof postsLoader
> = defineCollection({
	loader: postsLoader,
	schema: postsSchema,
});

const specLoader = glob({
	base: "./src/content/spec",
	pattern: "**/*.{md,mdx}",
});

const specSchema = z.object({});

const specCollection: CollectionConfig<typeof specSchema, typeof specLoader> =
	defineCollection({
		loader: specLoader,
		schema: specSchema,
	});

export const collections: {
	posts: typeof postsCollection;
	spec: typeof specCollection;
} = {
	posts: postsCollection,
	spec: specCollection,
};

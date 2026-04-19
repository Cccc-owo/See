import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsSchema = z.object({
	title: z.string(),
	published: z.date(),
	updated: z.date().optional(),
	draft: z.boolean().optional().default(false),
	pinned: z.boolean().optional().default(false),
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

const personalPostsLoader = glob({
	base: "./src/content/personal/posts",
	pattern: "**/*.{md,mdx}",
});

const personalPostsCollection: CollectionConfig<
	typeof postsSchema,
	typeof personalPostsLoader
> = defineCollection({
	loader: personalPostsLoader,
	schema: postsSchema,
});

const templatePostsLoader = glob({
	base: "./src/content/template/posts",
	pattern: "**/*.{md,mdx}",
});

const templatePostsCollection: CollectionConfig<
	typeof postsSchema,
	typeof templatePostsLoader
> = defineCollection({
	loader: templatePostsLoader,
	schema: postsSchema,
});

const specSchema = z.object({});

const personalSpecLoader = glob({
	base: "./src/content/personal/spec",
	pattern: "**/*.{md,mdx}",
});

const personalSpecCollection: CollectionConfig<
	typeof specSchema,
	typeof personalSpecLoader
> = defineCollection({
	loader: personalSpecLoader,
	schema: specSchema,
});

const templateSpecLoader = glob({
	base: "./src/content/template/spec",
	pattern: "**/*.{md,mdx}",
});

const templateSpecCollection: CollectionConfig<
	typeof specSchema,
	typeof templateSpecLoader
> = defineCollection({
	loader: templateSpecLoader,
	schema: specSchema,
});

export const collections: {
	personalPosts: typeof personalPostsCollection;
	templatePosts: typeof templatePostsCollection;
	personalSpec: typeof personalSpecCollection;
	templateSpec: typeof templateSpecCollection;
} = {
	personalPosts: personalPostsCollection,
	templatePosts: templatePostsCollection,
	personalSpec: personalSpecCollection,
	templateSpec: templateSpecCollection,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "contentful";

export interface ContentfulProject {
  id: string;
  title: string;
  creator: string;
  description: string;
  image: string;
  link: string;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: "preview.contentful.com",
});

export async function getProjects(preview = false): Promise<ContentfulProject[]> {
  try {
    const activeClient = preview ? previewClient : client;
    const res = await activeClient.getEntries({
      content_type: "bvAsite",
    });

    return res.items.map((item) => {
      const f: any = item.fields;
      const imageUrl: string | undefined = f.demo?.fields?.file?.url;
      const by: string[] = Array.isArray(f.by) ? f.by : [];
      return {
        id: item.sys.id,
        title: String(f.title ?? "Untitled"),
        creator: by.join(", ") || "Anonymous",
        description: String(f.description ?? ""),
        image: imageUrl ? `https:${imageUrl}` : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        link: String(f.url ?? "#"),
      };
    });
  } catch (error) {
    console.error("Contentful fetch failed:", error);
    return [];
  }
}

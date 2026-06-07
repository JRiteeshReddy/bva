import { createClient, type Entry } from "contentful";

export interface ContentfulProject {
  id: string;
  title: string;
  creator: string;
  description: string;
  image: string;
  link: string;
}

interface ProjectFields {
  Title?: string;
  By?: string;
  description?: string;
  demo?: { fields?: { file?: { url?: string } } };
  url?: string;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getProjects(): Promise<ContentfulProject[]> {
  try {
    const res = await client.getEntries({
      content_type: "project",
    });

    return res.items.map((item: Entry<ProjectFields>) => {
      const f = item.fields;
      return {
        id: item.sys.id,
        title: f.Title ?? "Untitled",
        creator: f.By ?? "Anonymous",
        description: f.description ?? "",
        image: f.demo?.fields?.file?.url
          ? `https:${f.demo.fields.file.url}`
          : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        link: f.url ?? "#",
      };
    });
  } catch (error) {
    console.error("Contentful fetch failed:", error);
    return [];
  }
}

import { createClient, type EntryFieldTypes, type EntrySkeletonType } from "contentful";

export interface ContentfulProject {
  id: string;
  title: string;
  creator: string;
  description: string;
  image: string;
  link: string;
}

type ProjectSkeleton = EntrySkeletonType<{
  Title: EntryFieldTypes.Symbol;
  By: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  demo: EntryFieldTypes.AssetLink;
  url: EntryFieldTypes.Symbol;
}, "project">;

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
    const res = await activeClient.getEntries<ProjectSkeleton>({
      content_type: "project",
    });

    return res.items.map((item) => {
      const f = item.fields;
      const demoAsset = f.demo && "fields" in f.demo ? f.demo : null;
      const imageUrl = demoAsset?.fields?.file?.url;
      return {
        id: item.sys.id,
        title: f.Title ?? "Untitled",
        creator: f.By ?? "Anonymous",
        description: f.description ?? "",
        image: imageUrl
          ? `https:${imageUrl}`
          : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        link: f.url ?? "#",
      };
    });
  } catch (error) {
    console.error("Contentful fetch failed:", error);
    return [];
  }
}

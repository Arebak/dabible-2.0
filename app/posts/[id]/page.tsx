import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PostFile = {
  type?: string;
  url?: string;
  cdn_url?: string;
  stream_url?: string;
};

type SharedPost = {
  id: number;
  type?: string;
  title?: string | null;
  body?: string | null;
  created_at?: string | null;
  author?: {
    name?: string | null;
  } | null;
  files?: PostFile[] | null;
};

function apiBaseForHost(host: string) {
  const configuredBase = process.env.DABIBLE_API_BASE_URL?.trim();
  if (configuredBase) return configuredBase.replace(/\/$/, "");

  return host.startsWith("staging.")
    ? "https://staging-api.dabible.com"
    : "https://api.dabible.com";
}

async function getPost(id: string): Promise<SharedPost | null> {
  const host = (await headers()).get("host") ?? "";
  const response = await fetch(
    `${apiBaseForHost(host)}/api/v3/post/${encodeURIComponent(id)}`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) return null;

  const payload = (await response.json()) as { data?: SharedPost } | SharedPost;
  return "data" in payload && payload.data ? payload.data : payload;
}

function mediaUrl(file?: PostFile) {
  return file?.stream_url ?? file?.cdn_url ?? file?.url;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  const title = post?.title?.trim() || "A message shared with you";
  const description = post?.body?.replace(/\s+/g, " ").trim();
  const summary = description
    ? description.slice(0, 160)
    : "Open DaBible to discover Bible-centered content.";

  return {
    title: `${title} | DaBible`,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
    },
  };
}

export default async function SharedPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const image = post.files?.find((file) => file.type === "image");
  const video = post.files?.find((file) => file.type === "video");
  const imageUrl = mediaUrl(image);
  const videoUrl = mediaUrl(video);
  const hasTitle = Boolean(post.title?.trim());
  const publishedAt = post.created_at
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
      }).format(new Date(post.created_at))
    : null;

  return (
    <section className="min-h-[70vh] bg-[#fff8fa] px-4 py-12 sm:py-16">
      <article className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_18px_60px_rgba(125,2,34,0.12)]">
        <div className="bg-gradient-to-br from-[#7d0222] via-[#a0072f] to-[#d64e72] px-6 py-7 text-white sm:px-9">
          <p className="font-mada text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
            Shared from DaBible
          </p>
          <h1 className="mt-3 font-mada text-3xl font-bold leading-tight sm:text-4xl">
            {hasTitle ? post.title : "A message shared with you"}
          </h1>
          <p className="mt-4 font-mada text-sm text-white/80">
            {post.author?.name ?? "DaBible community"}
            {publishedAt ? ` · ${publishedAt}` : ""}
          </p>
        </div>

        {videoUrl ? (
          <video
            className="aspect-video w-full bg-black object-contain"
            controls
            playsInline
            preload="metadata"
            src={videoUrl}
          />
        ) : imageUrl ? (
          // A regular image tag supports media domains managed by creators.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="max-h-[34rem] w-full bg-[#f8eef1] object-contain"
            src={imageUrl}
            alt={post.title?.trim() || "DaBible community post"}
          />
        ) : null}

        <div className="px-6 py-7 sm:px-9 sm:py-9">
          {post.body?.trim() ? (
            <p className="whitespace-pre-wrap font-mada text-[17px] leading-8 text-[#24303a]">
              {post.body.trim()}
            </p>
          ) : (
            <p className="font-mada text-[17px] leading-8 text-[#65707a]">
              Open DaBible to join the conversation and discover more
              Bible-centered content.
            </p>
          )}

          <a
            className="mt-8 inline-flex rounded-full bg-[#7d0222] px-5 py-3 font-mada text-sm font-semibold text-white transition hover:bg-[#a0072f]"
            href="https://apps.apple.com/us/app/yoruba-audio-bible/id1079050631"
          >
            Get DaBible
          </a>
        </div>
      </article>
    </section>
  );
}

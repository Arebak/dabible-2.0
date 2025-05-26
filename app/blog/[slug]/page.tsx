/* eslint-disable @typescript-eslint/no-explicit-any */


import { type Metadata, type ResolvingMetadata } from 'next';
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await fetch(`https://api.dabible.com/api/v3/blog-post/${params.slug}/slug`, {
    headers: {
      Accept: 'application/json',
    },
  });

  console.log("Here is the response's parent", parent);

  const blog = res.ok ? (await res.json()).data : null;

  if (!blog) {
    return {
      title: 'Post not found - DaBible Foundation',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const plainTextContent = blog.content.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: `${blog.title} | DaBible Foundation`,
    description: plainTextContent,
    openGraph: {
      title: blog.title,
      description: plainTextContent,
      images: [`https://api.dabible.com/storage/${blog.featured_image}`],
      url: `https://www.dabible.com/blog/${blog.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: plainTextContent,
      images: [`https://api.dabible.com/storage/${blog.featured_image}`],
    },
    alternates: {
      canonical: `https://www.dabible.com/blog/${params.slug}`
    },
    authors: [{ name: blog.author?.name }],
  };
}
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import { CommentsSection } from '@/components/Comments';


async function getBlog(slug: string) {
  console.log("Here is Slug", slug);
  const res = await fetch(`https://api.dabible.com/api/v3/blog-post/${slug}/slug`, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store', // optional: disable caching for freshness
  });
  if (!res.ok) return null;
  const result = await res.json();
  console.log(result);
  return result?.data || null;
}
interface BlogDetailProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetail(props: BlogDetailProps) {
  const { params } = props;
  const blog = await getBlog(params.slug);
  if (!blog) return notFound();

  const relatedPosts = blog.tags?.length
    ? await fetch(`https://api.dabible.com/api/v3/blog-post/tag/${blog.tags[0].id}?per_page=3`).then(res => res.json()).then(json => json.data)
    : blog.categories?.length
      ? await fetch(`https://api.dabible.com/api/v3/blog-post/category/${blog.categories[0].id}?per_page=3`).then(res => res.json()).then(json => json.data)
      : [];

  const allRes = await fetch('https://api.dabible.com/api/v3/blog-post?per_page=100');
  const allBlogs = allRes.ok ? (await allRes.json()).data : [];

  const currentIndex = allBlogs.findIndex((b: any) => b.slug === blog.slug);
  const prevBlog = allBlogs[currentIndex - 1];
  const nextBlog = allBlogs[currentIndex + 1];

  const shareUrl = `https://www.dabible.com/blog/${blog.slug}`;
  const shareText = encodeURIComponent(blog.title);

  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden md:pt-[70px] min-h-[518px]">
        {/* Faded oval background */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full z-1"
          style={{
            background:
              "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
          }}
          
        >
        </div>
        <div className="max-w-5xl mx-auto text-center relative !z-2 px-4">
          <h1 className="mt-8 md:mt-0 text-3xl md:text-4xl font-bold text-center text-[#1a4b8c] mb-6">
            {blog.title}
          </h1>

          <p className="text-center font-semibold mb-4 text-xl text-[#121212]">
            Published: {new Date(blog.updated_at || blog.published_at).toLocaleString()}
          </p>



          <p className="pb-8 pt-4 md:text-2xl font-medium text-[#121212]"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/<[^>]+>/g, '').slice(0, 180) + '...'
          }}
          />


          {/* Social Media Sharing */}
          <div className="flex justify-center gap-3 z-2">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a4b8c] text-white p-2 rounded-full cursor-pointer"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a4b8c] text-white p-2 rounded-full"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a4b8c] text-white p-2 rounded-full"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a4b8c] text-white p-2 rounded-full"
            >
              <MessageSquare size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="m-container px-4 py-12">
        {/* Featured Image */}
        <div className="mb-8 -mt-20 md:-mt-24 relative z-1 rounded-3xl shadow-sm overflow-hidden">
          <Image
            src={`https://api.dabible.com/storage/${blog.featured_image}`}
            alt="Version 7.0 App Interface"
            width={800}
            height={450}
            className="w-full rounded-lg"
          />
        </div>

        {/* Article Content */}
          <article
            className="prose prose-blue max-w-none dabible-blog-content"
            dangerouslySetInnerHTML={{
              __html: (() => {
                // Replace all https://dabible.com (not api., not www.youtube.) with donate.dabible.com in hrefs and srcs
                const updatedContent = blog.content
                  .replace(/https:\/\/(?!(api\.))dabible\.com/gi, 'https://donate.dabible.com')
                  // Replace <img src="...">, <video src="...">, <iframe src="..."> for dabible.com (not api., not www.youtube.)
                  .replace(/(<(?:img|video|iframe)[^>]*\s+src=")https:\/\/(?!api\.)(?!www\.youtube\.)(dabible\.com[^"]+)"/gi, '$1https://donate.dabible.com$3"');
                return updatedContent;
              })()
            }}
          />

          <div className="mt-8 text-sm text-gray-600">
            Author: <strong>{blog.author?.name}</strong>
          </div>

          {(prevBlog || nextBlog) && (
            <div className="border-t border-gray-200 mt-12 pt-6 flex justify-between">
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} className="text-blue-700 font-medium hover:underline">
                  ← {prevBlog.title}
                </Link>
              ) : <span />}
              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} className="text-blue-700 font-medium hover:underline text-right">
                  {nextBlog.title} →
                </Link>
              ) : <span />}
            </div>
          )}
      </div>

      <section className="d-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a4b8c] mb-12 font-domine">
          See More Posts
        </h2>

        <div className="grid md:grid-cols-3 gap-8 justify-center">
          {relatedPosts.map((post: { featured_image: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; updated_at: string | number | Date; content: string; slug: any; }, index: Key | null | undefined) => (
            <div
              key={index}
              className="bg-[#F6F6F6] border rounded-2xl !overflow-hidden shadow-sm"
            >
              <div className='max-h-[220px] overflow-hidden relative'>
              <Image
                src={`https://api.dabible.com/storage/${post.featured_image}`}
                alt={String(post.title ?? '')}
                width={338}
                height={220}
                className="w-full"
              />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.updated_at).toLocaleDateString()}
                </div>
                <h3 className="text-md text-[#051D3B] font-bold mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-base mb-5" dangerouslySetInnerHTML={{ __html: post.content.replace(/<[^>]+>/g, '').slice(0, 90) + '...' }} />
                <div className="flex justify-end items-center">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center text-sm text-[#A0072F] font-bold"
                  >
                    Read post <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Comments Section */}
      <CommentsSection slug={blog.slug} />
    </main>
  );
}

// Move CommentsSection client component to the bottom, with 'use client' and hooks import

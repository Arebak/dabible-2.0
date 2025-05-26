"use client"
export const dynamic = 'force-dynamic';

/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, } from "lucide-react";
import { useEffect, useState, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
// Utility: highlight keyword in text with <mark>
const highlightSearch = (text: string, keyword: string) => {
  if (!keyword) return text;
  // Escape regex special chars in keyword
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export default function Blog() {
  type Blog = {
    id: number;
    slug: string;
    title: string;
    content: string;
    featured_image: string;
    published_at: string;
    author: { id: number; name: string; photo_url?: string; image_url?: string };
    categories: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  type Category = { id: string | number; name: string };
  type Tag = { id: string | number; name: string };
  type Author = { id: string | number; name: string };

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [initialized, setInitialized] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // IntersectionObserver for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  // const searchParams = useSearchParams();

  async function fetchFilters() {
    try {
      const [catRes, tagRes, authRes] = await Promise.all([
        fetch('/api/blogs/categories'),
        fetch('/api/blogs/tags'),
        fetch('/api/blogs/authors'),
      ]);

      const [catData, tagData, authData] = await Promise.all([
        catRes.json(),
        tagRes.json(),
        authRes.json(),
      ]);

      if (Array.isArray(catData?.data)) setCategories(catData.data);
      if (Array.isArray(tagData?.data)) setTags(tagData.data);
      if (Array.isArray(authData?.data)) setAuthors(authData.data);
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  }


  // Format date utility function that handles ISO strings and Unix timestamps
  function formatDate(dateInput: string | number): string {
    if (!dateInput) return '';
    let date: Date;
    if (typeof dateInput === 'number') {
      date = new Date(dateInput * 1000); // Unix timestamp (seconds)
    } else {
      date = new Date(dateInput); // ISO string
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }

  useEffect(() => {
    fetchFilters();
  }, []);

  // Minimal initialization on first mount only
  useEffect(() => {
    if (!initialized) {
      setBlogs([]);
      setPage(1);
      setInitialized(true);
    }
  }, [initialized]);

  // Enhance: Listen for browser back/forward navigation and update filters
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') || '';
      const tag = params.get('tag') || '';
      const author = params.get('author') || '';
      setSelectedCategory(cat);
      setSelectedTag(tag);
      setSelectedAuthor(author);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Refactored: Sync selected filters to the URL, but only if changed
  const [prevFilters, setPrevFilters] = useState<{category: string; tag: string; author: string}>({
    category: '',
    tag: '',
    author: ''
  });
  useEffect(() => {
    if (!initialized) return;
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    if (selectedAuthor) params.set('author', selectedAuthor);
    // Only push if filters changed
    if (
      prevFilters.category !== selectedCategory ||
      prevFilters.tag !== selectedTag ||
      prevFilters.author !== selectedAuthor
    ) {
      router.push(`/blog?${params.toString()}`);
      setPrevFilters({
        category: selectedCategory,
        tag: selectedTag,
        author: selectedAuthor
      });
    }
  }, [selectedCategory, selectedTag, selectedAuthor, initialized, prevFilters.category, prevFilters.tag, prevFilters.author, router]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Reset blogs and page to 1 when filters/search change
  useEffect(() => {
    setBlogs([]);
    setHasMore(true);
    setPage(1);
  }, [selectedCategory, selectedTag, selectedAuthor, debouncedSearch]);

  // Wrap fetchBlogs in useCallback to avoid stale closure
  const fetchBlogs = React.useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(pageNumber),
        per_page: '6',
        sort: 'published_at',
        ...(selectedCategory ? { category: selectedCategory } : {}),
        ...(selectedTag ? { tag: selectedTag } : {}),
        ...(selectedAuthor ? { author: selectedAuthor } : {}),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      });

      const response = await fetch(`/api/blogs?${query.toString()}`);
      const data = await response.json();
      console.log("Blogs data:", data);
      // Sort blogs by published_at descending (newest first)
      const sorted = [...(data?.data || [])].sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
      if (response.ok && Array.isArray(data?.data)) {
        setBlogs(prev => {
          const combined = [...prev, ...sorted];
          return combined.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        });
        if (data.data.length < 6) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedTag, selectedAuthor, debouncedSearch]);

  // Keep a ref to the latest fetchBlogs function
  const fetchBlogsRef = useRef(fetchBlogs);
  useEffect(() => {
    fetchBlogsRef.current = fetchBlogs;
  }, [fetchBlogs]);

  useEffect(() => {
    if (!initialized) return;
    fetchBlogs(page);
  }, [page, fetchBlogs, initialized]);

  const loadMore = () => {
    if (hasMore && !loading) setPage(prev => prev + 1);
  };

  // Infinite scroll: IntersectionObserver to trigger loading more blogs
  useEffect(() => {
    if (loading || !hasMore || !loadMoreRef.current) return;

    const observer = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    observer.observe(loadMoreRef.current);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [loading, hasMore]);
  // Skeleton loader for blog cards
  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-100 rounded-2xl p-4 h-full flex flex-col gap-3">
      <div className="bg-gray-300 h-[220px] rounded-xl w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-100 rounded w-1/2 mt-auto"></div>
    </div>
  );

  // Sort filters alphabetically by name for better UX
  const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));
  const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));
  const sortedAuthors = [...authors].sort((a, b) => a.name.localeCompare(b.name));

  // Move the call to formatDate for blogs[0]?.published_at outside of JSX
  const featuredUpdatedAt = formatDate(blogs[0]?.published_at ?? '');
  // Create a map of blog IDs to their formatted update dates
  const formattedDates = blogs.map(blog => ({
    id: blog.id,
    updatedAt: formatDate(blog.published_at),
  }));

  return (
    <main className="mx-auto px-4">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden md:pt-[70px] min-h-[40vh]">
        {/* Faded oval background */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[1000px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
          }}
        />

        <Image
          src="/png/red-circle.png"
          alt="heart image"
          width={200}
          height={200}
          className="absolute -top-10 right-0 w-32 md:w-48 lg:w-52"
        />
        <Image
          src="/png/blue-circle.png"
          alt="heart image"
          width={200}
          height={200}
          className="absolute -top-10 left-0 w-32 md:w-48 lg:w-52"
        />
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-4 md:mb-6">
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className="mr-1 w-3 h-3 md:w-4 md:h-4"
            />{" "}
            Blog{" "}
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className="ml-1 w-3 h-3 md:w-4 md:h-4"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] mb-4 md:mb-6 font-domine">
            Recent Stories & Articles
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 font-mada px-2">
            These blog post ideas aim to showcase the multifaceted nature of
            Dabible&apos;s work, from education and emergency relief to environmental
            conservation.
          </p>
        </div>
      </section>

      {/* Filter UI */}
      {/* <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-full pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {sortedCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {sortedTags.map((tag) => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedAuthor}
          onChange={e => setSelectedAuthor(e.target.value)}
        >
          <option value="">All Authors</option>
          {sortedAuthors.map((auth) => (
            <option key={auth.id} value={auth.id}>{auth.name}</option>
          ))}
        </select>
        <Button onClick={() => {
          setSelectedCategory('');
          setSelectedTag('');
          setSelectedAuthor('');
          setSearchTerm('');
        }}>
          View All
        </Button>
      </div> */}

      <section className="mb-20 d-container flex flex-col lg:flex-row justify-center items-start gap-x-10 gap-y-8 font-mada sm:mt-0 md:-mt-18 relative z-1">
      {/* Featured Article */}
      {blogs[0] && (
        <div className="flex flex-col gap-y-6 w-full lg:w-1/2">
          <div className="relative">
            <Link href={`/blog/${blogs[0].slug || blogs[0].id}`} className="cursor-pointer">
            <Image
              src={`https://api.dabible.com/storage/${blogs[0].featured_image}` || "/png/outreachb.png"}
              alt={blogs[0].title || "Featured blog"}
              width={775}
              height={475}
              className="w-full lg:w-[775px] h-[250px] sm:h-[300px] md:h-[375px] object-cover object-top rounded-lg"
            />
            </Link>
          </div>
          <div className="flex flex-col justify-center px-2">
            <div className="text-sm text-gray-500 mb-2">{featuredUpdatedAt || "N/A"}</div>
            <Link href={`/blog/${blogs[0].slug || blogs[0].id}`} className="cursor-pointer">
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              {blogs[0].title}
            </h2>
            </Link>
            <p
              className="text-sm sm:text-base text-gray-600 mb-4"
              dangerouslySetInnerHTML={{
                __html: highlightSearch(
                  (blogs[0].content || '').slice(0, 180) +
                    ((blogs[0].content?.length || 0) > 180 ? '...' : ''),
                  debouncedSearch
                )
              }}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {blogs[0].author?.name ? `By ${blogs[0].author.name}` : ""}
              </span>
              <Link
                href={`/blog/${blogs[0].slug || blogs[0].id}`}
                className="flex items-center text-base sm:text-lg text-[#A0072F] font-bold"
              >
                Read post <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

        {/* Article List */}
        <div className="space-y-6 w-full lg:w-1/2">
          {blogs.slice(1, 4).map((blog, index) => {
            const updatedAt = formattedDates.find(d => d.id === blog.id)?.updatedAt ?? 'N/A';
            return (
              <Link
                key={blog.id || index}
                href={`/blog/${blog.slug || blog.id}`}
                className={`group block border-b pb-6 ${index === 2 ? 'border-b-0' : ''} hover:bg-gray-50 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A0072F]`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-full sm:w-1/4">
                    <Image
                      src={`https://api.dabible.com/storage/${blog.featured_image}` || "/png/version-sample.png"}
                      alt={blog.title || "Blog Post"}
                      width={338}
                      height={220}
                      className="w-full rounded-lg object-cover object-top max-h-[220px]"
                    />
                  </div>
                  <div className="w-full sm:w-3/4 mt-4 sm:mt-0">
                    <div className="text-sm text-gray-500 mb-1">{updatedAt}</div>
                    <h3
                      className="text-base sm:text-lg font-bold mb-2 group-hover:text-[#A0072F] transition-colors"
                      dangerouslySetInnerHTML={{ __html: highlightSearch(blog.title || '', debouncedSearch) }}
                    />
                    <p
                      className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: highlightSearch(
                          (blog.content || '').slice(0, 180) +
                            ((blog.content?.length || 0) > 180 ? '...' : ''),
                          debouncedSearch
                        )
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.categories?.map(cat => (
                        <span key={cat.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {cat.name}
                        </span>
                      ))}
                      {blog.tags?.map(tag => (
                        <span key={tag.id} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {blog.author?.name ? `By ${blog.author.name}` : ""}
                      </span>
                      <span className="flex items-center text-xs sm:text-sm text-[#A0072F] font-bold">
                        Read post <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Active Filter Summary */}
      {(selectedCategory || selectedTag || selectedAuthor) && (
        <div className="text-sm text-gray-600 mb-4 text-center">
          Showing posts
          {selectedCategory && ` in category: ${categories.find(c => c.id == selectedCategory)?.name}`}
          {selectedTag && ` with tag: ${tags.find(t => t.id == selectedTag)?.name}`}
          {selectedAuthor && ` by author: ${authors.find(a => a.id == selectedAuthor)?.name}`}
        </div>
      )}

      {/* Recent Posts Section */}
      <section className="d-container px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-[#1a4b8c] mb-8 sm:mb-12 font-domine">
          Recent Posts
        </h2>

        {/* No Results Fallback */}
        {!blogs.slice(4).length && !loading && (
          <div className="text-center text-gray-500 py-12">
            No blog posts found. Try adjusting your filters.
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blogs.slice(4).map((blog, index) => {
            const updatedAt = formattedDates.find(d => d.id === blog.id)?.updatedAt ?? 'N/A';
            return (
              <Link
                key={blog.id || index}
                href={`/blog/${blog.slug || blog.id}`}
                className="relative group bg-[#F6F6F6] border round rounded-2xl !overflow-hidden shadow-sm p-4 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:bg-[#f0f0f0] cursor-pointer tap-highlight-transparent overflow-hidden"
              >
                <span className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
                <Image
                  src={`https://api.dabible.com/storage/${blog.featured_image}` || "/png/version-sample.png"}
                  alt={blog.title || "Blog Post"}
                  width={338}
                  height={220}
                  className="w-full rounded-2xl overflow-hidden max-h-[336px] object-cover object-top"
                />
                <div className="pt-4 flex flex-col flex-1">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">{updatedAt || "N/A"}</div>
                  <h3
                    className="text-base sm:text-lg text-[#051D3B] font-bold mb-2 sm:mb-3"
                    dangerouslySetInnerHTML={{ __html: highlightSearch(blog.title || '', debouncedSearch) }}
                  />
                  <p
                    className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearch(
                        (blog.content || '').slice(0, 90) +
                          ((blog.content?.length || 0) > 90 ? '...' : ''),
                        debouncedSearch
                      )
                    }}
                  />
                  {/* Categories and Tags badges */}
                  <div className="flex flex-wrap gap-2">
                    {blog.categories?.map(cat => (
                      <span key={cat.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {cat.name}
                      </span>
                    ))}
                    {blog.tags?.map(tag => (
                      <span key={tag.id} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-500">
                      {blog.author?.name ? `By ${blog.author.name}` : ""}
                    </span>
                    <span className="flex items-center text-xs sm:text-sm text-[#A0072F] font-bold">
                      Read post <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* Skeletons for loading state */}
          {loading && (
            Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={`skeleton-${idx}`} />
            ))
          )}
        </div>

        {/* Sentinel div for infinite scroll */}
        {hasMore && (
          <div ref={loadMoreRef} className="h-10" />
        )}
      </section>
    </main>
  );
}

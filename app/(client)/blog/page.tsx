"use client";
import Container from "@/components/Container";
import Title from "@/components/Title";
import dayjs from "dayjs";
import { Calendar, Search, ArrowRight, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import blogsData from "@/data/blogs.json";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogsData.forEach((blog) => {
      blog.blogcategories?.forEach((cat) => {
        cats.add(cat.title);
      });
    });
    return Array.from(cats);
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null ||
        blog.blogcategories?.some((cat) => cat.title === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get featured blog (first blog)
  const featuredBlog = blogsData[0];
  const regularBlogs = filteredBlogs.filter((blog) => blog._id !== featuredBlog?._id);

  return (
    <div className="py-8 md:py-12 bg-shop_light_bg/30 min-h-screen">
      {/* Hero Section */}
      <div className="bg-shop_light_pink/50 py-12 md:py-16 mb-12">
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-darkColor">
              Our Blog
            </h1>
            <p className="text-lg text-lightColor max-w-2xl mx-auto">
              Discover the latest trends, tips, and insights to enhance your shopping experience
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lightColor" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-darkBlue/20 focus:outline-none focus:ring-2 focus:ring-shop_dark_green/50 focus:border-shop_dark_green"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Blog Post */}
            {featuredBlog && filteredBlogs.some((b) => b._id === featuredBlog._id) && (
              <div className="bg-white rounded-lg overflow-hidden border border-darkBlue/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={featuredBlog.mainImage}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-shop_dark_green text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-lightColor mb-4">
                    {featuredBlog.blogcategories?.map((cat, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 text-shop_dark_green font-medium"
                      >
                        <Tag size={14} />
                        {cat.title}
                      </span>
                    ))}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {dayjs(featuredBlog.publishedAt).format("MMMM D, YYYY")}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {featuredBlog.author?.name}
                    </span>
                  </div>
                  <Link href={`/blog/${featuredBlog.slug?.current}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-darkColor mb-3 hover:text-shop_dark_green transition-colors">
                      {featuredBlog.title}
                    </h2>
                  </Link>
                  <p className="text-lightColor mb-4 line-clamp-2">
                    {featuredBlog.excerpt || featuredBlog.description}
                  </p>
                  <Link
                    href={`/blog/${featuredBlog.slug?.current}`}
                    className="inline-flex items-center gap-2 text-shop_dark_green font-semibold hover:gap-3 transition-all group"
                  >
                    Read More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}

            {/* Blog Grid */}
            {regularBlogs.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <Title className="text-xl md:text-2xl">
                    {selectedCategory ? `${selectedCategory} Articles` : "Latest Articles"}
                  </Title>
                  <span className="text-sm text-lightColor">
                    {regularBlogs.length} {regularBlogs.length === 1 ? "article" : "articles"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regularBlogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="bg-white rounded-lg overflow-hidden border border-darkBlue/20 shadow-sm hover:shadow-md transition-all group"
                    >
                      <Link href={`/blog/${blog.slug?.current}`}>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={blog.mainImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-lightColor mb-3">
                          {blog.blogcategories?.map((cat, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-shop_light_green/10 text-shop_dark_green rounded-full font-medium"
                            >
                              {cat.title}
                            </span>
                          ))}
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                          </span>
                        </div>
                        <Link href={`/blog/${blog.slug?.current}`}>
                          <h3 className="text-lg font-bold text-darkColor mb-2 line-clamp-2 group-hover:text-shop_dark_green transition-colors">
                            {blog.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-lightColor line-clamp-2 mb-4">
                          {blog.excerpt || blog.description}
                        </p>
                        <Link
                          href={`/blog/${blog.slug?.current}`}
                          className="inline-flex items-center gap-1 text-sm text-shop_dark_green font-semibold hover:gap-2 transition-all group"
                        >
                          Read More
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-darkBlue/20">
                <p className="text-lg text-lightColor mb-2">No articles found</p>
                <p className="text-sm text-lightColor/70">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg border border-darkBlue/20 p-6 shadow-sm">
              <Title className="text-lg mb-4">Categories</Title>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === null
                      ? "bg-shop_dark_green text-white"
                      : "text-lightColor hover:bg-shop_light_bg hover:text-shop_dark_green"
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-shop_dark_green text-white"
                        : "text-lightColor hover:bg-shop_light_bg hover:text-shop_dark_green"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg border border-darkBlue/20 p-6 shadow-sm">
              <Title className="text-lg mb-4">Recent Posts</Title>
              <div className="space-y-4">
                {blogsData.slice(0, 4).map((blog) => (
                  <Link
                    key={blog._id}
                    href={`/blog/${blog.slug?.current}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={blog.mainImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-darkColor line-clamp-2 group-hover:text-shop_dark_green transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-lightColor mt-1">
                        {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;

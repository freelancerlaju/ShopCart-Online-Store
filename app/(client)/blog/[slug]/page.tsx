import Container from "@/components/Container";
import Title from "@/components/Title";
import { getImageUrl } from "@/lib/image";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  // Blog query removed - add your own data source here
  const blog: any = null;
  if (!blog) return notFound();

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="md:col-span-3">
          {blog?.mainImage && (
            <Image
              src={getImageUrl(blog?.mainImage)}
              alt={blog.title || "Blog Image"}
              width={800}
              height={800}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
          <div>
            <div className="text-xs flex items-center gap-5 my-7">
              <div className="flex items-center relative group cursor-pointer">
                {blog?.blogcategories?.map(
                  (item: { title: string }, index: number) => (
                    <p
                      key={index}
                      className="font-semibold text-shop_dark_green tracking-wider"
                    >
                      {item?.title}
                    </p>
                  )
                )}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
              </div>
              <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Pencil size={15} /> {blog?.author?.name}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>
              <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Calendar size={15} />{" "}
                {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>
            </div>
            <h2 className="text-2xl font-bold my-5">{blog?.title}</h2>
            <div className="flex flex-col">
              <div className="text-lightColor">
                <div>
                  {blog.body && (
                    <div className="my-5 text-base/8 first:mt-0 last:mb-0">
                      {/* PortableText removed - render blog.body as needed */}
                      {typeof blog.body === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                      ) : (
                        <p>{JSON.stringify(blog.body)}</p>
                      )}
                    </div>
                  )}
                  <div className="mt-10">
                    <Link href="/blog" className="flex items-center gap-1">
                      <ChevronLeftIcon className="size-5" />
                      <span className="text-sm font-semibold">
                        Back to blog
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BlogLeft slug={slug} />
      </Container>
    </div>
  );
};

const BlogLeft = ({ slug }: { slug: string }) => {
  // Blog queries removed - add your own data source here
  const categories: any[] = [];
  const blogs: any[] = [];

  return (
    <div>
      <div className="border border-lightColor p-5 rounded-md">
        <Title className="text-base">Blog Categories</Title>
        <div className="space-y-2 mt-2">
          {categories?.map(({ blogcategories }, index) => (
            <div
              key={index}
              className="text-lightColor flex items-center justify-between text-sm font-medium"
            >
              <p>{blogcategories[0]?.title}</p>
              <p className="text-darkColor font-semibold">{`(1)`}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-lightColor p-5 rounded-md mt-10">
        <Title className="text-base">Latest Blogs</Title>
        <div className="space-y-4 mt-4">
          {blogs?.map((blog: any, index: number) => (
            <Link
              href={`/blog/${blog?.slug?.current}`}
              key={index}
              className="flex items-center gap-2 group"
            >
              {blog?.mainImage && (
                <Image
                  src={getImageUrl(blog?.mainImage)}
                  alt="blogImage"
                  width={100}
                  height={100}
                  className="w-16 h-16 rounded-full object-cover border-[1px] border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect"
                />
              )}
              <p className="line-clamp-2 text-sm text-lightColor group-hover:text-shop_dark_green hoverEffect">
                {blog?.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;

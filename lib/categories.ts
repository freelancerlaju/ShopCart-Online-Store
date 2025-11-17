import categoriesData from "@/data/categories.json";

export interface Category {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  image?: any;
  productCount?: number;
}

export function getCategories(limit?: number): Category[] {
  const categories = categoriesData as Category[];
  if (limit) {
    return categories.slice(0, limit);
  }
  return categories;
}

export function getCategoryBySlug(slug: string): Category | null {
  const category = categoriesData.find(
    (c) => c.slug?.current === slug
  ) as Category | undefined;
  return category || null;
}


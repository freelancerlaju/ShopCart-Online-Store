import { Product } from "@/types/product";
import productsData from "@/data/products.json";

// Get all products
export function getAllProducts(): Product[] {
  return productsData as Product[];
}

// Get products by variant (electronics, fashion, etc.)
export function getProductsByVariant(variant: string): Product[] {
  return productsData.filter(
    (product) => product.variant?.toLowerCase() === variant.toLowerCase()
  ) as Product[];
}

// Get product by slug
export function getProductBySlug(slug: string): Product | null {
  const product = productsData.find(
    (p) => p.slug?.current === slug
  ) as Product | undefined;
  return product || null;
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  // Map category slugs to category names
  const categoryMap: Record<string, string> = {
    'electronics': 'Electronics',
    'fashion': 'Fashion',
    'sports': 'Sports',
    'home-living': 'Home & Living',
    'home & living': 'Home & Living',
    'books': 'Books',
    'toys-games': 'Toys & Games',
    'toys & games': 'Toys & Games'
  };
  
  // Get the category name from slug or use the provided value
  const categoryName = categoryMap[category.toLowerCase()] || category;
  
  return productsData.filter(
    (product) => product.category?.toLowerCase() === categoryName.toLowerCase()
  ) as Product[];
}

// Get products by brand
export function getProductsByBrand(brand: string): Product[] {
  return productsData.filter(
    (product) => product.brand?.toLowerCase() === brand.toLowerCase()
  ) as Product[];
}

// Get products by brand slug
export function getProductsByBrandSlug(brandSlug: string): Product[] {
  // Map brand slugs to brand names
  const brandMap: Record<string, string> = {
    'techbrand': 'TechBrand',
    'styleco': 'StyleCo',
    'sportwear': 'SportWear'
  };
  const brandName = brandMap[brandSlug.toLowerCase()];
  if (!brandName) return [];
  
  return productsData.filter(
    (product) => product.brand?.toLowerCase() === brandName.toLowerCase()
  ) as Product[];
}

// Get sale products (status === "sale")
export function getSaleProducts(): Product[] {
  return productsData.filter((product) => product.status === "sale") as Product[];
}

// Get hot deal products (products that show the flame icon - status !== "sale")
export function getDealProducts(): Product[] {
  return productsData.filter((product) => product.status !== "sale") as Product[];
}

// Get products with price range filter
export function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number,
  filters?: {
    category?: string;
    brand?: string;
  }
): Product[] {
  let filtered = productsData.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  ) as Product[];

  if (filters?.category) {
    filtered = filtered.filter(
      (product) =>
        product.category?.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters?.brand) {
    filtered = filtered.filter(
      (product) => product.brand?.toLowerCase() === filters.brand?.toLowerCase()
    );
  }

  return filtered;
}


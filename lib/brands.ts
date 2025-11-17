import brandsData from "@/data/brands.json";

export interface Brand {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  image?: any;
}

export function getAllBrands(): Brand[] {
  return brandsData as Brand[];
}

export function getBrandBySlug(slug: string): Brand | null {
  const brand = brandsData.find(
    (b) => b.slug?.current === slug
  ) as Brand | undefined;
  return brand || null;
}


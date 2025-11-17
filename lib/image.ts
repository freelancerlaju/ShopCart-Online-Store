// Helper function to get image URL (replaces Sanity's urlFor)
export function getImageUrl(image: any): string {
  if (!image) return '/placeholder.png';
  if (typeof image === 'string') return image;
  if (image.url) return image.url;
  if (image.asset?.url) return image.asset.url;
  if (image.asset?._ref) {
    // Handle Sanity image reference format if needed
    return `/api/image/${image.asset._ref}`;
  }
  return '/placeholder.png';
}


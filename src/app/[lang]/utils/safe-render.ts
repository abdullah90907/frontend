/**
 * Null-safe rendering helpers to prevent crashes when CMS content is missing.
 */

/** Safely access nested Strapi media URL */
export function safeMediaUrl(media: any): string | null {
  return media?.data?.attributes?.url ?? null;
}

/** Safely access nested Strapi text field */
export function safeText(value: any, fallback: string = ""): string {
  if (typeof value === "string") return value;
  return fallback;
}

/** Safely access Strapi relation array */
export function safeArray<T = any>(value: any): T[] {
  if (Array.isArray(value)) return value;
  if (value?.data && Array.isArray(value.data)) return value.data;
  return [];
}

/** Safely access Strapi attributes from a data object */
export function safeAttributes(item: any): Record<string, any> {
  return item?.attributes ?? item ?? {};
}

/** Check if a Strapi media field has data */
export function hasMedia(media: any): boolean {
  return !!(media?.data?.attributes?.url);
}

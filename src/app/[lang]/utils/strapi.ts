import { fetchAPI } from "./fetch-api";

const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const authHeader = { headers: { Authorization: `Bearer ${token}` } };

/**
 * Fetch all service categories with their child services.
 */
export async function getServiceCategories() {
  try {
    const data = await fetchAPI(
      "/service-categories",
      {
        populate: ["services", "icon"],
        sort: ["displayOrder:asc"],
      },
      authHeader
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Fetch a single service category by slug, with its services.
 */
export async function getServiceCategoryBySlug(slug: string) {
  try {
    const data = await fetchAPI(
      "/service-categories",
      {
        filters: { slug },
        populate: ["services", "icon", "seo.shareImage"],
      },
      authHeader
    );
    return data?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch services for a specific category slug.
 */
export async function getServicesByCategorySlug(categorySlug: string) {
  try {
    const data = await fetchAPI(
      "/services",
      {
        filters: { serviceCategory: { slug: categorySlug } },
        populate: ["icon", "coverImage", "serviceCategory"],
        sort: ["displayOrder:asc"],
      },
      authHeader
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Fetch a single service by slug.
 */
export async function getServiceBySlug(slug: string) {
  try {
    const data = await fetchAPI(
      "/services",
      {
        filters: { slug },
        populate: ["icon", "coverImage", "serviceCategory", "seo.shareImage"],
      },
      authHeader
    );
    return data?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch all team members.
 */
export async function getTeamMembers() {
  try {
    const data = await fetchAPI(
      "/team-members",
      {
        populate: ["photo"],
        sort: ["displayOrder:asc"],
      },
      authHeader
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Fetch all contact departments.
 */
export async function getContactDepartments() {
  try {
    const data = await fetchAPI(
      "/contact-departments",
      {
        populate: ["icon"],
        sort: ["displayOrder:asc"],
      },
      authHeader
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
}

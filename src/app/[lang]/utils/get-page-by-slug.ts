import qs from "qs";
import {fetchAPI} from "@/app/[lang]/utils/fetch-api";

export async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;

    // Build a deep populate query using qs to properly serialize nested objects
    const urlParamsObject = {
        filters: {slug},
        locale: lang,
        populate: {
            contentSections: {
                populate: '*',
            },
            seo: {
                populate: '*',
            },
        },
    };
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}
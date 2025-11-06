export default function resolvedImage(url: string): string {
  return process.env.NEXT_PUBLIC_STRAPI_URL + url;
}

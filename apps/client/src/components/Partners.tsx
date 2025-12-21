import { getPartners } from "@/api/api";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import resolvedImage from "@/lib/resolvedImage";

const Partners = async () => {
  let partners = null;

  try {
    // Check if Strapi URL is configured
    if (process.env.NEXT_PUBLIC_STRAPI_URL) {
      partners = await getPartners();
    }
  } catch (error) {
    console.warn("Failed to fetch partners:", error);
    // Component will render nothing or fallback
  }

  // Return nothing if no partners data
  if (!partners?.data || partners.data.length === 0) {
    return null;
  }

  return (
    <MaxWidthWrapper className="mt-24">
      <h2 className="text-section-title text-center mb-12">Наши Партнеры</h2>
      <div className="grid px-8 gap-4 mt-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {partners.data.map((partner) => (
          <Card key={partner.documentId}>
            <CardContent>
              {partner.image && (
                <Image
                  className="aspect-video object-cover "
                  src={resolvedImage(partner.image.url)}
                  width={partner.image.width || 350}
                  height={partner.image.height || 350}
                  alt={partner.image.alternativeText || `${partner.name} image`}
                />
              )}
              <h3 className="text-2xl font-bold">{partner.name}</h3>
              {partner.description && (
                <p className="text-muted-foreground">{partner.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Partners;

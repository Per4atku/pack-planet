import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import priceListImage from "@/assets/price-download.png";
import Link from "next/link";
import { Download } from "lucide-react";
import { getPriceListURL } from "@/api/api";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const PriceListSection = async () => {
  let priceListURL = "#";
  let isAvailable = false;

  try {
    // Check if Strapi URL is configured
    if (process.env.NEXT_PUBLIC_STRAPI_URL) {
      const priceListResponse = await getPriceListURL();

      if (priceListResponse?.data?.file?.url) {
        priceListURL = priceListResponse.data.file.url;
        isAvailable = true;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch price list URL:", error);
    // Component will render with default values
  }

  return (
    <>
      <MaxWidthWrapper
        id="price-list"
        className="pt-24 flex flex-col justify-between items-center sm:hidden"
      >
        <div className="w-full flex flex-col gap-6 ">
          {/* Heading */}
          <div className="flex flex-col ">
            <h2 className="text-section-title text-center">Прайс-Лист</h2>
          </div>

          <Image
            className="aspect-square w-[300px] md:w-[400px] lg:w-[500px] self-center"
            style={{ rotate: "10deg" }}
            src={priceListImage}
            alt="Price List Visualisation"
            width={500}
            height={500}
          />

          {/* CTA */}
          <div className="flex items-center gap-4 ">
            {isAvailable ? (
              <Link
                href={priceListURL}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
                download
              >
                <Download />
                Скачать прайс-лист
              </Link>
            ) : (
              <button
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                  "w-full"
                )}
                disabled
              >
                <Download />
                Прайс-лист временно недоступен
              </button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper
        id="price-list"
        className="pt-24 hidden justify-between items-center sm:flex"
      >
        <div className="w-full flex flex-col gap-6 ">
          {/* Heading */}
          <div className="flex flex-col ">
            <h2 className="text-section-title ">Прайс-Лист</h2>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 ">
            {isAvailable ? (
              <Link
                href={priceListURL}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full max-w-[350px]"
                )}
                download
              >
                <Download />
                Скачать прайс-лист
              </Link>
            ) : (
              <button
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                  "w-full max-w-[350px]"
                )}
                disabled
              >
                <Download />
                Прайс-лист временно недоступен
              </button>
            )}
          </div>
        </div>
        <Image
          className="aspect-square w-[300px] md:w-[400px] lg:w-[500px] self-center"
          style={{ rotate: "10deg" }}
          src={priceListImage}
          alt=""
          width={500}
          height={500}
        />
      </MaxWidthWrapper>
    </>
  );
};

export default PriceListSection;

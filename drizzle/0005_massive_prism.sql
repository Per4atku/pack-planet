ALTER TABLE "products" ADD COLUMN "category_name" text;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_name_unique" UNIQUE("category_name");
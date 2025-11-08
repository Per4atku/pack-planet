"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { Fragment } from "react/jsx-runtime";
import { Category } from "@/api";

export function CategorySelector({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const currentCategoryId = pathname.split("/").pop(); // gets the last part of the path

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
          {categories.find((c) => c.documentId === currentCategoryId)?.Name ||
            "Выбрать категорию"}
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Выбор категории</SheetTitle>
          <SheetDescription>
            Выберите категорию для отображения списка товаров
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 flex flex-col gap-2">
          <Link
            href={`/catalog`}
            className={`text-base rounded-md px-3 py-2 transition-colors ${
              currentCategoryId === "catalog"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Все Товары
          </Link>

          <Separator />

          <h2
            itemProp="name"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            className="text-2xl overflow-hidden text-ellipsis"
          ></h2>

          {categories.map((category) => {
            const isActive = category.documentId === currentCategoryId;
            return (
              <Link
                key={category.documentId}
                href={`/catalog/category/${category.documentId}`}
                className={`text-base rounded-md px-3 py-2 line-clamp-2 border overflow-hidden text-ellipsis transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {category.Name}
              </Link>
            );
          })}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Закрыть</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

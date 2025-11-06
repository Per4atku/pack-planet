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
          {categories.map((category) => {
            const isActive = category.documentId === currentCategoryId;
            return (
              <Link
                href={`/catalog/category/${category.documentId}`}
                key={category.documentId}
                className={`text-lg rounded-md px-3 py-2 transition-colors ${
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

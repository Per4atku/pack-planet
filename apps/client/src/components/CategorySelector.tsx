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

import { Category } from "@/api";
import { ScrollArea } from "./ui/scroll-area";

export function CategorySelector({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const currentCategoryId = pathname.split("/").pop();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap">
          <Menu />
          {categories.find((c) => c.documentId === currentCategoryId)?.Name ||
            "Все Товары"}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col h-full max-w-full overflow-x-hidden"
      >
        <SheetHeader>
          <SheetTitle>Выбор категории</SheetTitle>
          <SheetDescription>
            Выберите категорию для отображения списка товаров
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 flex flex-col gap-2 flex-1 overflow-hidden">
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

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-2">
              {categories.map((category) => {
                const isActive = category.documentId === currentCategoryId;
                return (
                  <Link
                    key={category.documentId}
                    href={`/catalog/category/${category.documentId}`}
                    className={`text-base rounded-md px-3 py-2 line-clamp-1 overflow-hidden text-ellipsis transition-colors ${
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
          </ScrollArea>
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

import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  numeric
} from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  parentId: integer('parent_id'),
  hasProducts: boolean('has_products'),
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  slug: text('slug').notNull().unique(),
  level: integer('level').notNull().default(0)
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price'),
  unit: text('unit'),
  sku: text('sku'),
  quantity: numeric('quantity'),
  categoryId: integer('category_id').references(() => categories.id),
  categoryName: text('category_name').unique(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true })
});

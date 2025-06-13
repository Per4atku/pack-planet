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
  categoryId: integer('category_id'),
  isRoot: boolean('is_root'),
  hasProducts: boolean('has_products'),
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true })
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
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true })
});

import type { Category, Product } from '@/app/(frontend)/products/page';

// Mock categories with nested structure
export const categories: Category[] = [
  {
    id: 'straws',
    name: 'STRAWS',
    isRoot: true,
    children: [
      {
        id: 'straight-straws',
        name: 'Straight Straws',
        isRoot: false,
        parentId: 'straws',
        children: []
      },
      {
        id: 'flexible-straws',
        name: 'Flexible Straws',
        isRoot: false,
        parentId: 'straws',
        children: []
      },
      {
        id: 'bubble-tea-straws',
        name: 'Bubble Tea Straws',
        isRoot: false,
        parentId: 'straws',
        children: []
      }
    ]
  },
  {
    id: 'cups',
    name: 'CUPS & CONTAINERS',
    isRoot: true,
    children: [
      {
        id: 'paper-cups',
        name: 'Paper Cups',
        isRoot: false,
        parentId: 'cups',
        children: [
          {
            id: 'hot-cups',
            name: 'Hot Cups',
            isRoot: false,
            parentId: 'paper-cups',
            children: []
          },
          {
            id: 'cold-cups',
            name: 'Cold Cups',
            isRoot: false,
            parentId: 'paper-cups',
            children: []
          }
        ]
      },
      {
        id: 'plastic-containers',
        name: 'Plastic Containers',
        isRoot: false,
        parentId: 'cups',
        children: []
      }
    ]
  },
  {
    id: 'utensils',
    name: 'UTENSILS',
    isRoot: true,
    children: [
      {
        id: 'disposable-utensils',
        name: 'Disposable Utensils',
        isRoot: false,
        parentId: 'utensils',
        children: []
      },
      {
        id: 'reusable-utensils',
        name: 'Reusable Utensils',
        isRoot: false,
        parentId: 'utensils',
        children: []
      }
    ]
  }
];

// Mock products
export const products: Product[] = [
  // Straight Straws
  {
    id: 'p1',
    name: 'Red Paper Straws 8mm',
    description:
      'Eco-friendly red paper straws, perfect for cocktails and beverages',
    price: 24.5,
    unit: 'pack',
    sku: 'RPS-8MM-RED',
    quantity: 150,
    categoryId: 'straight-straws'
  },
  {
    id: 'p2',
    name: 'White Paper Straws 6mm',
    description: 'Classic white paper straws for everyday use',
    price: 22.0,
    unit: 'pack',
    sku: 'WPS-6MM-WHT',
    quantity: 200,
    categoryId: 'straight-straws'
  },
  {
    id: 'p3',
    name: 'Striped Paper Straws Mixed',
    description: 'Colorful striped paper straws in assorted colors',
    price: 28.75,
    unit: 'pack',
    sku: 'SPS-MIX-STR',
    quantity: 5,
    categoryId: 'straight-straws'
  },

  // Flexible Straws
  {
    id: 'p4',
    name: 'Plastic Bendy Straws Clear',
    description: 'Clear flexible plastic straws with bend for easy drinking',
    price: 18.9,
    unit: 'pack',
    sku: 'PBS-CLR-BEND',
    quantity: 300,
    categoryId: 'flexible-straws'
  },
  {
    id: 'p5',
    name: 'Eco Flex Straws Bamboo',
    description: 'Biodegradable bamboo flexible straws',
    price: 45.2,
    unit: 'pack',
    sku: 'EFS-BMB-ECO',
    quantity: 80,
    categoryId: 'flexible-straws'
  },

  // Bubble Tea Straws
  {
    id: 'p6',
    name: 'Wide Bubble Tea Straws Black',
    description: 'Extra wide straws designed for bubble tea and boba drinks',
    price: 32.0,
    unit: 'pack',
    sku: 'BTS-WID-BLK',
    quantity: 120,
    categoryId: 'bubble-tea-straws'
  },
  {
    id: 'p7',
    name: 'Reusable Metal Boba Straws',
    description: 'Stainless steel reusable straws for bubble tea',
    price: 89.99,
    unit: 'set',
    sku: 'RMS-BOB-SS',
    quantity: 25,
    categoryId: 'bubble-tea-straws'
  },

  // Hot Cups
  {
    id: 'p8',
    name: '12oz Double Wall Hot Cups',
    description: 'Insulated paper cups for hot beverages, no sleeve needed',
    price: 56.4,
    unit: 'case',
    sku: 'DWC-12OZ-HOT',
    quantity: 0,
    categoryId: 'hot-cups'
  },
  {
    id: 'p9',
    name: '8oz Single Wall Coffee Cups',
    description: 'Classic single wall paper cups for coffee service',
    price: 34.2,
    unit: 'case',
    sku: 'SWC-8OZ-COF',
    quantity: 45,
    categoryId: 'hot-cups'
  },

  // Cold Cups
  {
    id: 'p10',
    name: '16oz Clear Plastic Cups',
    description: 'Crystal clear cups perfect for cold drinks and smoothies',
    price: 42.8,
    unit: 'case',
    sku: 'CPC-16OZ-CLR',
    quantity: 90,
    categoryId: 'cold-cups'
  },
  {
    id: 'p11',
    name: '20oz Paper Cold Cups',
    description: 'Large paper cups with poly lining for cold beverages',
    price: 48.95,
    unit: 'case',
    sku: 'PCC-20OZ-PAP',
    quantity: 65,
    categoryId: 'cold-cups'
  },

  // Plastic Containers
  {
    id: 'p12',
    name: '32oz Deli Containers with Lids',
    description:
      'Clear plastic containers perfect for takeout and food storage',
    price: 67.5,
    unit: 'case',
    sku: 'DCL-32OZ-SET',
    quantity: 110,
    categoryId: 'plastic-containers'
  },
  {
    id: 'p13',
    name: 'Microwave Safe Food Containers',
    description: 'BPA-free containers safe for microwave heating',
    price: 78.2,
    unit: 'case',
    sku: 'MSC-BPA-FREE',
    quantity: 8,
    categoryId: 'plastic-containers'
  },

  // Disposable Utensils
  {
    id: 'p14',
    name: 'Wooden Cutlery Set',
    description: 'Eco-friendly wooden forks, knives, and spoons',
    price: 52.3,
    unit: 'case',
    sku: 'WCS-ECO-SET',
    quantity: 75,
    categoryId: 'disposable-utensils'
  },
  {
    id: 'p15',
    name: 'White Plastic Spoons',
    description: 'Heavy duty plastic spoons for catering and events',
    price: 23.45,
    unit: 'pack',
    sku: 'WPS-HD-WHT',
    quantity: 180,
    categoryId: 'disposable-utensils'
  },

  // Reusable Utensils
  {
    id: 'p16',
    name: 'Stainless Steel Cutlery Set',
    description: 'Professional grade stainless steel cutlery for restaurants',
    price: 145.0,
    unit: 'set',
    sku: 'SSC-PRO-SET',
    quantity: 15,
    categoryId: 'reusable-utensils'
  },
  {
    id: 'p17',
    name: 'Bamboo Travel Utensil Kit',
    description: 'Portable bamboo utensil set with carrying case',
    price: 24.99,
    unit: 'pcs',
    sku: 'BTK-TRV-BAM',
    quantity: 95,
    categoryId: 'reusable-utensils'
  }
];

export const mockData = {
  categories,
  products
};

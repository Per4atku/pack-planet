import { read, utils } from 'xlsx';

type Product = {
  sku: string;
  name: string;
  description: string;
  quantity: number; // оставляем строкой, т.к. значение может быть "4,000"
  unit: string;
  price: number;
};

export type CategoryNode = {
  [categoryName: string]: CategoryNode | Product[] | undefined;
  _products?: Product[];
};

export default function parseExcel(buffer: Buffer): CategoryNode {
  const workbook = read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0] || 'Sheet1'];
  if (!sheet) {
    throw new Error('No worksheet found in the provided Excel file.');
  }
  const rows: Array<Array<unknown>> = utils.sheet_to_json(sheet, { header: 1 });

  const root: CategoryNode = {};
  const categoryStack: string[] = [];

  function setNestedCategory(
    target: CategoryNode,
    stack: string[]
  ): CategoryNode {
    let current: CategoryNode = target;
    for (const name of stack) {
      if (!current[name]) current[name] = {};
      current = current[name] as CategoryNode;
    }
    return current;
  }

  let lastWasProduct = false;

  let columnOffset = 0;

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;

    if (i === 2) {
      if (!row[0]) {
        columnOffset = 1; // если первый столбец пустой, сдвигаем на 1
      }
    }
    const b = row[0 + columnOffset]; // артикул
    const c = row[1 + columnOffset]; // наименование
    const d = row[2 + columnOffset]; // описание
    const e = row[3 + columnOffset]; // количество
    const f = row[4 + columnOffset]; // unit
    const g = row[5 + columnOffset]; // цена

    const hasPrice = !!g;
    const raw = (b || '').toString().trim();

    // === КАТЕГОРИЯ ===
    if (!hasPrice) {
      if (!raw) continue;

      const isRoot = raw === raw.toUpperCase();

      if (isRoot) {
        categoryStack.length = 0;
        categoryStack.push(raw);
      } else {
        if (lastWasProduct) {
          categoryStack.pop();
        }
        categoryStack.push(raw);
      }

      lastWasProduct = false;
      continue;
    }

    // === ТОВАР ===
    const product: Product = {
      sku: raw,
      name: (c || '').toString().trim(),
      description: (d || '').toString().trim(),
      quantity:
        typeof e === 'string'
          ? parseInt(e.toString().split(',')[0]!, 10) || 0
          : 0,
      unit: (f || '').toString().trim(),
      price:
        typeof g === 'number'
          ? g
          : parseFloat(g.toString().replace(',', '.')) || 0
    };

    const parent = setNestedCategory(root, categoryStack);
    if (!parent._products) parent._products = [];
    parent._products.push(product);

    lastWasProduct = true;
  }

  return root;
}

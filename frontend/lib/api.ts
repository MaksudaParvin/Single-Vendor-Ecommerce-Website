
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  image: string | null;
  status: string;
  category: number;
  category_name: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/products/`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`
    );
  }

  const data: PaginatedResponse<Product> | Product[] =
    await response.json();

  return Array.isArray(data) ? data : data.results;
}



export async function getProductBySlug(
  slug: string
): Promise<Product> {
  const response = await fetch(
    `${API_BASE_URL}/api/products/?search=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product.");
  }

  const data: PaginatedResponse<Product> | Product[] =
    await response.json();

  const products = Array.isArray(data) ? data : data.results;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    throw new Error("Product not found.");
  }

  return product;
}

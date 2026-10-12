
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../lib/api";
import styles from "./page.module.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          MONO<span>MARKET.</span>
        </Link>

        <Link href="/" className={styles.backLink}>
          ← Continue shopping
        </Link>
      </header>

      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <span>{product.category_name}</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className={styles.productLayout}>
        <div className={styles.imagePanel}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={700}
              unoptimized
              priority
            />
          ) : (
            <span className={styles.noImage}>
              Image coming soon
            </span>
          )}
        </div>

        <div className={styles.details}>
          <p className={styles.category}>
            {product.category_name}
          </p>

          <h1>{product.name}</h1>

          <p className={styles.price}>
            ৳{Number(product.price).toLocaleString("en-BD")}
          </p>

          <div className={styles.divider} />

          <p className={styles.description}>
            {product.description}
          </p>

          <p className={styles.stock}>
            <span
              className={
                product.stock > 0
                  ? styles.available
                  : styles.unavailable
              }
            />
            {product.stock > 0
              ? `${product.stock} units available`
              : "Currently out of stock"}
          </p>

          <button
            className={styles.cartButton}
            disabled={product.stock <= 0}
            type="button"
          >
            {product.stock > 0
              ? "Add to cart — coming next"
              : "Out of stock"}
          </button>

          <p className={styles.note}>
            Secure checkout and order management will be
            added in the next stages.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/">← Back to all products</Link>
        <span>MONOMARKET · 2026</span>
      </footer>
    </main>
  );
}

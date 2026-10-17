
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/api";
import { getProducts } from "../lib/api";
import styles from "./page.module.css";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          MONO<span>MARKET.</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <a href="#products">Shop</a>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            THOUGHTFULLY SELECTED
          </p>

          <h1>
            Good products.
            <br />
            Better living<span>.</span>
          </h1>

          <p className={styles.heroText}>
            Discover everyday essentials and technology
            chosen to make life a little better.
          </p>

          <a href="#products" className={styles.cta}>
            Explore collection <span>↗</span>
          </a>
        </div>

        <div className={styles.heroVisual}>
          <span className={styles.visualTag}>
            THE EVERYDAY EDIT — 001
          </span>
          <div className={styles.orbit}>
            <div className={styles.orbitInner}>
              <span>OBJECTS</span>
              <strong>OF</strong>
              <span>INTEREST.</span>
            </div>
          </div>
          <span className={styles.visualFoot}>
            QUALITY OVER QUANTITY
          </span>
        </div>
      </section>

      <section id="products" className={styles.productsSection}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>THE COLLECTION</p>
            <h2>Find your next favourite.</h2>
          </div>

          <span className={styles.count}>
            {products.length} products
          </span>
        </div>

        {products.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyMark}>○</span>
            <h3>Nothing on the shelves. Yet.</h3>
            <p>
              Add an active product through Django Admin,
              then refresh this page.
            </p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <article
                key={product.id}
                className={styles.productCard}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className={styles.productImage}
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={400}
                      unoptimized
                    />
                  ) : (
                    <span className={styles.noImage}>
                      Image coming soon
                    </span>
                  )}

                  <span className={styles.viewProduct}>
                    View product ↗
                  </span>
                </Link>

                <div className={styles.productInfo}>
                  <p className={styles.category}>
                    {product.category_name}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className={styles.productName}
                  >
                    {product.name}
                  </Link>

                  <div className={styles.productBottom}>
                    <span className={styles.price}>
                      ৳
                      {Number(product.price).toLocaleString("en-BD")}
                    </span>

                    <span
                      className={
                        product.stock > 0
                          ? styles.inStock
                          : styles.outOfStock
                      }
                    >
                      {product.stock > 0
                        ? "In stock"
                        : "Sold out"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.logo}>
          MONO<span>MARKET.</span>
        </Link>
        <p>Less noise. Better choices.</p>
        <span>© 2026 MONOMARKET</span>
      </footer>
    </main>
  );
}

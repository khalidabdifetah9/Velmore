import { notFound } from "next/navigation";
import Navbar from "@/Components/Shared/navbar";
import Footer from "@/Components/Home/Footer/footer";
import ProductHeader from "@/Components/Collection/Details/product-header";
import NoteExplorer from "@/Components/Collection/Details/note-explorer";
import ProductFeature from "@/Components/Collection/Details/product-feature";
import ProductReviews from "@/Components/Collection/Details/product-reviews";
import ProductSeeAlso from "@/Components/Collection/Details/product-see-also";
import ProductCta from "@/Components/Collection/Details/product-cta";
import { collection } from "@/lib/collection";
import { getDetails, getReviews } from "@/lib/product-details";

export function generateStaticParams() {
  return collection.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = collection.find((p) => p.slug === slug);
  if (!product) return { title: "Not found — Velmora" };

  const d = getDetails(slug);
  return {
    title: `${product.name} — Velmora`,
    description: `${d.tagline} ${d.description}`.trim(),
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const index = collection.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const product = collection[index];
  const details = getDetails(slug);
  const reviews = getReviews(slug);

  const related = [1, 2, 3].map((k) => collection[(index + k) % collection.length]);

  return (
    <>
      <Navbar visible />
      <main>
        <ProductHeader product={product} details={details} />
        <NoteExplorer details={details} />
        <ProductFeature product={product} details={details} />
        <ProductReviews details={details} reviews={reviews} />
        <ProductSeeAlso items={related} />
        <ProductCta product={product} />
      </main>
      <Footer />
    </>
  );
}
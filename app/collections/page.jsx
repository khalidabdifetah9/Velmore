import Navbar from "@/Components/Shared/navbar";
import CollectionHeader from "@/Components/Collection/collection-header";
import CollectionGrid from "@/Components/Collection/collection-grid";
import Footer from "@/Components/Home/Footer/footer";

export const metadata = {
  title: "Collection — Velmora",
  description:
    "Six signature niche perfumes and the small things that go with them, made in numbered batches in Paris.",
};

export default function CollectionPage() {
  return (
    <>
      <Navbar visible />
      <main>
        <CollectionHeader />
        <CollectionGrid />
      </main>
      <Footer />
    </>
  );
}
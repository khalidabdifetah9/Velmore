import Navbar from "@/Components/Shared/navbar";
import AboutHeader from "@/Components/Craftsmanship/about-header";
import ArtOfCreation from "@/Components/Craftsmanship/art-of-creation";
import Footer from "@/Components/Home/Footer/footer";
import Ingredients from "@/Components/Craftsmanship/ingredients";
import Faq from "@/Components/Craftsmanship/FAQ/faq";

export const metadata = {
  title: "Craftsmanship — Velmora",
  description:
    "How Velmora perfumes are made: rare materials, traditional techniques and patient blending in a small Paris atelier.",
};

export default function CraftsmanshipPage() {
  return (
    <>
      <Navbar visible />
      <main>
        <AboutHeader />
        <ArtOfCreation />
        <Ingredients />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
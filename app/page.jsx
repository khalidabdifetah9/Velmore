import ScrollHero from "@/Components/Home/scroll-hero";
import About from "@/Components/Home/About/about";
import Feature from "@/Components/Home/feature/feature";
import Products from "@/Components/Home/Products/products";
import Testimonials from "@/Components/Home/Testimonials/testimonials";
export default function Page() {
  return (
    <main>
      <ScrollHero />
      <About />
      <Feature />
      <Products />
      <Testimonials />
    </main>
  );
}

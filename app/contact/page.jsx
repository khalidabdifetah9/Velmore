import Navbar from "@/Components/Shared/navbar";
import ContactHeader from "@/Components/contact/contact-header";
import ContactForm from "@/Components/contact/contact-form";
import Footer from "@/Components/Home/Footer/footer";

export const metadata = {
  title: "Contact — Velmora",
  description:
    "Write to the Velmora atelier in Paris about a scent, a private consultation or an order.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar visible />
      <main>
        <ContactHeader />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
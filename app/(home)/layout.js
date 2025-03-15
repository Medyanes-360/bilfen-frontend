import Footer from "@/components/layout/footer";

export default function HomeLayout({ children }) {

  return (
    <>
      <main className="pt-32">{children}</main>
      <Footer />
    </>
  );
}
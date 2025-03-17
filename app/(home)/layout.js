import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function HomeLayout({ children }) {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
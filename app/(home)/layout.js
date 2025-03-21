import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import OpeningHoursBar from "@/components/layout/openingHoursBar";

export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar/>
      <main>{children}</main>
      <OpeningHoursBar />
      <Footer />
    </div>
  );
}
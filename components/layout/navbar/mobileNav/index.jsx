
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";

const MobileNav = ({ menuItems }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <div className="p-1 text-orange hover:bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="2" x="3" y="6" rx="1"></rect>
            <rect width="18" height="2" x="3" y="12" rx="1"></rect>
            <rect width="18" height="2" x="3" y="18" rx="1"></rect>
          </svg>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-screen h-screen p-0 bg-[#fff6e9] max-w-none inset-0 m-0 rounded-none border-none">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo2.webp"
                alt="Tediss Park"
                width={100}
                height={60}
              />
            </Link>
          </div>
          
          {/* Items */}
          <div className="flex-1 overflow-auto py-4 px-6">
            <ul className="space-y-4 uppercase font-poppins font-semibold text-darklila">
              {menuItems.map((menu, index) => (
                <li key={index}>
                  <Collapsible>
                    <div className="flex items-center justify-between">
                      <Link href={menu.href || `/#`} className="py-2">{menu.title}</Link>
                      {menu.items && menu.items.length > 0 && (
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>
                    {menu.items && menu.items.length > 0 && (
                      <CollapsibleContent>
                        <ul className="pl-4 pt-2 space-y-2">
                          {menu.items.map((item, idx) => (
                            <li key={idx}>
                              <Link href={item.href || "#"} className="block py-1 text-sm">{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-t">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full py-3 px-4 rounded-full bg-white focus:outline-none"
              />
              <button className="absolute right-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 p-6">
            <Link href="https://facebook.com" className="text-darklila hover:text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="https://twitter.com" className="text-darklila hover:text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="https://instagram.com" className="text-darklila hover:text-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const menuItems = [
    { label: "Bosh sahifa", href: "/" },
    {
      label: "Kurslar",
      href: "/courses",
      submenu: [
        { label: "Ingliz tili", href: "/courses/english" },
        { label: "SAT", href: "/courses/sat" },
        { label: "IELTS", href: "/courses/ielts" },
        { label: "Boshqa kurslar", href: "/courses/all" },
      ],
    },
    { label: "Digital SAT", href: "/digital-sat-practice-test" },
    { label: "Blog", href: "/blog" },
    { label: "Haqida", href: "/about" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">EduSat</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        to={subitem.href}
                        className={`block px-4 py-2 text-sm rounded-md transition-colors first:rounded-t-md last:rounded-b-md ${
                          isActive(subitem.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">
              Kirish
            </Button>
            <Button size="sm">Ro'yxatdan o'tish</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            {menuItems.map((item) => (
              <div key={item.href}>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.href ? null : item.href)
                  }
                  className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-between ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.submenu && openDropdown === item.href && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        to={subitem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                          isActive(subitem.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2 mt-4 px-4">
              <Button variant="outline" size="sm" className="w-full">
                Kirish
              </Button>
              <Button size="sm" className="w-full">
                Ro'yxatdan o'tish
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

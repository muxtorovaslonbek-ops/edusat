import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const prevTitle = document.title;
    document.title = "Sahifa topilmadi — EduSat";

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = selector.replace(/[\[\]"']/g, "").split("=");
        el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", "Siz qidirgan sahifa mavjud emas. EduSat bosh sahifasiga qayting.");
    setMeta('meta[property="og:title"]', "content", "Sahifa topilmadi — EduSat");
    setMeta('meta[property="og:description"]', "content", "Siz qidirgan sahifa mavjud emas. EduSat bosh sahifasiga qayting.");
    setMeta('meta[name="robots"]', "content", "noindex, follow");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const prevCanonical = canonical.href;
    canonical.href = `https://edu-sat.lovable.app${location.pathname}`;

    return () => {
      document.title = prevTitle;
      const robots = document.head.querySelector('meta[name="robots"]');
      robots?.parentNode?.removeChild(robots);
      if (canonical) canonical.href = prevCanonical || "https://edu-sat.lovable.app/";
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-foreground">Kechirasiz, sahifa topilmadi</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Bosh sahifaga qaytish
        </a>
      </div>
    </div>
  );
};

export default NotFound;

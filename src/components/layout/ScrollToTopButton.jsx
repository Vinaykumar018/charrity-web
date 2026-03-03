import React from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);
 
   React.useEffect(() => {
     const toggle = () => setVisible(window.scrollY > 500);
     window.addEventListener("scroll", toggle);
     return () => window.removeEventListener("scroll", toggle);
   }, []);
 
   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
     <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 z-40 p-3 bg-indigo-700 text-white rounded-full shadow-2xl hover:bg-indigo-800 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

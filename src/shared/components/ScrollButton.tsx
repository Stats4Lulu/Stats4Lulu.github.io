import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  statementRef: any
}

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(
    () => {
      const onScroll = () => setIsVisible(window.scrollY > 300) //300 = arbitrary; might be too low
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    },
    [], //render once
  )

  if (!isVisible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      //reminder: z = mobile only!
      className="bg-mainScroll hover:bg-mainScroll dark:bg-mainScroll-dark fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
  )
}

export function ScrollToTopOrBottomButton({ 
  statementRef 
}: Props) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check if the container is scrollable
  const checkScrollable = () => {
    const el = statementRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight > el.clientHeight);
  };

  // Update whether we are at the bottom
  const handleScroll = () => {
    const el = statementRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsAtBottom(atBottom);
  };

  // Scroll to top or bottom
  const ScrollToTopOrBottom = () => {
    const el = statementRef.current;
    if (!el) return;
    el.scrollTo({
      top: isAtBottom ? 0 : el.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScrollable();
    const el = statementRef.current;
    el?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScrollable);

    return () => {
      el?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [statementRef]);

  if (!isScrollable) return null;

  return (
    <button
      onClick={ScrollToTopOrBottom}
      className="absolute bottom-3 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-white/40 border border-scrollButton/60 text-scrollButton shadow-md hover:bg-white hover:shadow-lg transition cursor-pointer"
    >
      {isAtBottom ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );
}
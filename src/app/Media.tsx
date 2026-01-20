import { useState, useRef, useEffect, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import CookieBanner from "@/shared/components/Cookies"
import mediaBgImage from "../assets/images/mediaBgImage.png";
import {
  Background,
  WhoWeAre,
  OurMission,
  WhatWeStandFor,
  BehindTheScenes,
  CommunityPartners,
  GetInvolved,
  MediaAndMentions,
} from "../data/media";

const navTitle = <>Stats4Lulu Media Summaries</>
const navSubtitle = <>Official statements from the Stats4Lulu team</>
const navEmail = <>stats4lulu@gmail.com</>
const navDiscord = <>Join our Discord</>
const navReports = <>Bug Reports & Suggestions</>

interface ButtonItem {
  label: string;
  content: ReactNode;
}

export default function Media() {
  const [active, setActive] = useState<number>(-1); // mobile: -1 means all accordion buttons closed
  const [navHeight, setNavHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [resetToken, setResetToken] = useState(0); //reset token for sub-accordions
  const navRef = useRef<HTMLDivElement | null>(null);

  const BUTTONS: ButtonItem[] = [
    { label: "Overview", content: <Background resetToken={resetToken} /> },
    { label: "Who we are", content: <WhoWeAre /> },
    { label: "Our mission", content: <OurMission /> },
    { label: "What we stand for", content: <WhatWeStandFor /> },
    {
      label: "Behind the scenes",
      content: <BehindTheScenes resetToken={resetToken} />,
    },
    { label: "Community partners", content: <CommunityPartners /> },
    { label: "Get involved", content: <GetInvolved /> },
    { label: "Mentions & media", content: <MediaAndMentions /> },
  ];

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>(
    BUTTONS.map(() => null),
  );
  const contentWrapperRefs = useRef<Array<HTMLDivElement | null>>(
    BUTTONS.map(() => null),
  );

  const SEPARATOR_COLORS = [
    "#88B3AF",
    "#88B3AF",
    "#6a8b88",
    "#618c88",
    "#476B65",
    "#324D48",
    "#000000",
    "#000000",
  ];

  // desktop height calc
  useEffect(() => {
    const updateHeights = () => {
      if (navRef.current) {
        const navH = navRef.current.offsetHeight;
        setNavHeight(navH);

        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - navH;

        const separatorHeight = 6;
        const calculatedButtonHeight = Math.floor(
          (availableHeight - (BUTTONS.length - 1) * separatorHeight) /
            BUTTONS.length,
        );

        setButtonHeight(calculatedButtonHeight);
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  // mobile button tap
  const handleButtonClick = (index: number) => {
    const prevIndex = active;
    const newIndex = prevIndex === index ? -1 : index;
    setActive(newIndex);

    const buttonEl = buttonRefs.current[index];
    const wrapperEl = contentWrapperRefs.current[index];
    if (!buttonEl || !wrapperEl) return;

    // Always reset sub-accordions if parent is closing
    if (newIndex === -1) {
      setResetToken((t) => t + 1); // increment reset token
    }

    // Collapse previous content if open and not the current
    if (prevIndex !== -1 && prevIndex !== index) {
      const prevWrapper = contentWrapperRefs.current[prevIndex];
      if (prevWrapper) prevWrapper.style.maxHeight = "0px";

      // Increment reset token to reset sub-accordions of previous section
      setResetToken((t) => t + 1);
    }

    // Expand content on mobile
    requestAnimationFrame(() => {
      if (newIndex !== -1) {
        wrapperEl.style.maxHeight = "9999px";

        setTimeout(() => {
          const sectionEl = buttonEl.parentElement;
          if (!sectionEl) return;
          const rect = sectionEl.getBoundingClientRect();
          const scrollTop =
            window.scrollY +
            rect.top -
            window.innerHeight / 2 +
            rect.height / 2;
          window.scrollTo({ top: scrollTop, behavior: "smooth" });
        }, 50);
      }
    });
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      setActive(0); // desktop default, first button open
    } else {
      setActive(-1); // mobile default closed, all accordion buttons closed
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden opacity-0 animate-fadeIn">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.0s ease-out forwards;
        }
      `}</style>

      <Helmet>
        <title>Stats4Lulu Media Summaries</title>
        <meta name="description" content="Official statements from the Stats4Lulu team"/>
        <meta name="author" content="Stats4Lulu" />
        <meta name="keywords" content="Luigi Mangione, Stats4Lulu, timeline, advocacy, statistics, media, events, data" />

        <meta property="og:title" content="Stats4Lulu Media Summaries" />
        <meta property="og:description" content="Official statements from the Stats4Lulu team"/>
        <meta property="og:url" content="https://stats4lulu.github.io/media" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Stats4Lulu Media Summaries" />
        <meta name="twitter:description" content="Official statements from the Stats4Lulu team"/>
        <meta name="twitter:url" content="https://stats4lulu.github.io/timeline" />
      </Helmet>

      {/* MOBILE */}
      <div className="block md:hidden">
        {/* navbar */}
        <nav
          className="w-full px-4 pt-2 pb-4"
          style={{ fontFamily: "Courier New, monospace" }}
        >
          <h1 className="text-xl font-bold" style={{ lineHeight: 1.05 }}>
            {navTitle}
          </h1>
          <h2
            className="font-mono text-sm text-black/60"
            style={{ lineHeight: 1.05 }}
          >
            {navSubtitle}
          </h2>

          <div
            className="flex flex-wrap items-center gap-[0.4rem] text-sm mt-1 font-semibold italic text-black/75"
            style={{ lineHeight: 1.05 }}
          >
            <a href="mailto:stats4lulu@gmail.com">{navEmail}</a>
            <span className="text-black/40">•</span>
            <a
              href="https://discord.gg/hDuuFCtWbk"
              target="_blank"
              rel="noopener noreferrer"
            >
              {navDiscord}
            </a>
            <span className="text-black/40">•</span>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeLFppQsFajVnM_QrxfphwQ-1EKnUKWgMMfBfga9yX3JkZ_9Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              {navReports}
            </a>
          </div>
        </nav>

        {/* accordion */}
        <div className="flex flex-col">
          {BUTTONS.map((item, index) => {
            const isOpen = active === index;
            return (
              <div key={item.label}>
                <button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  onClick={() => handleButtonClick(index)}
                  className="w-full px-4 py-5 text-lg font-mono bg-[#eeeeee] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xl">{isOpen ? "v" : ">"}</span>
                </button>

                {/* Separator colors */}
                <div
                  className="w-full h-[6px]"
                  style={{ backgroundColor: SEPARATOR_COLORS[index] }}
                />

                {/* Accordion content */}
                <div
                  ref={(el) => {
                    contentWrapperRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "9999px" : "0px" }}
                >
                  <div className="relative p-4 pb-8 text-lg font-serif text-black">
                    <img
                      src={mediaBgImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    />
                    <div className="relative z-10">{item.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        {/* right image */}
        <div
          className="fixed top-0 bottom-0 right-0 z-20 w-[60%] pointer-events-none"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${mediaBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div
            className="absolute right-0 flex items-start justify-start overflow-y-auto pointer-events-auto"
            style={{
              top: navHeight,
              bottom: "2rem",
              left: "12%",
              right: "1rem",
              paddingLeft: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <h2 className="text-lg font-serif text-black break-words">
              {active !== -1 && BUTTONS[active].content}
            </h2>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* navbar */}
        <nav
          ref={navRef}
          className="absolute top-0 left-0 right-0 z-50"
          style={{
            fontFamily: "Courier New, monospace",
            clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          }}
        >
          <div className="relative flex justify-start items-start px-4 md:px-6 pt-2 pb-4">
            <div className="flex flex-col text-black max-w-[calc(100%-50vw)]">
              <h1
                className="text-xl sm:text-lg md:text-xl lg:text-3xl font-bold"
                style={{ lineHeight: 1.05 }}
              >
                {navTitle}
              </h1>
              <h2
                className="font-mono text-sm md:text-base text-black/60"
                style={{ lineHeight: 1.05 }}
              >
                {navSubtitle}
              </h2>

              <div
                className="flex flex-wrap items-center gap-[0.4rem] text-sm md:text-base mt-1 font-semibold italic text-black/75 "
                style={{ lineHeight: 1.05 }}
              >
                <a
                  href="mailto:stats4lulu@gmail.com"
                  className="hover:text-blue-200"
                >
                  {navEmail}
                </a>
                <span className="text-black/40">•</span>
                <a
                  href="https://discord.gg/hDuuFCtWbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-200"
                >
                  {navDiscord}
                </a>
                <span className="text-black/40">•</span>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeLFppQsFajVnM_QrxfphwQ-1EKnUKWgMMfBfga9yX3JkZ_9Q/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-200"
                >
                  {navReports}
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* left buttons */}
        <div
          className="absolute left-0 z-10 flex flex-col overflow-y-auto"
          style={{ top: navHeight, bottom: 0, right: "51.8%" }}
        >
          {BUTTONS.map((item, index) => (
            <div key={item.label}>
              <button
                onClick={() => setActive(index)}
                className={`w-full text-2xl font-mono transition cursor-pointer ${
                  active === index ? "bg-[#DADCE3]" : "bg-[#eeeeee]"
                } hover:bg-gray-200`}
                style={{ height: buttonHeight, minHeight: 80, maxHeight: 200 }}
              >
                {item.label}
              </button>

              {index < BUTTONS.length - 1 && (
                <div
                  className="w-full h-[6px]"
                  style={{ backgroundColor: SEPARATOR_COLORS[index] }}
                />
              )}
            </div>
          ))}
          <div
            className="w-full h-[6px]"
            style={{
              backgroundColor: SEPARATOR_COLORS[SEPARATOR_COLORS.length - 1],
            }}
          />
        </div>
      </div>
      <CookieBanner 
        bgColor={"bg-mediaCookiePopup"}
      />
    </section>
  );
}

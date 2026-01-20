import bgImage from "@/assets/images/bgImage.png";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import CookieBanner from "@/shared/components/Cookies"
import HomePageCard from "@/features/homePage/HomePageCard";
import Navbar from "@/features/homePage/Navbar";
import rawItems from "../data/links.json";
import { cleanLinkItems } from "../data/items"
import { ScrollToTopOrBottomButton } from "@/shared/components/ScrollButton"

const items = cleanLinkItems(rawItems)

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState("60vh");

  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Stats4Lulu Official Website";

    // preload background image
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setBgLoaded(true);

    // Fade-in sequence
    setTimeout(() => setShowPrimary(true), 100);   // show navbar/bgImage first
    setTimeout(() => setShowSecondary(true), 500); // then everything else

    // Responsive LookerStudio height logic
    const resizeObserver = new ResizeObserver(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Keep LookerStudio iframe height dynamic based on viewport height
      // idk what im doing here lel
      if (vw < 375) {
        setIframeHeight(`${vh * 0.50}px`);
      } else if (vw >= 375 && vw < 480) {
        setIframeHeight(`${vh * 0.53}px`);
      } else if (vw >= 480 && vw < 576) {
        setIframeHeight(`${vh * 0.53}px`);
      } else if (vw >= 576 && vw < 768) {
        setIframeHeight(`${vh * 0.53}px`);
      } else if (vw >= 768 && vw < 900) {
        setIframeHeight(`${vh * 0.53}px`);
      } else if (vw >= 900 && vw < 1024) {
        setIframeHeight(`${vh * 0.53}px`);
      } else if (vw >= 1024 && vw < 1440) {
        setIframeHeight(`${vh * 0.53}px`);
      } else {
        setIframeHeight(`${vh * 0.53}px`);
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full h-auto overflow-y-auto text-white">
      <Helmet>
        <title>Stats4Lulu Official Website</title>
        <meta name="description" content="Luigi Mangione data and statistical insights"/>
        <meta name="author" content="Stats4Lulu" />
        <meta name="keywords" content="Luigi Mangione, Stats4Lulu, timeline, advocacy, statistics, media, events, data" />

        <meta property="og:title" content="Stats4Lulu Official Website" />
        <meta property="og:description" content="Luigi Mangione data and statistical insights"/>
        <meta property="og:url" content="https://stats4lulu.github.io" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Stats4Lulu Official Website" />
        <meta name="twitter:description" content="Luigi Mangione data and statistical insights"/>
        <meta name="twitter:url" content="https://stats4lulu.github.io" />
      </Helmet>

      <div className="flex flex-col md:flex-row w-full h-auto md:h-screen">
        {/* Left side */}
        <div
          className={`flex flex-col w-full md:w-2/3 transition-all duration-700 ease-out ${
            showPrimary ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
           <Navbar/>
          
          {/* Cards */}
          <div
            className={`flex flex-col md:flex-row justify-center items-center flex-1 gap-8 pt-12 pb-8 px-4 md:px-8 bg-center relative transition-opacity duration-1000 ease-out ${
              bgLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {items.map((card, i) => (
              <HomePageCard
              card={card}
              i={i}
              showSecondary={showSecondary}
              />
            ))}
          </div>
        </div>

        {/* Right side */}
        <div
          className={`flex flex-col w-full md:w-1/3 h-auto md:h-full transition-all duration-700 ease-out ${
            showSecondary ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* LookerStudio embed */}
          <div
            className="relative flex justify-center items-center bg-lookerStudioBackground overflow-hidden"
            style={{
              height: iframeHeight,
              overflow: "hidden", // Disable scrolling on mobile
            }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-lookerStudioBackground text-gray-600 font-mono text-sm z-10">
                Please wait, loading the latest stats...
              </div>
            )}
            <iframe
              src="https://lookerstudio.google.com/embed/reporting/d679aad5-c506-4833-adc9-7d7b088aa128/page/p_6tpp4q8xrd"
              width="100%"
              height="100%"
              className="border-0 rounded-none overflow-hidden"
              onLoad={() => setIsLoading(false)}
              scrolling="no" // Disable scrolling inside iframe
            ></iframe>
          </div>

          {/* Official Statement */}
          <div
            className="relative h-auto md:h-[48%] flex flex-col justify-start items-start text-left bg-statementBackground overflow-hidden font-title"
          >
            <div
              ref={statementRef}
              className="overflow-y-auto w-full px-6 py-4 pr-10"
              style={{ height: "100%" }}
            >
              <h4 className="text-black text-base sm:text-lg md:text-xl font-bold mb-2">
                Official Statement from the Team
              </h4>
              <div className="text-black text-sm md:text-base leading-relaxed">
                <p className="mb-2">
                  The Stats4Lulu team has created and maintains an online,
                  interactive dashboard on Luigi Mangione that shares
                  information about not only the letters he has received but
                  donations made to his GiveSendGo campaign to fund his legal
                  cases, and top news articles relating to Luigi. This dashboard
                  is translated into 8 languages: Italian, Spanish, French,
                  Brazilian Portuguese, German, Simplified Chinese, and
                  Traditional Chinese.
                </p>
                <p>
                  The team currently stands at over 30 volunteers working across
                  data, wordsmiths, translation, events, and collaborations. The
                  members are custodians of statistics related to Luigi. They
                  nurture and grow it, but in the end, it all belongs to Luigi
                  and is shared as an act of service for him.
                </p>
              </div>
            </div>
            <ScrollToTopOrBottomButton
             statementRef={statementRef}
            />
          </div>
        </div>
      </div>
      <CookieBanner 
        bgColor={"bg-homePageCookiePopup"}
      />
    </div>
  );
}
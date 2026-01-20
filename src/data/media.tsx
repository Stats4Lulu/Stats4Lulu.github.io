import { useState, useEffect } from "react";

export const Background = ({ resetToken }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setOpenIndex(null); // close all sub-accordions when parent resets
  }, [resetToken]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono">
        Stats4Lulu: a global network strengthening transparency in the Luigi
        Mangione case
      </h2>
      <p>
        A global network of volunteers has grown&nbsp;
        <a
          href="https://stats4lulu.github.io/"
          target="_blank"
          style={{ color: "#0a58ca", textDecoration: "underline" }}
        >
          Stats4Lulu
        </a>
        , a data transparency project originally built to track&nbsp;
        <a
          href="https://www.luigimangioneinfo.com/pages/mail-catalog/"
          target="_blank"
          style={{ color: "#0a58ca", textDecoration: "underline" }}
        >
          handwritten mail logs
        </a>
        &nbsp;kept by U.S. inmate Luigi Mangione.
      </p>
      <p>
        Stats4Lulu began initially as a one-off weekend project converting a
        handwritten catalog into key statistics able to be understood by the
        public. The project has since grown from a single spreadsheet managed by
        three people to a multi-disciplinary team of over 30 volunteers, with
        broad skills including data, writing, translation and more. Stats4Lulu
        is a comprehensive open-source platform that visualises data on Luigi's
        letters,&nbsp;
        <a
          href="https://www.givesendgo.com/luigi-defense-fund"
          target="_blank"
          style={{ color: "#0a58ca", textDecoration: "underline" }}
        >
          GiveSendGo
        </a>
        &nbsp;donations, and media coverage.
      </p>
      <p>
        The founder of Stats4Lulu started the project after seeing Luigi's
        meticulous handwritten notes that could easily become a spreadsheet.
      </p>
      <p>
        <em>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Data analytics is a form of
          investigative storytelling, like journalists and authors who share
          stories with words, we share stories with numbers.
        </em>
      </p>
      <p>
        <em>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"To me, playing with data is like
          building with Lego; you start with individual separate pieces that
          don't make any sense and you assemble it together to create something
          that is enjoyed by all,"
        </em>{" "}
        the Stats4Lulu founder said.
      </p>
      <p>
        The platform now includes&nbsp;
        <a
          href="https://lookerstudio.google.com/reporting/d603a7eb-4bb9-4231-973f-05b71e24d3a2/page/p_unct2t61td?s=qXhVAmCmFZM"
          target="_blank"
          style={{ color: "#0a58ca", textDecoration: "underline" }}
        >
          translations in eight languages
        </a>
        &nbsp;— Italian, Spanish, French, Brazilian Portuguese, German,
        Simplified Chinese, and Traditional Chinese — ensuring information about
        the case is accessible to an international audience and helping people
        see the positive sentiment and support from thousands of people around
        the world.
      </p>
      <p>
        <em>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"As a former data engineer, his
          precision shows both his love of data and his determination to stay
          connected. We wanted to honour that effort by turning his system into
          a public record,"
        </em>{" "}
        a Stats4Lulu spokesperson said.
      </p>
      <p>
        <em>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"For us, data became a form of
          advocacy."
        </em>
      </p>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(0)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 0}
        >
          <h3 className="text-lg md:text-xl font-mono">
            Transparency already making an impact
          </h3>
          <span className="text-xl">{openIndex === 0 ? "-" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 0 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            The Stats4Lulu dashboard's data was formally cited in&nbsp;
            <a
              href="https://cdn.sanity.io/files/detu0qji/production/667882212ac2c73a724fadcda417e50352de6303.pdf"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              Luigi Mangione's defense motion
            </a>
            &nbsp;(June 18, 2025, p.5), highlighting the project's credibility
            and influence. Analysis of public fund comments found that the most
            common words left by donors were “love,” “hope,” “support,”
            “people,” and “free”; evidence of the global empathy the case has
            inspired and the shared belief that everyone deserves fair treatment
            under the law.
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(1)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 1}
        >
          <h3 className="text-lg md:text-xl font-mono">
            Expanding advocacy through partnership
          </h3>
          <span className="text-xl">{openIndex === 1 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 1 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            Stats4Lulu recently collaborated with <b>Luigistics</b> to create
            the Luigi Mangione Event Timeline, an interactive visual journey
            through key milestones in Luigi's case. The timeline features
            videos, photos, legal documents, and plain-language summaries for
            every major event, with user-friendly filters by date and event
            type, plus dark and light modes for accessibility. Explore:&nbsp;
            <a
              href="https://stats4lulu.github.io/timeline"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://stats4lulu.github.io/timeline
            </a>
            &nbsp;and&nbsp;
            <a
              href="https://luigistics.com/"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://luigistics.com
            </a>
          </p>

          <p>
            The collective is also a regular contributor to{" "}
            <b>The Plot Newspaper</b>, an independent supporter-run publication
            that covers Luigi's case, capital trials, broader issues related to
            the death penalty, and healthcare reform. Read more:&nbsp;
            <a
              href="https://linktr.ee/theplotnews"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://linktr.ee/theplotnews
            </a>
          </p>

          <p>
            In addition, Stats4Lulu provides ongoing data and technical support
            for <b>Luigi's Legal Fund Bookshop</b>, a community-driven
            initiative raising awareness through curated reading lists and
            advocacy collaborations. Visit:&nbsp;
            <a
              href="https://luigisbooks.com/"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://luigisbooks.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(2)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 2}
        >
          <h3 className="text-lg md:text-xl font-mono">About Stats4Lulu</h3>
          <span className="text-xl">{openIndex === 2 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 2 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            Stats4Lulu is a volunteer-run transparency initiative dedicated to
            documenting and visualising verified data about Luigi Mangione's
            correspondence, donations, and media coverage. What began as an
            effort to track thousands of handwritten letter receipts has evolved
            into an open-source resource advocating for transparency, fairness,
            and the constitutional right to a fair trial.
          </p>

          <p>
            For more information, visit the Stats4Lulu website:&nbsp;
            <a
              href="https://stats4lulu.github.io"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://stats4lulu.github.io
            </a>
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(3)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 3}
        >
          <h3 className="text-lg md:text-xl font-mono">
            Create your own insights
          </h3>
          <span className="text-xl">{openIndex === 3 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 3 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            The Stats4Lulu team is committed to open data. We've&nbsp;
            <a
              href="https://www.kaggle.com/stats4lulu/datasets"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              created shared datasets on Kaggle
            </a>
            &nbsp;so anyone can explore the numbers, analyse trends, and
            contribute fresh insights. We welcome collaboration from the wider
            community and invite you to share your findings with us.
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(4)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 4}
        >
          <h3 className="text-lg md:text-xl font-mono">Media Contact</h3>
          <span className="text-xl">{openIndex === 4 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 4 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>Stats4Lulu Communications Team</p>

          <p>
            <a
              href="mailto:stats4lulu@gmail.com"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              stats4lulu@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export const WhoWeAre = () => (
  <div className="space-y-4">
    <p>
      Stats4Lulu is a global volunteer network dedicated to strengthening
      transparency and accountability in the case of Luigi Mangione.
    </p>
    <p>
      The project began as a simple effort to digitise Luigi's handwritten
      letter logs, which recorded thousands of messages sent to him from around
      the world. What started as a small spreadsheet created by three volunteers
      has grown into a multidisciplinary, open-source platform that turns raw
      data into accessible public insights.
    </p>
    <p>
      Today, the team includes more than 30 volunteers working across data,
      writing, translation, events and collaborations. Our members see
      themselves as custodians of the statistics related to Luigi. We nurture
      and grow this work, but in the end, it all belongs to Luigi and is shared
      as an act of service for him.
    </p>
  </div>
);

export const OurMission = () => (
  <div className="space-y-4">
    <p>
      Our mission is to bring awareness through data and to transform complex
      information into clear, data storytelling that supports fairness, informed
      advocacy and responsible public engagement.
    </p>
    <p>
      We believe open data can unite people across backgrounds and experiences.
      By distilling information into meaningful and accessible insights, we aim
      to strengthen understanding around issues of justice, human rights and
      community activism, and to support transparent and compassionate public
      dialogue.
    </p>
  </div>
);

export const WhatWeStandFor = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-mono">Transparency</h3>
    <p>
      We make verified information publicly accessible to support fairness,
      human rights advocacy and informed public engagement.
    </p>
    <h3 className="text-xl font-mono">Collaboration</h3>
    <p>
      We work across disciplines and in partnership with advocacy groups,
      community creators and support networks.
    </p>
    <h3 className="text-xl font-mono">Equity</h3>
    <p>
      We believe good data helps people see context, nuance and the human
      stories behind every statistic.
    </p>
    <h3 className="text-xl font-mono">Community</h3>
    <p>
      Our global volunteer network thrives on teamwork, shared learning and
      collective effort.
    </p>
  </div>
);

export const BehindTheScenes = ({ resetToken }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setOpenIndex(null); // close all sub-accordions when parent resets
  }, [resetToken]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <p>
        Much of Stats4Lulu&apos;s work happens quietly, through sustained
        community engagement and support that often sits outside the public
        view.
      </p>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(0)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 0}
        >
          <h3 className="text-lg md:text-xl font-mono">Data team</h3>
          <span className="text-xl">{openIndex === 0 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 0 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            Our data team powers the foundation of every dashboard, chart and
            update. They:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>research, extract and summarise published data</li>
            <li>publish and maintain the datasets used across Stats4Lulu</li>
            <li>
              ensure accuracy, consistency and clarity for public-facing tools
            </li>
            <li>
              provide the underlying data that informs collaborations and
              community projects
            </li>
            <li>
              produce data for various creators and non-profits in the Luigi
              Mangione supporter community
            </li>
            <li>
              provide social media data analytics and interpretation for content
              creators
            </li>
          </ul>

          <p>
            Their work is the engine that keeps Stats4Lulu factual, transparent
            and up to date.
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(1)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 1}
        >
          <h3 className="text-lg md:text-xl font-mono">Data ambassadors</h3>
          <span className="text-xl">{openIndex === 1 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 1 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            Our data ambassadors act as trusted liaisons across multiple
            communities. They:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>provide regular updates and clarify community questions</li>
            <li>help people navigate dashboards and tools</li>
            <li>guide supporters to submit feedback via webforms</li>
            <li>maintain open communication between different groups</li>
          </ul>

          <p>
            Their behind-the-scenes support keeps information accurate,
            accessible and connected.
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(2)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 2}
        >
          <h3 className="text-lg md:text-xl font-mono">
            Translators and wordsmiths
          </h3>
          <span className="text-xl">{openIndex === 2 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 2 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            Our translators and wordsmiths ensure that information is
            understandable, accurate and accessible to a global audience. Their
            work includes:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              translating dashboards, guides and captions across eight languages
            </li>
            <li>
              refining written content so complex data becomes clear and human
            </li>
            <li>
              providing media advice to creators, advocates and community
              groups—within and outside Stats4Lulu
            </li>
            <li>
              offering social media support across platforms to help communicate
              information responsibly
            </li>
            <li>preserving clarity and tone for accessibility</li>
          </ul>

          <p>
            They are essential to making this project international, consistent
            and easy to navigate.
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(3)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 3}
        >
          <h3 className="text-lg md:text-xl font-mono">
            Creator and non-profit support
          </h3>
          <span className="text-xl">{openIndex === 3 ? "−" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 3 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            Stats4Lulu also provides technical and analytical assistance to
            creators, journalists and non-profit groups. This includes:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>data verification and preparation</li>
            <li>tailored visualisations for advocacy campaigns</li>
            <li>
              social media data analytics to support responsible communication
            </li>
          </ul>

          <p>
            These contributions help strengthen the wider ecosystem working for
            transparency, justice and informed public engagement.
          </p>
        </div>
      </div>

      <div className="border-b border-black/20 pb-4">
        <button
          type="button"
          onClick={() => toggle(4)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
          aria-expanded={openIndex === 4}
        >
          <h3 className="text-lg md:text-xl font-mono">Event timeline team</h3>
          <span className="text-xl">{openIndex === 4 ? "-" : "+"}</span>
        </button>

        <div
          className={`${openIndex === 4 ? "block" : "hidden"} mt-4 space-y-4`}
        >
          <p>
            The event timeline team curates the key events in Luigi's case and
            ensures they are presented clearly and accurately. They:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              research major developments and verify details against public
              records
            </li>
            <li>
              write concise summaries to make the case accessible for all
              audiences
            </li>
            <li>prepare curated event lists used in collaborative projects</li>
          </ul>

          <p>
            Stats4Lulu recently collaborated with <b>Luigistics</b> to create
            the Luigi Mangione Event Timeline, an interactive visual journey
            through key milestones in Luigi's case. Stats4Lulu provided the
            underlying data and curated event collection, while Luigistics
            digitised the project into an interactive public website. See:&nbsp;
            <a
              href="https://luigistics.com/"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://luigistics.com
            </a>
          </p>
          <p>
            The timeline features videos, photos, legal documents, and
            plain-language summaries for every major event, with user-friendly
            filters by date and event type, plus dark and light modes for
            accessibility. Explore:&nbsp;
            <a
              href="https://stats4lulu.github.io/timeline"
              target="_blank"
              style={{ color: "#0a58ca", textDecoration: "underline" }}
            >
              https://stats4lulu.github.io/timeline
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export const CommunityPartners = () => (
  <div className="space-y-4">
    <p>
      The collective is a regular contributor to <b>The Plot Newspaper</b>, an
      independent supporter-run publication that covers Luigi's case, capital
      trials, broader issues related to the death penalty, and healthcare
      reform. Read more:&nbsp;
      <a
        href="https://linktr.ee/theplotnews"
        target="_blank"
        style={{ color: "#0a58ca", textDecoration: "underline" }}
      >
        https://linktr.ee/theplotnews
      </a>
    </p>

    <p>
      In addition, Stats4Lulu provides ongoing data and technical support for{" "}
      <b>Luigi's Legal Fund Bookshop</b>, a community-driven initiative raising
      awareness through curated reading lists and advocacy collaborations.
      Visit:&nbsp;
      <a
        href="https://luigisbooks.com"
        target="_blank"
        style={{ color: "#0a58ca", textDecoration: "underline" }}
      >
        https://luigisbooks.com
      </a>
    </p>
  </div>
);

export const GetInvolved = () => (
  <div className="space-y-4">
    <p>
      Explore our dashboards, timelines and open datasets. Build your own
      analyses. Join the conversation or simply learn more.
    </p>

    <p>
      Website:&nbsp;
      <a
        href="https://discord.gg/hDuuFCtWbk"
        target="_blank"
        style={{ color: "#0a58ca", textDecoration: "underline" }}
      >
        https://discord.gg/hDuuFCtWbk
      </a>
    </p>
    <p>
      Discord:&nbsp;
      <a
        href="https://stats4lulu.github.io"
        target="_blank"
        style={{ color: "#0a58ca", textDecoration: "underline" }}
      >
        https://stats4lulu.github.io
      </a>
    </p>
    <p>
      Email:&nbsp;
      <a
        href="mailto:stats4lulu@gmail.com"
        style={{ color: "#0a58ca", textDecoration: "underline" }}
      >
        stats4lulu@gmail.com
      </a>
    </p>
  </div>
);

export const MediaAndMentions = () => {
  const cards = [
    {
      title: "Documents",
      links: [
        [
          "NY Defense Motion (p.5)",
          "https://cdn.sanity.io/files/detu0qji/production/667882212ac2c73a724fadcda417e50352de6303.pdf",
        ],
      ],
    },
    {
      title: "Articles",
      links: [
        ["Rolling Stone", "https://archive.ph/X3fIK"],
        [
          "TMZ",
          "https://www.tmz.com/2025/09/04/luigi-mangione-shein-ad-from-chinese-fans/",
        ],
      ],
    },
    {
      title: "Podcasts",
      links: [
        [
          "Party Girls Podcast [cited on 9 May 2025]",
          "https://fans.fm/p/pKDdApX",
        ],
        [
          "Party Girls Podcast [cited on 4 Dec 2025]",
          "https://fans.fm/p/NomNjqQ",
        ],
      ],
    },
    {
      title: "Social Media",
      links: [
        [
          "Flisflisher's Luigi Documentary on YouTube",
          "https://youtu.be/xIMen37xsoM?si=6aCwxpvKvw10N4DC&t=5922",
        ],
      ],
    },
    {
      title: "Other",
      links: [
        [
          "Luigi Mangione Legal Defense Fund Description",
          "https://www.givesendgo.com/luigi-defense-fund",
        ],
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative bg-white/40 backdrop-blur-md rounded-xl shadow-md p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg border border-black/20"
          >
            <h4
              className="font-semibold text-lg text-thirdCard"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              {card.title}
            </h4>

            <div className="flex flex-col gap-2 font-sans">
              {card.links.map(([text, link], j) => (
                <button
                  key={j}
                  onClick={() =>
                    window.open(link, "_blank", "noopener,noreferrer")
                  }
                  className="px-2 py-1 text-white rounded-md cursor-pointer w-full text-center text-sm transition hover:opacity-90"
                  style={{
                    backgroundColor: "var(--color-thirdCard)",
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

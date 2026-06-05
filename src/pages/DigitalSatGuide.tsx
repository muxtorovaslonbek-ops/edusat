import { useEffect } from "react";
import { Link } from "react-router-dom";

const CANONICAL = "https://edu-sat.lovable.app/digital-sat-practice-test";

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [k, v] = selector.replace(/[\[\]"']/g, "").split("=");
    el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const DigitalSatGuide = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Digital SAT Practice Test Guide — Strategies & Free Prep | EduSat";

    const desc =
      "A complete Digital SAT practice test guide: structure, scoring, official practice tests, study schedule, and proven strategies to prepare for the SAT — by EduSat.";
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", "Digital SAT Practice Test Guide — EduSat");
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", CANONICAL);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[name="twitter:title"]', "content", "Digital SAT Practice Test Guide — EduSat");
    setMeta('meta[name="twitter:description"]', "content", desc);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevHref = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL;

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: "Digital SAT Practice Test Guide",
          description: desc,
          inLanguage: "en",
          author: { "@type": "Organization", name: "EduSat" },
          publisher: {
            "@type": "Organization",
            name: "EduSat",
            logo: { "@type": "ImageObject", url: "https://edu-sat.lovable.app/icon-512.png" },
          },
          mainEntityOfPage: CANONICAL,
        },
        {
          "@type": "Course",
          name: "Digital SAT Preparation",
          description:
            "Online Digital SAT prep covering Reading & Writing and Math modules, with adaptive practice tests and personalized study plans.",
          provider: {
            "@type": "EducationalOrganization",
            name: "EduSat",
            sameAs: "https://edu-sat.lovable.app/",
          },
          hasCourseInstance: [
            {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: "PT40H",
            },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How long is the Digital SAT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Digital SAT is 2 hours and 14 minutes long, split into a Reading & Writing section (64 minutes) and a Math section (70 minutes), with a 10-minute break in between.",
              },
            },
            {
              "@type": "Question",
              name: "How should I prepare for the SAT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Start with a full-length official Bluebook practice test to set a baseline, study 6–10 weeks with weekly targeted drills on your weakest question types, then take a timed practice test every weekend to track progress.",
              },
            },
            {
              "@type": "Question",
              name: "Are Digital SAT practice tests free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. College Board's Bluebook app offers free official adaptive practice tests, and Khan Academy provides free targeted practice keyed to your score report.",
              },
            },
            {
              "@type": "Question",
              name: "What is a good SAT score?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A score above 1200 is competitive for many universities, 1350+ is strong, and 1500+ is competitive for the most selective schools.",
              },
            },
          ],
        },
      ],
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      if (canonical && prevHref) canonical.href = prevHref;
      ld.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Digital SAT Practice Test Guide</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Digital SAT Practice Test Guide: Strategies, Free Tests & Study Plan
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to prepare for the SAT in 2026 — the new digital
            format, official practice tests, study schedules, and section-by-section
            strategies that actually move scores.
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-2xl font-semibold">What is the Digital SAT?</h2>
          <p>
            The Digital SAT is the College Board's fully digital, adaptive version of
            the SAT, taken in the Bluebook app on a laptop or tablet. It is shorter
            than the paper SAT (2 hours 14 minutes), uses shorter reading passages,
            and adapts the difficulty of the second module of each section based on
            how you perform in the first.
          </p>

          <h2 className="text-2xl font-semibold">Test structure at a glance</h2>
          <ul className="list-disc pl-6">
            <li><strong>Reading & Writing</strong> — 2 modules · 27 questions each · 32 minutes per module</li>
            <li><strong>Break</strong> — 10 minutes</li>
            <li><strong>Math</strong> — 2 modules · 22 questions each · 35 minutes per module (built-in Desmos calculator on every question)</li>
            <li><strong>Scoring</strong> — 400–1600 total (200–800 per section)</li>
          </ul>

          <h2 className="text-2xl font-semibold">Where to find free Digital SAT practice tests</h2>
          <p>
            The single most important step is taking <strong>official</strong> practice
            tests, because only College Board questions match the real adaptive engine.
          </p>
          <ol className="list-decimal pl-6">
            <li><strong>Bluebook app</strong> — 6 free full-length adaptive Digital SAT practice tests directly from College Board.</li>
            <li><strong>Khan Academy</strong> — free targeted question sets and full-length linear practice tests, keyed to your Bluebook score report.</li>
            <li><strong>EduSat daraja aniqlash</strong> — our placement test gives you a quick proctored baseline and recommends what to study next.</li>
          </ol>

          <h2 className="text-2xl font-semibold">How to prepare for the SAT in 8 weeks</h2>
          <p>
            A realistic 8-week plan beats a chaotic 6-month plan. Aim for ~8 focused
            hours per week.
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Week 1</strong> — Take Bluebook Practice Test #1 untimed-friendly to set a baseline.</li>
            <li><strong>Weeks 2–3</strong> — Drill your two weakest Reading & Writing question types and two weakest Math topics.</li>
            <li><strong>Weeks 4–5</strong> — Add timed modules every other day; review every wrong answer until you can teach it.</li>
            <li><strong>Weeks 6–7</strong> — Full-length Bluebook practice tests every weekend with full breaks.</li>
            <li><strong>Week 8</strong> — Taper. Two short practice modules, sleep, and a final mock 5 days before test day.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Reading & Writing strategies</h2>
          <ul className="list-disc pl-6">
            <li>Read the question stem <em>before</em> the passage — passages are short, so the question tells you what to look for.</li>
            <li>For "main idea" questions, predict the answer in your own words before looking at the choices.</li>
            <li>For grammar questions, lean on punctuation rules (commas, semicolons, colons) — they account for most Standard English Conventions points.</li>
            <li>Eliminate aggressively: cross out two choices fast, then compare the remaining two.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Math strategies</h2>
          <ul className="list-disc pl-6">
            <li>Use the built-in Desmos calculator for systems, quadratics, and statistics — it is faster than algebra.</li>
            <li>Plug in numbers when the answer choices are variables; plug in answers when the question asks for a specific value.</li>
            <li>Memorize the unit-circle basics and the Pythagorean triples (3-4-5, 5-12-13, 8-15-17).</li>
            <li>Skip and flag any problem that takes &gt;90 seconds — come back at the end of the module.</li>
          </ul>

          <h2 className="text-2xl font-semibold">The week before test day</h2>
          <ul className="list-disc pl-6">
            <li>Install Bluebook on the exact device you will bring and run the full readiness check.</li>
            <li>Charge to 100%, pack a charger, an approved photo ID, and a pencil for scratch work.</li>
            <li>Sleep 8+ hours for two nights in a row — last-night sleep matters less than the night before that.</li>
            <li>Eat a real breakfast with protein and slow carbs on test morning.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>

          <h3 className="text-xl font-semibold">How long is the Digital SAT?</h3>
          <p>2 hours 14 minutes of test time, plus a 10-minute break.</p>

          <h3 className="text-xl font-semibold">Are Digital SAT practice tests free?</h3>
          <p>Yes — the official Bluebook app and Khan Academy are both free.</p>

          <h3 className="text-xl font-semibold">What is a good SAT score?</h3>
          <p>1200+ is competitive for many schools, 1350+ is strong, 1500+ is competitive for the most selective universities.</p>

          <h3 className="text-xl font-semibold">How many times can I take the SAT?</h3>
          <p>There is no official limit. Most students who retake improve; 2–3 attempts is typical.</p>
        </section>

        <aside className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Start your SAT prep on EduSat</h2>
          <p className="mt-2 text-muted-foreground">
            Take our proctored placement test to see where you stand, then get a
            personalized study plan powered by AI tutors.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-glow hover:bg-primary/90"
          >
            Go to EduSat
          </Link>
        </aside>
      </article>
    </main>
  );
};

export default DigitalSatGuide;

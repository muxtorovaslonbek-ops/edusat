import { useEffect } from "react";
import { Link } from "react-router-dom";

const CANONICAL = "https://edu-sat.lovable.app/blog/desmos-sat-math-hacks";

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

const DesmosSatMathHacks = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Desmos SAT Math Hacks: Digital SAT Calculator Strategies | EduSat";

    const desc =
      "The best Desmos hacks for the Digital SAT Math section: systems of equations, quadratics, statistics, and timing shortcuts that beat pencil-and-paper algebra.";
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", "Desmos SAT Math Hacks — EduSat");
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", CANONICAL);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[name="twitter:title"]', "content", "Desmos SAT Math Hacks — EduSat");
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
          headline: "Desmos SAT Math Hacks: Digital SAT Calculator Strategies",
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://edu-sat.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://edu-sat.lovable.app/blog/desmos-sat-math-hacks" },
            { "@type": "ListItem", position: 3, name: "Desmos SAT Math Hacks", item: CANONICAL },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is Desmos allowed on the Digital SAT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Bluebook app includes the official Desmos graphing calculator on every Math question, including the no-calculator-equivalent items from the paper SAT — you can use it on all 44 Math questions.",
              },
            },
            {
              "@type": "Question",
              name: "What is the fastest way to solve systems of equations with Desmos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Type each equation on its own line exactly as written. Desmos plots them automatically; click the intersection point to read the (x, y) solution. This is faster than substitution or elimination on almost every SAT system.",
              },
            },
            {
              "@type": "Question",
              name: "Can Desmos solve quadratics on the SAT?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Type the quadratic set equal to zero (e.g. x^2 - 5x + 6 = 0) and click the x-intercepts for the roots, or graph y = ax^2 + bx + c and click the vertex for the minimum/maximum.",
              },
            },
            {
              "@type": "Question",
              name: "Can Desmos compute mean, median, and standard deviation?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Enter the data set as a list, e.g. L = [4, 7, 7, 9, 12], then type mean(L), median(L), or stdev(L). Desmos returns the value instantly — useful for SAT statistics questions.",
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
          <span>Desmos SAT Math Hacks</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Desmos SAT Math Hacks: Digital SAT Calculator Strategies That Save Real Time
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The Digital SAT gives you the built-in Desmos graphing calculator on every
            Math question. Used well, it turns 2-minute algebra problems into 15-second
            clicks. Here are the hacks that move scores.
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-2xl font-semibold">Why Desmos changes the Digital SAT</h2>
          <p>
            On the paper SAT, half the Math section banned calculators. On the Digital
            SAT, Desmos is available on all 44 questions. That means almost any problem
            you can write as an equation, you can solve by graphing — faster and with
            fewer arithmetic mistakes than algebra by hand.
          </p>

          <h2 className="text-2xl font-semibold">Systems of equations — graph and click</h2>
          <p>
            The single biggest Desmos win on the SAT. For any system, type each equation
            on its own line:
          </p>
          <pre className="rounded-xl border border-border bg-card p-4 text-sm">{`2x + 3y = 12
y = x - 1`}</pre>
          <p>
            Desmos plots both lines automatically. Click the intersection — Desmos shows
            the exact <code>(x, y)</code> coordinates. Read off the answer.
          </p>
          <ul className="list-disc pl-6">
            <li>Works the same for linear-quadratic systems and quadratic-quadratic systems.</li>
            <li>Zoom out with two-finger pinch (or scroll) if you don't see the intersection.</li>
            <li>If the question asks for just <em>x</em> or just <em>y</em>, you still click once and pick the right coordinate.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Quadratics — roots, vertex, axis of symmetry</h2>
          <p>
            Stop factoring. Type the quadratic and let Desmos do the work:
          </p>
          <pre className="rounded-xl border border-border bg-card p-4 text-sm">{`y = x^2 - 5x + 6`}</pre>
          <ul className="list-disc pl-6">
            <li><strong>Roots / x-intercepts</strong> — click each point where the curve crosses the x-axis.</li>
            <li><strong>Vertex (min or max)</strong> — click the bottom or top of the parabola; Desmos labels the coordinates.</li>
            <li><strong>Axis of symmetry</strong> — it's the x-value of the vertex.</li>
            <li><strong>Sum / product of roots</strong> — read the two roots and add or multiply; faster than Vieta's formulas.</li>
          </ul>
          <p>
            If the equation equals zero, type it that way (<code>x^2 - 5x + 6 = 0</code>) and
            Desmos marks the solutions directly on the x-axis.
          </p>

          <h2 className="text-2xl font-semibold">Sliders for "for what value of k" questions</h2>
          <p>
            When a question asks "for what value of <em>k</em> does the system have exactly
            one solution?" type the equation with <em>k</em> in it. Desmos prompts you to add
            a slider. Drag the slider until the graph matches the condition (tangent line,
            single intersection, etc.) and read off <em>k</em>.
          </p>
          <pre className="rounded-xl border border-border bg-card p-4 text-sm">{`y = x^2 + k
y = 2x`}</pre>

          <h2 className="text-2xl font-semibold">Statistics in one line: mean, median, stdev</h2>
          <p>
            Type your data as a list and call the built-in functions:
          </p>
          <pre className="rounded-xl border border-border bg-card p-4 text-sm">{`L = [4, 7, 7, 9, 12]
mean(L)
median(L)
stdev(L)
total(L)`}</pre>
          <p>
            For "how does adding a new value change the mean?" questions, just append the
            value to the list and re-read <code>mean(L)</code>.
          </p>

          <h2 className="text-2xl font-semibold">Inequalities and shaded regions</h2>
          <p>
            Type the inequality exactly — <code>y &lt; 2x + 1</code> — and Desmos shades the
            solution region. For systems of inequalities, type each on its own line and
            look at the overlap. Perfect for "which point is a solution?" questions: type
            each candidate point and see which falls in the shaded region.
          </p>

          <h2 className="text-2xl font-semibold">Function transformations at a glance</h2>
          <p>
            For questions like "if <em>g(x) = f(x - 3) + 2</em>, which graph represents
            <em>g</em>?", type both:
          </p>
          <pre className="rounded-xl border border-border bg-card p-4 text-sm">{`f(x) = x^2
g(x) = f(x - 3) + 2`}</pre>
          <p>
            Desmos draws both — match the shifted curve against the answer choices.
          </p>

          <h2 className="text-2xl font-semibold">Timing rules: when to skip Desmos</h2>
          <ul className="list-disc pl-6">
            <li>Pure arithmetic and unit conversion — mental math is faster.</li>
            <li>Single-variable linear equations (<code>3x + 5 = 20</code>) — one step in your head.</li>
            <li>Geometry diagrams with given numerical lengths — use the figure, not Desmos.</li>
            <li>Anything where typing the equation would take longer than the algebra.</li>
          </ul>
          <p>
            Rule of thumb: if a problem would take more than ~45 seconds by hand, try
            Desmos. If you can solve it in two clean lines of algebra, do that.
          </p>

          <h2 className="text-2xl font-semibold">Keyboard shortcuts worth memorizing</h2>
          <ul className="list-disc pl-6">
            <li><code>^</code> — exponent (jumps into superscript; arrow-right to leave).</li>
            <li><code>/</code> — fraction (numerator first, then arrow-down to denominator).</li>
            <li><code>sqrt</code> — square root.</li>
            <li><code>pi</code> — π. <code>theta</code> — θ.</li>
            <li><code>{`{`}</code> — piecewise/conditional (e.g. <code>{`y = {x > 0: x^2, -x}`}</code>).</li>
          </ul>

          <h2 className="text-2xl font-semibold">Practice these on real Digital SAT tests</h2>
          <p>
            Theory only takes you so far. Run these hacks against the official Bluebook
            practice tests — every Math problem becomes a chance to decide "Desmos or
            algebra?" and build the instinct.
          </p>

          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>

          <h3 className="text-xl font-semibold">Is Desmos allowed on the Digital SAT?</h3>
          <p>Yes — it's built into the Bluebook app and available on every Math question.</p>

          <h3 className="text-xl font-semibold">Do I need to bring my own calculator?</h3>
          <p>
            No, but you may. Bringing an approved physical calculator as a backup is fine;
            most students still use Desmos because it's faster for graphing.
          </p>

          <h3 className="text-xl font-semibold">Will Desmos solve every SAT Math problem?</h3>
          <p>
            No — pure arithmetic, simple linear equations, and some geometry problems are
            faster by hand. Desmos shines on systems, quadratics, statistics, inequalities,
            and parameter (slider) questions.
          </p>
        </section>

        <aside className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Get the full Digital SAT roadmap</h2>
          <p className="mt-2 text-muted-foreground">
            Pair these Desmos hacks with our complete Digital SAT prep guide — structure,
            study plan, and section-by-section strategies.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/digital-sat-practice-test"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-glow hover:bg-primary/90"
            >
              Digital SAT Practice Test Guide
            </Link>
            <Link
              to="/"
              className="inline-block rounded-xl border border-border px-5 py-2.5 font-semibold text-foreground hover:bg-accent"
            >
              Go to EduSat
            </Link>
          </div>
        </aside>
      </article>
    </main>
  );
};

export default DesmosSatMathHacks;

import { useState } from "react";
import DecryptedText from "./DecryptedText";

function MainCard() {
  const [headerDone, setHeaderDone] = useState(false);

  return (
    <>
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
        <div
          className="relative z-10 w-full flex flex-col items-center text-center pb-16 md:pb-32 lg:items-start lg:text-left lg:w-1/2 lg:pb-0"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <h1
            className="text-5xl lg:text-6xl font-extrabold mb-2 smooth-element"
            style={{
              textShadow: "rgba(255,255,255,0.2) 0px 0px 20px",
              willChange: "transform, opacity",
              opacity: 1,
              transform: "none",
            }}
          >
            <DecryptedText
              text="Unlock Smarter Investing..."
              speed={40}
              sequential
              revealDirection="start"
              animateOn="view"
              className="text-white"
              encryptedClassName="text-[#00ffe7] opacity-70"
              parentClassName="font-mono"
              maxIterations={12}
              useOriginalCharsOnly={false}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              onAnimationEnd={() => setHeaderDone(true)}
            />
          </h1>
          <h2
            className="text-5xl lg:text-6xl font-extrabold mb-2 smooth-element"
            style={{
              color: "#FFD052",
              textShadow: "rgba(255,207,82,0.3) 0px 0px 20px",
              willChange: "transform, opacity",
              opacity: 1,
              transform: "none",
            }}
          >
            {headerDone && (
              <DecryptedText
                text="For the world."
                speed={18}
                sequential
                revealDirection="start"
                animateOn="view"
                className="text-[#FFD052]"
                encryptedClassName="text-[#00ffe7] opacity-70"
                parentClassName="font-mono"
                maxIterations={14}
                useOriginalCharsOnly={false}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              />
            )}
          </h2>
          <p
            className="mt-6 text-lg lg:text-lg max-w-xl smooth-element"
            style={{
              color: "#FFFFFF",
              willChange: "transform, opacity, filter",
              opacity: 1,
              filter: "blur(0px)",
              transform: "none",
            }}
          >
            Leverage our AI for technical analysis, real-time news, and actionable predictions—all in one easy-to-digest platform.
          </p>
          <div className="flex flex-col md:flex-row lg:justify-start md:justify-center items-center gap-4 mt-8">
            <a
              className="block px-6 py-3 rounded-lg text-sm font-semibold border border-[#00FFFF] text-[#00FFFF] shadow-md transition-all duration-300 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,188,212,0.5)]"
              href="/signup"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainCard;
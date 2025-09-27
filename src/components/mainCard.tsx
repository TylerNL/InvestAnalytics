import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import DecryptedText from "./DecryptedText";

function MainCard() {
  const [headerDone, setHeaderDone] = useState(false);
  const {session} = UserAuth() || {};
  

  return (
    <>
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-transparent">
        <div
          className="relative z-10 w-full flex flex-col items-center text-center pb-16 md:pb-32 lg:items-start lg:text-left lg:w-1/2 lg:pb-0 px-8"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <h1
            className="text-5xl lg:text-7xl font-extrabold mb-4 smooth-element mt-20"
            style={{
              textShadow: "rgba(255,255,255,0.3) 0px 0px 30px",
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
              encryptedClassName="text-primary-400 opacity-70"
              parentClassName="font-mono"
              maxIterations={12}
              useOriginalCharsOnly={false}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              onAnimationEnd={() => setHeaderDone(true)}
            />
          </h1>
          <h2
            className="text-5xl lg:text-7xl font-extrabold mb-6 smooth-element"
            style={{
              color: "#FFD700",
              textShadow: "rgba(255,215,0,0.4) 0px 0px 30px",
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
                className="text-accent-400"
                encryptedClassName="text-primary-400 opacity-70"
                parentClassName="font-mono"
                maxIterations={14}
                useOriginalCharsOnly={false}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              />
            )}
          </h2>
          <p
            className="mt-8 text-xl lg:text-2xl max-w-2xl smooth-element leading-relaxed"
            style={{
              color: "#E5E7EB",
              willChange: "transform, opacity, filter",
              opacity: 1,
              filter: "blur(0px)",
              transform: "none",
            }}
          >
            Leverage our AI for technical analysis, real-time news, and actionable predictions—all in one easy-to-digest platform.
          </p>
          {!session ? (
            <div className="flex flex-col sm:flex-row lg:justify-start sm:justify-center items-center gap-6 mt-12">
              <a
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105 border border-primary-400/50"
                href="/signup"
              >
                <span className="flex items-center gap-2">
                  Sign Up Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </a>
              <a
                className="px-8 py-4 border-2 border-accent-400 text-accent-400 font-bold text-lg rounded-xl hover:bg-accent-400 hover:text-black transition-all duration-300 backdrop-blur-sm"
                href="/news"
              >
                Learn More
              </a>
            </div>
          ) : (
            <div className="mt-12">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <p className="text-white text-lg font-semibold">Welcome back! Ready to explore the markets?</p>
                <div className="flex gap-4 mt-4">
                  <a href="/watchlist" className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                    My Watchlist
                  </a>
                  <a href="/news" className="px-6 py-2 border border-accent-400 text-accent-400 rounded-lg hover:bg-accent-400 hover:text-black transition-colors">
                    Latest News
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MainCard;
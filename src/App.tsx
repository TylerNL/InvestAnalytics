import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import MainCard from "./mainCard.tsx";
import Watchlist from "./Watchlist.tsx";
import News from "./News.tsx";
import InfiniteTickerScroll from "./InfiniteTickers.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <>
      {/* SVG neural network background */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#00ffe7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10131a" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#glow)" />
        <g stroke="#00ffe7" strokeOpacity="0.18">
          <circle cx="8%" cy="20%" r="2.5" fill="#00ffe7" />
          <circle cx="92%" cy="80%" r="2.5" fill="#00ffe7" />
          <circle cx="50%" cy="50%" r="3.5" fill="#00ffe7" />
          <circle cx="30%" cy="70%" r="2" fill="#00ffe7" />
          <circle cx="70%" cy="30%" r="2" fill="#00ffe7" />
          <line x1="8%" y1="20%" x2="50%" y2="50%" />
          <line x1="50%" y1="50%" x2="92%" y2="80%" />
          <line x1="30%" y1="70%" x2="70%" y2="30%" />
          <line x1="8%" y1="20%" x2="70%" y2="30%" />
          <line x1="30%" y1="70%" x2="92%" y2="80%" />
        </g>
      </svg>
      <MainCard />
      <section className="min-h-[15vh] flex items-center justify-center w-full">
        <div className="text-white text-2xl"></div>
        <div className="w-full bg-black py-6 flex flex-col items-center justify-center">
          <p className="text-white text-2xl mb-4 smooth-element">Stay Up to Date With The Hottest Companies</p>
          <InfiniteTickerScroll />
        </div>
      </section>
      <section className="min-h-screen flex items-center justify-center"></section>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Watchlist" element={<Watchlist />} />
            <Route path="/News" element={<News />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

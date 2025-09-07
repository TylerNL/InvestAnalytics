import Header from "./Header";
import Footer from "./Footer";
import MainCard from "./mainCard";
import Watchlist from "./Watchlist";
import News from "./News";
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import InfiniteTickerScroll from "./InfiniteTickers";
import predict_img from "../assets/predicpng.png"
import updates_img from "../assets/updatespng.png"
import news_img from "../assets/recentnewsspng.png"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

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
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-full bg-black py-6 flex flex-col items-center justify-start">
          <h2 className="pl-4 text-3xl font-bold text-white py-3 mb-4">What Do We Offer?</h2>
          <div className="grid md:grid-cols-3 gap-8">

              {/* Predictions col*/}
              <div className="feature-card text-center">
                <div className="icon-container bg-white rounded-full shadow-md flex items-center justify-center mx-auto w-24 h-24 mb-6">
                  <img src={predict_img} alt="Predictions" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Market Predictions</h3>
                <p className="text-white text-med leading-relaxed smooth-element">Through the power of the Invest Analytics software system, we provide you with up-to-date, AI-powered predictions for how the price of any stock or cryptocurrency will change in the near future.</p>
              </div>

              {/* Personalized Updates col*/}
              <div className="feature-card text-center">
                <div className="icon-container bg-white rounded-full shadow-md flex items-center justify-center mx-auto w-24 h-24 mb-6">
                  <img src={updates_img} alt = "Personalized_Updates" className="w-full h-full object-cover rounded-full"></img>
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Personalized Updates</h3>
                <p className="text-white text-med leading-relaxed smooth-element">Get personalized email updates based on the stocks and cryptocurrencies in your watchlist and we'll let you notify you on custom percent drops/rises in your watchlist.</p>
              </div>

              {/* Recent News */}
              <div className="feature-card text-center">
                <div className="icon-container bg-white rounded-full shadow-md flex items-center justify-center mx-auto w-24 h-24 mb-6">
                  <img src={news_img} alt = "Customized and Real-time News" className="w-full h-full object-cover rounded-full"></img>
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Recent News</h3>
                <p className="text-white text-med leading-relaxed smooth-element">Stay ahead of market movements with real-time news updates tailored to your investment portfolio. Our intelligent news aggregation system filters through thousands of financial headlines to bring you only the most relevant stories affecting your watchlisted stocks and cryptocurrencies.</p>
              </div>
              
              </div>
          </div>
      </section>

      <section className="min-h-screen flex items-center justify-center"/>
    </>
  );
}

function App() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/news" element={<News />} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

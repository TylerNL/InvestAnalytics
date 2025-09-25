import MainCard from "./mainCard";
import InfiniteTickerScroll from "./InfiniteTickers";
import predict_img from "../assets/predicpng.png";
import updates_img from "../assets/updatespng.png";
import news_img from "../assets/recentnewsspng.png";
import background_img from "../assets/home_background.png"

function Home() {
  
  return (
    <>
      {/* Enhanced SVG neural network background */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#00ffe7" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#1a1a2e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0f0f1a" stopOpacity="0.95" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="1.5"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#glow)" />
        <g stroke="#00ffe7" strokeOpacity="0.15" filter="url(#blur)">
          <circle cx="8%" cy="20%" r="2.5" fill="#00ffe7" fillOpacity="0.6" />
          <circle cx="92%" cy="80%" r="2.5" fill="#00ffe7" fillOpacity="0.6" />
          <circle cx="50%" cy="50%" r="3.5" fill="#00ffe7" fillOpacity="0.8" />
          <circle cx="30%" cy="70%" r="2" fill="#00ffe7" fillOpacity="0.5" />
          <circle cx="70%" cy="30%" r="2" fill="#00ffe7" fillOpacity="0.5" />
          <line x1="8%" y1="20%" x2="50%" y2="50%" strokeWidth="1.5" />
          <line x1="50%" y1="50%" x2="92%" y2="80%" strokeWidth="1.5" />
          <line x1="30%" y1="70%" x2="70%" y2="30%" strokeWidth="1" />
          <line x1="8%" y1="20%" x2="70%" y2="30%" strokeWidth="1" />
          <line x1="30%" y1="70%" x2="92%" y2="80%" strokeWidth="1" />
          <line x1="70%" y1="30%" x2="92%" y2="80%" strokeWidth="1" />
          <line x1="8%" y1="20%" x2="30%" y2="70%" strokeWidth="1" />
        </g>
        <circle r="3" fill="white" fillOpacity="0.9">
          <animate
            attributeName="cx"
            values="8%;50%;92%;70%;30%;8%"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="20%;50%;80%;30%;70%;20%"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>

        <circle r="2.5" fill="#00ffe7" fillOpacity="0.7">
          <animate
            attributeName="cx"
            values="8%;50%;92%;70%;30%;8%"
            dur="15s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="20%;50%;80%;30%;70%;20%"
            dur="15s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      
      {/* Hero Section */}
      {/* Hero Section */}
      <MainCard />
      
      {/* AI Prediction Feature Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black opacity-95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${background_img})` }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                A breakthrough in{" "}
                <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  AI prediction technology
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                We have developed an innovative method of analyzing news, market histories, and popular sentiment to determine how prices can change in the future. Get future outlooks for the markets that interest you most.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
                <button className="px-8 py-4 border-2 border-accent-400 text-accent-400 font-semibold rounded-xl hover:bg-accent-400 hover:text-black transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">↗</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">TSLA Prediction</p>
                      <p className="text-green-400 text-sm">+15.2% (7 days)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">₿</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">BTC Analysis</p>
                      <p className="text-blue-400 text-sm">High confidence</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Market Insights</p>
                      <p className="text-purple-400 text-sm">Real-time updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Ticker Section */}
      <section className="relative py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Stay Up to Date With The{" "}
              <span className="bg-gradient-to-r from-accent-400 to-orange-400 bg-clip-text text-transparent">
                Hottest Companies
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Track real-time performance of the world's most valuable stocks and cryptocurrencies
            </p>
          </div>
          <div>
            <InfiniteTickerScroll />
          </div>
        </div>
      </section>

    {/* How We Predict Section */}
    <section className="relative py-24 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,231,0.05),transparent_70%)]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            How do we{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              predict?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered system analyzes multiple data sources to provide you with the most accurate market predictions
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 animate-fadeInUp">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-primary-300 transition-colors">Recent News</h3>
            <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
              Through deep searching, Invest Analytics analyzes recent news from
              around the world relating to the stock or cryptocurrency in question
              and evaluates how it could change its price in the near future.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 animate-fadeInUp [animation-delay:200ms]">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-primary-300 transition-colors">Social Media</h3>
            <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
              In this day and age, the world's fastest method of spreading
              information is social media. Using our methods of deep searching, we
              analyze posts for public sentiment and understand how it can guide
              the best decisions possible.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 animate-fadeInUp [animation-delay:400ms]">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-primary-300 transition-colors">Past Prices</h3>
            <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
              Some of the best information about the future can be found in the
              past. Our AI model uses historical market prices for each stock and
              cryptocurrency to create the most accurate predictions possible.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* What We Offer Section */}
      <section className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.05),transparent_70%)]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Do We{" "}
              <span className="bg-gradient-to-r from-accent-400 to-yellow-400 bg-clip-text text-transparent">
                Offer?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and insights to empower your investment decisions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Market Predictions */}
            <div className="group text-center animate-fadeInUp">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative w-32 h-32 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                  <img src={predict_img} alt="Predictions" className="w-20 h-20 object-cover rounded-full filter brightness-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-primary-300 transition-colors">
                Market Predictions
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                Through the power of the Invest Analytics software system, we provide you with up-to-date, AI-powered predictions for how the price of any stock or cryptocurrency will change in the near future.
              </p>
            </div>

            {/* Personalized Updates */}
            <div className="group text-center animate-fadeInUp [animation-delay:200ms]">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                  <img src={updates_img} alt="Personalized Updates" className="w-20 h-20 object-cover rounded-full filter brightness-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-purple-300 transition-colors">
                Personalized Updates
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                Get personalized email updates based on the stocks and cryptocurrencies in your watchlist and we'll notify you on custom percent drops/rises in your watchlist.
              </p>
            </div>

            {/* Recent News */}
            <div className="group text-center animate-fadeInUp [animation-delay:400ms]">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                  <img src={news_img} alt="Recent News" className="w-20 h-20 object-cover rounded-full filter brightness-110" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-orange-300 transition-colors">
                Recent News
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
                Stay ahead of market movements with real-time news updates tailored to your investment portfolio. Our intelligent news aggregation system filters through thousands of financial headlines to bring you only the most relevant stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,231,0.08),transparent_70%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Ready to Start{" "}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Smart Investing?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of investors who are already using our AI-powered platform to make smarter investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/signup"
                className="px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </a>
              <a
                href="/news"
                className="px-10 py-4 border-2 border-accent-400 text-accent-400 font-bold text-lg rounded-xl hover:bg-accent-400 hover:text-black transition-all duration-300"
              >
                View Latest News
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
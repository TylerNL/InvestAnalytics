import MainCard from "./mainCard";
import InfiniteTickerScroll from "./InfiniteTickers";
import predict_img from "../assets/predicpng.png";
import updates_img from "../assets/updatespng.png";
import news_img from "../assets/recentnewsspng.png";
import background_img from "../assets/home_background.png"

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
          <line x1="70%" y1="30%" x2="92%" y2="80%" />
          <line x1="8%" y1="20%" x2="30%" y2="70%" />
        </g>
        <circle r="4" fill="white">
          <animate
            attributeName="cx"
            values="8%;50%;92%;70%;30%;8%"
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="20%;50%;80%;30%;70%;20%"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        <circle r="4" fill="white">
          <animate
            attributeName="cx"
            values="8%;50%;92%;70%;30%;8%"
            dur="10s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="20%;50%;80%;30%;70%;20%"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>

      </svg>
      <MainCard />
      <div>
        
      </div>
      <div
      className="w-screen h-[90vh] bg-cover bg-center mt-[20vh]"
      style={{ backgroundImage: `url(${background_img})`}}
      >
        <div className="flex h-full
        items-start justify-center 
        2xl:items-center 2xl:justify-end 2xl: mr-[10vh]
        p-8">
        <div>
          <h1 className="text-white text-4xl max-w-lg mb-5">
            A breakthrough in AI prediction technology allowing for future outlooks for the markets that interest you
          </h1>
          <p className="max-w-md">We have developed an innovative method of analyzing news, market histories, and popular sentiment to determine how prices can change in the future. </p>
        </div>
      </div>
    </div>

      <div className="w-full bg-black py-6 flex flex-col items-center justify-center">
          <p className="text-white text-2xl mb-4 smooth-element">Stay Up to Date With The Hottest Companies</p>
          <InfiniteTickerScroll />
      </div>

    <section className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#0f2a2f] to-[#2f4d3b] px-8 py-24">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-white mb-16 text-center">
          How do we predict?
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent News</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Through deep searching, Invest Analytics analyzes recent news from
              around the world relating to the stock or cryptocurrency in question
              and evaluates how it could change its price in the near future.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Social Media</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              In this day and age, the world's fastest method of spreading
              information is social media. Using our methods of deep searching, we
              analyze posts for public sentiment and understand how it can guide
              the best decisions possible.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Past Prices</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Some of the best information about the future can be found in the
              past. Our AI model uses historical market prices for each stock and
              cryptocurrency to create the most accurate predictions possible.
            </p>
          </div>
        </div>
      </div>
    </section>

      <section className="flex items-center justify-center">
        <div className="w-full bg-black py-10 flex flex-col items-center justify-start">
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

      <section className="min-h-screen flex items-center justify-center"> </section>

        
      
    </>
  );
}

export default Home;
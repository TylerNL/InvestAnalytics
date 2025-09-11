import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../context/supabaseClient";

const backgroundSVG = (
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
);

const Watchlist = () => {
  const {session} = UserAuth() || {};
  const [watchListItems, setWatchListItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeFromWatchlist = async (itemId) => {
    if (!session) return;
    
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('id', itemId)
        .eq('user_id', session.user.id);
        
      if (error) {
        console.error('Error removing item:', error);
      } else {
        // Update state to remove the item
        setWatchListItems(watchListItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', session.user.id);

        if (error) {
          console.error('Error fetching watchlist:', error);
        } else {
          setWatchListItems(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [session]);

    const authenticatedContent = (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 mt-14 text-white">Your Watchlist</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-pulse text-cyan-400">Loading watchlist...</div>
        </div>
      ) : watchListItems.length > 0 ? (
      
      <div>
      {/* Add watchlist design here*/}
      </div>
      ) : (
        <div className="bg-black bg-opacity-80 rounded-xl p-8 text-center">
          <p className="text-white mb-4">Your watchlist is empty. Add some stocks or cryptocurrencies to track!</p>
          <button className="px-6 py-3 rounded-lg text-sm font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-all">
            Add Ticker
          </button>
        </div>
      )}
    </div>
  );

  const unauthenticatedContent = (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black bg-opacity-80 rounded-xl shadow-lg p-8 text-white max-w-2xl w-full z-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Create your own personalized watchlist with your InvestAnalytics account now!</h1>
            <p className="text-center mb-4">Through our AI-powered prediction services, a watchlist with InvestAnalytics will allow you to view the prices of stocks and currencies that are important to you. </p>
            <div className="flex justify-center">
              <a
                className="block px-6 py-3 rounded-lg text-sm font-semibold border border-[#00FFFF] text-[#00FFFF] shadow-md transition-all duration-300 hover:bg-[#00FFFF] hover:text-black hover:shadow-[0_0_20px_rgba(0,188,212,0.5)]"
                href="/signin"
              >
                Sign In Now
              </a>
            </div>
          </div>
        </div>
  );

  return (
    <>
    {backgroundSVG}
    {session ? authenticatedContent : unauthenticatedContent}
    </>
  );
};


export default Watchlist;

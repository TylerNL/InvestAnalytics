import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../context/supabaseClient";

const backgroundSVG = (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#00ffe7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#glow)" />
      <g stroke="#00ffe7" strokeOpacity="0.3">
        <circle cx="8%" cy="20%" r="2.5" fill="#00ffe7" fillOpacity="0.6" />
        <circle cx="92%" cy="80%" r="2.5" fill="#00ffe7" fillOpacity="0.6" />
        <circle cx="50%" cy="50%" r="3.5" fill="#00ffe7" fillOpacity="0.6" />
        <circle cx="30%" cy="70%" r="2" fill="#00ffe7" fillOpacity="0.6" />
        <circle cx="70%" cy="30%" r="2" fill="#00ffe7" fillOpacity="0.6" />
        <line x1="8%" y1="20%" x2="50%" y2="50%" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="92%" y2="80%" strokeWidth="1" />
        <line x1="30%" y1="70%" x2="70%" y2="30%" strokeWidth="1" />
        <line x1="8%" y1="20%" x2="70%" y2="30%" strokeWidth="1" />
        <line x1="30%" y1="70%" x2="92%" y2="80%" strokeWidth="1" />
      </g>
    </svg>
);


const CurrencyDetail = () => {
    const { ticker } = useParams();
    const navigate = useNavigate();
    const { session } = UserAuth() || {};
    const polygonAPI = import.meta.env.VITE_POLYGON_API_KEY;

    const [loading, setLoading] = useState(true);
    const [addingToWatchList, setAddingToWatchlist] = useState(false);
    const [currencyData, setCurrencyData] = useState(null);
    const [livePrice, setLivePrice] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [priceChange, setPriceChange] = useState({ amount: 0, percentage: 0 });
    const cryptoCoins = [
        'BTC', 'ETH', 'XRP', 'HBAR', 'SOL', 'DOGE', 'ADA'
    ];

    useEffect(() => {
        const fetchPrediction = async () => {
            try {
                let upperSymbol = ticker?.toUpperCase();
                if(cryptoCoins.includes(upperSymbol))
                    upperSymbol += "-USD";
                const predictionRes = await fetch(`/api/predictions?symbol=${upperSymbol}`);

                if (!predictionRes.ok) {
                    throw new Error(`status: ${predictionRes.status}`);
                }

                const predictionData = await predictionRes.json();
                setCurrencyData(predictionData);
                
                console.log('Full API response:', predictionData);
                console.log('Outlook value:', predictionData?.info?.outlook);
                console.log('Outlook type:', typeof predictionData?.info?.outlook);
                
                if (session) {

                    const { data } = await supabase
                        .from('watchlist')
                        .select('*')
                        .eq('user_id', session.user.id)
                        .eq('symbol', upperSymbol);
                    setIsInWatchlist(data && data.length > 0);
                    console.log("User currently signed in.");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("Error fetching data.");
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [ticker, session]);

    // TradingView Widget Effect
    useEffect(() => {
        if (!ticker || loading) return;


        const getTradingViewCrypto = (symbol: string) => {
            const upperSymbol = symbol.toUpperCase();
            if (cryptoCoins.includes(upperSymbol)) {
                return `${upperSymbol}USD`;
            }
            return upperSymbol;
        }

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        
        const widgetConfig = {
            autosize: true,
            symbol: `${getTradingViewCrypto(ticker)}`,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            backgroundColor: "rgba(19, 23, 34, 1)",
            gridColor: "rgba(42, 46, 57, 0.5)",
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            container_id: "tradingview-widget"
        };

        script.innerHTML = JSON.stringify(widgetConfig);

        const container = document.getElementById('tradingview-widget');
        if (container) {
            container.innerHTML = '';
            container.appendChild(script);
        }

        // Cleanup function
        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [ticker, loading]);
    

    const handleAddToWatchlist = async () => {
        if (!session) {
            navigate('/signup');
            return;
        }
        
        setAddingToWatchlist(true);
        try {
            const currentPrice = livePrice || getCurrentPrice();
            let upperSymbol = ticker?.toUpperCase();
            if(cryptoCoins.includes(upperSymbol))
                upperSymbol += '-USD';
            const { error } = await supabase
                .from('watchlist')
                .insert([{
                    user_id: session.user.id,
                    symbol: upperSymbol,
                    current_price: currentPrice,
                    price_change: priceChange.percentage
                }]);
                
            if (error) throw error;
            setIsInWatchlist(true);
        } catch (err) {
            console.error('Error adding to watchlist:', err);
        } finally {
            setAddingToWatchlist(false);
        }
    };

    const handleRemoveFromWatchlist = async () => {
        if (!session) return;
        
        let upperSymbol = ticker?.toUpperCase();
        if(cryptoCoins.includes(upperSymbol))
            upperSymbol += '-USD';
        setAddingToWatchlist(true);
        try {
            const { error } = await supabase
                .from('watchlist')
                .delete()
                .eq('user_id', session.user.id)
                .eq('symbol', upperSymbol);
                
            if (error) throw error;
            setIsInWatchlist(false);
        } catch (err) {
            console.error('Error removing from watchlist:', err);
        } finally {
            setAddingToWatchlist(false);
        }
    };

    const getCurrentPrice = () => {
        if (!currencyData?.prices) return 0;
        const latestDate = Object.keys(currencyData.prices).sort().pop();
        return currencyData.prices[latestDate]?.[2] || 0; // Close price
    };

    const getLatestPrices = () => {
        if (!currencyData?.prices) return { high: 0, low: 0, close: 0 };
        const latestDate = Object.keys(currencyData.prices).sort().pop();
        const prices = currencyData.prices[latestDate];
        return {
            high: prices?.[1] || 0,
            low: prices?.[2] || 0,
            close: prices?.[0] || 0
        };
    };

    if (error) {
        return (
            <div className="min-h-screen bg-black pt-24 p-6 text-white flex justify-center items-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-24 p-6 text-white flex justify-center items-start">
                <div className="animate-pulse text-yellow-400 text-xl">Loading {ticker} data...</div>
            </div>
        );
    }

    const latestPrices = getLatestPrices();
    const displayPrice = livePrice || latestPrices.close;

    return (
        <div className="min-h-screen pt-24 p-6 text-white relative overflow-hidden" style={{ background: '#000000' }}>
            {backgroundSVG}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                    <div className="mb-4 lg:mb-0">
                        <h1 className="text-4xl font-bold text-yellow-400 mb-2">{ticker?.toUpperCase()}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-mono text-white">
                                ${displayPrice.toFixed(2)}
                            </span>
                            <div className={`flex items-center space-x-1 ${priceChange.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                <span className="text-lg">
                                    {priceChange.amount >= 0 ? '▲' : '▼'}
                                </span>
                                <span className="text-lg font-medium">
                                    ${Math.abs(priceChange.amount).toFixed(2)} ({Math.abs(priceChange.percentage).toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Watchlist Button */}
                    {isInWatchlist ? (
                        <button
                            onClick={handleRemoveFromWatchlist}
                            disabled={addingToWatchList}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{addingToWatchList ? 'Removing...' : 'Remove from Watchlist'}</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToWatchlist}
                            disabled={addingToWatchList}
                            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span>
                                {addingToWatchList ? 'Adding...' : session ? 'Add to Watchlist' : 'Sign Up to Track'}
                            </span>
                        </button>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* TradingView Chart*/}
                    <div className="xl:col-span-2">
                        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
                            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Interactive Chart</h2>
                            <div className="tradingview-widget-container" style={{ height: '500px' }}>
                                <div id="tradingview-widget" style={{ height: '100%', width: '100%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Price Info and Prediction  */}
                    <div className="space-y-6">
                        {/* Current Price Info */}
                        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
                            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Price Information</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-sm text-gray-400">Current</div>
                                        <div className="text-xl font-mono">${displayPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-sm text-gray-400">High</div>
                                        <div className="text-xl font-mono">${latestPrices.high.toFixed(2)}</div>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-sm text-gray-400">Low</div>
                                        <div className="text-xl font-mono">${latestPrices.low.toFixed(2)}</div>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="text-sm text-gray-400">Volume</div>
                                        <div className="text-xl">N/A</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Prediction */}
                        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
                            <h2 className="text-xl font-semibold mb-4 text-yellow-400">AI Prediction</h2>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className={`text-2xl font-bold mb-2 ${
                                        String(currencyData?.info?.outlook || '').toLowerCase() === 'raise' ? 'text-green-400' :
                                        String(currencyData?.info?.outlook || '').toLowerCase() === 'drop' ? 'text-red-400' : 'text-gray-400'
                                    }`}>
                                        {String(currencyData?.info?.outlook || 'stable').toUpperCase()}
                                    </div>
                                    <div className="text-gray-400 text-sm">Market Outlook</div>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-400">Confidence</span>
                                        <span className="text-sm font-medium">{currencyData?.info?.confidence || 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div 
                                            className="bg-yellow-500 h-3 rounded-full transition-all duration-300" 
                                            style={{ width: `${currencyData?.info?.confidence || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <h4 className="text-sm font-semibold mb-2 text-yellow-400">Analysis</h4>
                                    <p className="text-sm text-gray-300">
                                        {currencyData?.info?.reasoning || "Our AI analyzes market trends, sentiment, and technical indicators to provide predictions."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Predictions Timeline */}
                {currencyData?.prices && (
                    <div className="mt-8">
                        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
                            <h2 className="text-xl font-semibold mb-6 text-yellow-400">Price Predictions & History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="text-left py-3 px-4 text-gray-400">Date</th>
                                            <th className="text-left py-3 px-4 text-gray-400">High</th>
                                            <th className="text-left py-3 px-4 text-gray-400">Low</th>
                                            <th className="text-left py-3 px-4 text-gray-400">Close</th>
                                            <th className="text-left py-3 px-4 text-gray-400">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(currencyData.prices)
                                            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                                            .slice(0, 10)
                                            .map(([date, values]) => {
                                                const isPrediction = new Date(date) > new Date();
                                                return (
                                                    <tr key={date} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                                        <td className="py-3 px-4">{new Date(date).toLocaleDateString()}</td>
                                                        <td className="py-3 px-4 font-mono">${values[1]?.toFixed(2)}</td>
                                                        <td className="py-3 px-4 font-mono">${values[2]?.toFixed(2)}</td>
                                                        <td className="py-3 px-4 font-mono">${values[0]?.toFixed(2)}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-2 py-1 rounded text-xs ${
                                                                isPrediction 
                                                                    ? 'bg-yellow-500 text-black' 
                                                                    : 'bg-gray-700 text-gray-300'
                                                            }`}>
                                                                {isPrediction ? 'Prediction' : 'Historical'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default CurrencyDetail;
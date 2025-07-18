import { useState } from "react";

const Header = () => {
    const tickers = [
    'Apple (AAPL)', 
    'Google (GOOGL)', 
    'Amazon (AMZN)', 
    'Bitcoin (BTC)', 
    'Tesla (TSLA)',
    'Microsoft (MSFT)',
    'Meta (META)',
    'Netflix (NFLX)',
    'Nvidia (NVDA)',
    'Ethereum (ETH)',
    'Spotify (SPOT)',
    'Disney (DIS)',
    'Coca-Cola (KO)',
    'McDonald\'s (MCD)',
    'Visa (V)',
    'Johnson & Johnson (JNJ)',
    'Walmart (WMT)',
    'Intel (INTC)',
    'Adobe (ADBE)',
    'Salesforce (CRM)'
    ];

    const [tickersData] = useState(tickers);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputFocus, setInputFocus] = useState(false);
    
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const tickersDataFiltered = tickersData.filter((tickers) => 
        tickers.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    ); 

    return (
        <nav className="fixed top-6 right-8 flex space-x-4 z-50">
            <a href="/">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">Home</button>
            </a>
            <div className="relative overflow-y-auto h-64">
                <input className="relative rounded text-base text-md font-medium px-4 py-2 transition-all" type="text" placeholder="Search for stocks or cryptocurrencies" 
                onChange={handleInputChange}
                onFocus={()=> setInputFocus(true)}
                onBlur={() => setTimeout(() => setInputFocus(false), 150)}
                value={searchTerm}
                />
                {inputFocus && (
                    <div className="absolute left-0 mt-2 bg-black shadow-lg rounded w-full z-50 p-2">
                        {tickersDataFiltered.length > 0 ? (
                            tickersDataFiltered.map((ticker) => (
                                <p key={ticker} className="cursor-pointer hover:bg-yellow-500 px-2 py-1 rounded"
                                onClick={() => {
                                    setSearchTerm(ticker)
                                    setInputFocus(false);
                                }}>
                                    {ticker}
                                </p>
                            ))
                        ) : (
                            <p className="text-white px-2 py-1">No results</p>
                        )}
                    </div>
                )}
            </div>
            <a href="/Watchlist">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">My Watchlist</button>
            </a>
            <a href="/News">
                <button className="relative text-base text-md font-medium transition-all duration-300 px-4 py-2 rounded bg-[var(--accent-gold)] text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md">Recent News</button>
            </a>
        </nav>
    );
}

export default Header
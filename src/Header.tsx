import { useState } from "react";
import IA_LOGO from "./assets/IA_LOGO.ico"


const Header = () => {
    const tickers = [
        'Apple (AAPL)', 'Google (GOOGL)', 'Amazon (AMZN)', 'Bitcoin (BTC)', 'Tesla (TSLA)',
        'Microsoft (MSFT)', 'Meta (META)', 'Netflix (NFLX)', 'Nvidia (NVDA)', 'Ethereum (ETH)',
        'Spotify (SPOT)', 'Disney (DIS)', 'Coca-Cola (KO)', "McDonald's (MCD)", 'Visa (V)',
        'Johnson & Johnson (JNJ)', 'Walmart (WMT)', 'Intel (INTC)', 'Adobe (ADBE)', 'Salesforce (CRM)'
    ];

    const [tickersData] = useState(tickers);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputFocus, setInputFocus] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleInputChange = (e) => setSearchTerm(e.target.value);

    const tickersDataFiltered = tickersData.filter((ticker) =>
        ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
            style={{
                background: "rgba(1, 8, 10, 0.92)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                color: "var(--foreground)"
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <a className="text-xl font-bold flex items-center gap-2" href="/">
                    <img
                        alt="Logo"
                        src={IA_LOGO}
                        width={45}
                        height={45}
                        style={{ color: "transparent" }}
                        className="rounded"
                    />
                    <span className="hidden sm:inline text-white">InvestAnalytics</span>
                </a>

                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink href="/" text="Home" accent />
                    <NavLink href="/Watchlist" text="Watchlist" />
                    <NavLink href="/News" text="Recent News" />
                    <div className="relative w-64">
                        <input
                            className="w-full rounded text-base px-4 py-2 bg-gray-900 text-white border border-gray-700 focus:border-yellow-400 transition-all"
                            type="text"
                            placeholder="Search stocks/crypto"
                            onChange={handleInputChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setTimeout(() => setInputFocus(false), 150)}
                            value={searchTerm}
                        />
                        {inputFocus && (
                            <div className="absolute left-0 mt-2 bg-black shadow-lg rounded w-full z-50 p-2 max-h-48 overflow-y-auto">
                                {tickersDataFiltered.length > 0 ? (
                                    tickersDataFiltered.map((ticker) => (
                                        <p key={ticker} className="cursor-pointer hover:bg-yellow-500 px-2 py-1 rounded"
                                            onClick={() => {
                                                setSearchTerm(ticker);
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
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h24" /><path d="M4 20h24" /><path d="M4 6h24" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="md:hidden bg-black bg-opacity-95 px-6 py-4 flex flex-col space-y-4">
                    <NavLink href="/" text="Home" accent onClick={() => setMenuOpen(false)} />
                    <NavLink href="/Watchlist" text="My Watchlist" onClick={() => setMenuOpen(false)} />
                    <NavLink href="/News" text="Recent News" onClick={() => setMenuOpen(false)} />
                    <div className="relative">
                        <input
                            className="w-full rounded text-base px-4 py-2 bg-gray-900 text-white border border-gray-700 focus:border-yellow-400 transition-all"
                            type="text"
                            placeholder="Search stocks/crypto"
                            onChange={handleInputChange}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setTimeout(() => setInputFocus(false), 150)}
                            value={searchTerm}
                        />
                        {inputFocus && (
                            <div className="absolute left-0 mt-2 bg-black shadow-lg rounded w-full z-50 p-2 max-h-48 overflow-y-auto">
                                {tickersDataFiltered.length > 0 ? (
                                    tickersDataFiltered.map((ticker) => (
                                        <p key={ticker} className="cursor-pointer hover:bg-yellow-500 px-2 py-1 rounded"
                                            onClick={() => {
                                                setSearchTerm(ticker);
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
                </nav>
            )}
        </header>
    );
};

// Navigation link with accent underline
function NavLink({ href, text, accent, onClick }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`relative text-base font-medium transition-all duration-300 text-white hover:text-yellow-400 px-2 py-1
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[var(--accent-gold)] after:transition-all after:duration-300
                ${accent ? "text-[var(--accent-gold)] after:w-full" : "after:w-0"}
            `}
        >
            {text}
        </a>
    );
}

export default Header;
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
    'Salesforce (CRM)',
    '\n'
];



const InfiniteTickerScroll = () => {
    return (
        <div className="w-full flex justify-center mt-12 mb-4">
            <div className="w-full flex max-w-6xl bg-black rounded-lg shadow-lg py-4 px-4 mx-auto overflow-hidden">
                <div className="relative flex w-full overflow-hidden">
                    <div className="whitespace-nowrap animate-ticker flex">
                        <ul className="flex gap-10">
                            {[...tickers,...tickers].map((ticker, idx) => (
                                <li key={"ticker1-"+idx} className="flex gap-2 items-center text-white">{ticker}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfiniteTickerScroll
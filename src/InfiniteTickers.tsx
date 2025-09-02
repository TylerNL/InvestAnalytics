import AMZN from './assets/Amazon-icon-in-flat-design-on-transparent-background-PNG-removebg-preview.png';
import BTC from './assets/Bitcoin.svg.png';
import GOOGL from './assets/google-high-resolution-flat-logo-701751694791459t6wvlq2hos-removebg-preview.png';
import ETH from './assets/hd-ethereum-eth-purple-logo-sign-png-701751694771769kxirapfr36-removebg-preview.png';
import TSLA from './assets/Tesla_logo.png';
import NTFLX from './assets/red-large-netflix-logo-text-701751694792625tjldcsq74b-removebg-preview.png';
import MSFT from './assets/png-clipart-microsoft-office-365-microsoft-text-rectangle-thumbnail-removebg-preview.png';
import AAPL from './assets/images-removebg-preview.png';
import META from './assets/hd-facebook-meta-logo-png-701751694777707v6bil7t1yh-removebg-preview.png';

const tickers = [
    { src: AMZN, alt: 'Amazon' },
    { src: BTC, alt: 'Bitcoin' },
    { src: GOOGL, alt: 'Google' },
    { src: ETH, alt: 'Ethereum' },
    { src: TSLA, alt: 'Tesla' },
    { src: NTFLX, alt: 'Netflix' },
    { src: MSFT, alt: 'Microsoft' },
    { src: AAPL, alt: 'Apple' },
    { src: META, alt: 'Meta' }
];

const InfiniteTickerScroll = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <div 
                    className="relative bg-black rounded-lg shadow-lg py-6 px-4 overflow-hidden"
                    style={{ height: '120px' }}
                >
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
                    
                    <div className="relative flex w-full overflow-hidden h-full">
                        <div 
                            className="flex items-center h-full"
                            style={{
                                width: 'max-content',
                                animation: 'scroll 30s linear infinite'
                            }}
                        >
                            {[...tickers, ...tickers, ...tickers].map((ticker, idx) => (
                                <div key={`ticker-img-${idx}`} className="flex items-center justify-center mx-8 flex-shrink-0">
                                    <img
                                        src={ticker.src}
                                        alt={ticker.alt}
                                        className="h-20 w-20 object-contain filter brightness-110 contrast-110"
                                        style={{ 
        maxWidth: '80px', 
        maxHeight: '80px',
        mixBlendMode: 'multiply', // For white backgrounds
        filter: 'brightness(1.2) contrast(1.1)'
    }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
            `}</style>
        </div>
    );
};

export default InfiniteTickerScroll;
import candleChart from './assets/image (5).png';

function MainCard() {
  return (
    <div className="relative ml-8 -mt-6 w-[40%] shadow-md rounded-lg">
        <img
        src={candleChart}
        alt="Candle Chart"
        className="w-full h-auto rounded-lg"
        />
    <p
        className="absolute top-0 left-0 w-full h-full p-6 text-black rounded-lg bg-white bg-opacity-50 overflow-auto"
    >
        We have created the future in AI-powered stock and cryptocurrency analysis. From detailed market history to personalized
        updates, Invest Analytics provides our customers with easily accessible information and predictions for what the market is experiencing.
    </p>
    </div>
  );
}
export default MainCard;




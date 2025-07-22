import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import HomeButton from "./HomeButton.tsx";
import MainCard from "./mainCard.tsx";
import Watchlist from "./Watchlist.tsx";
import News from "./News.tsx";
import InfiniteTickerScroll from "./InfiniteTickers.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <>
      <HomeButton />
      <div className="relative -top-4">
        <h1 className="text-2xl font-bold mt-12 md:mt-16 lg:mt-20 p-4 relative left-8">
          Welcome to Invest Analytics
        </h1>
      </div>
      <MainCard />
      <InfiniteTickerScroll />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Watchlist" element={<Watchlist />} />
          <Route path="/News" element={<News />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import HomeButton from "./HomeButton.tsx";
import MainCard from "./mainCard.tsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HomeButton />

      <div className="relative -top-4">
        <h1 className="text-2xl font-bold mt-12 md:mt-16 lg:mt-20 p-4 relative left-8">
          Welcome to Invest Analytics
        </h1>
      </div>

      <MainCard />

      <Footer />
    </div>
  );
}

export default App;

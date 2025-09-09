import Header from "./Header";
import Footer from "./Footer";
import AppRouter from "./AppRouter";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
      <div className="flex-1">
        <AppRouter/>
      </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

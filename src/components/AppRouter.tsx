import { Routes, Route } from "react-router-dom";
import Home from "./Home"; // or "./Home" if you split Home out
import Watchlist from "./Watchlist";
import News from "./News";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/watchlist" element={<Watchlist />} />
    <Route path="/news" element={<News />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);

export default AppRouter;
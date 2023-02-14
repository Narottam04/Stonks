import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SidebarLayout from "./SidebarLayout";
import NotFound404 from "../Pages/NotFound404";
// import Login from "../Pages/Login";
// import Signup from "../Pages/Signup";
// import ResetPassword from "../Pages/ResetPassword";
// import ForgotPassword from "../Pages/ForgotPassword";
import CoinMarket from "../Pages/CoinMarket";
import News from "../Pages/News";
import CurrencyDetailsPage from "../Pages/CurrencyDetailsPage";
import Watchlist from "../Pages/Watchlist";
import Portfolio from "../Pages/Portfolio";
import Dashboard from "../Pages/Dashboard";
import UserProfile from "../Pages/UserProfile";
import Search from "../Pages/Search";
// import AiPredections from "../Pages/AiPredections";
import Learn from "../Pages/Learn";
import Leaderboard from "../Pages/Leaderboard";
import MoreMobileNavPage from "../Pages/MoreMobileNavPage";
import FAQ from "../Pages/FAQ";
import GlobalStats from "../Pages/GlobalStats";
import VirtualUsdPage from "../Pages/VirtualUsdPage";
import Loader from "./Loader";

const Login = lazy(() => import("../Pages/Login"));
const Signup = lazy(() => import("../Pages/Signup"));
const ResetPassword = lazy(() => import("../Pages/ResetPassword"));
const ForgotPassword = lazy(() => import("../Pages/ForgotPassword"));

// const CoinMarket = lazy(() => import("../Pages/CoinMarket"));
// const News = lazy(() => import("../Pages/News"));
// const CurrencyDetailsPage = lazy(() => import("../Pages/CurrencyDetailsPage"));
// const Watchlist = lazy(() => import("../Pages/Watchlist"));
// const Portfolio = lazy(() => import("../Pages/Portfolio"));
// const Dashboard = lazy(() => import("../Pages/Dashboard"));
// const UserProfile = lazy(() => import("../Pages/UserProfile"));
// const Search = lazy(() => import("../Pages/Search"));
// const AiPredections = lazy(() => import("../Pages/AiPredections"));
// const Learn = lazy(() => import("../Pages/Learn"));
// const Leaderboard = lazy(() => import("../Pages/Leaderboard"));
// const MoreMobileNavPage = lazy(() => import("../Pages/MoreMobileNavPage"));
// const FAQ = lazy(() => import("../Pages/FAQ"));
// const GlobalStats = lazy(() => import("../Pages/GlobalStats"));
// const VirtualUsdPage = lazy(() => import("../Pages/VirtualUsdPage"));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode={"wait"}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/market" element={<CoinMarket />} />
          <Route path="/app/search" element={<Search />} />
          <Route path="/app/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/app/ai" element={<AiPredections />} /> */}
          <Route path="/app/coin/USD" element={<VirtualUsdPage />} />
          <Route path="/app/coin/:id" element={<CurrencyDetailsPage />} />
          <Route path="/app/news" element={<News />} />
          <Route path="/app/watchlist" element={<Watchlist />} />
          <Route path="/app/portfolio" element={<Portfolio />} />
          <Route path="/app/learn" element={<Learn />} />
          <Route path="/app/profile" element={<UserProfile />} />
          <Route path="/app/more" element={<MoreMobileNavPage />} />
          <Route path="/app/faq" element={<FAQ />} />
          <Route path="/app/market/globalStats" element={<GlobalStats />} />
        </Route>
        {/* <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/market"
          element={
            <ProtectedRoute>
              <CoinMarket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/ai"
          element={
            <ProtectedRoute>
              <AiPredections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/coin/USD"
          element={
            <ProtectedRoute>
              <VirtualUsdPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/coin/:id"
          element={
            <ProtectedRoute>
              <CurrencyDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/learn"
          element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/more"
          element={
            <ProtectedRoute>
              <MoreMobileNavPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/faq"
          element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/market/globalStats"
          element={
            <ProtectedRoute>
              <GlobalStats />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/resetPassword"
          element={
            <Suspense fallback={<Loader />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <Suspense fallback={<Loader />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

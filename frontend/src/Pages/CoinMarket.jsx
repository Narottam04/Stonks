import { lazy } from "react";

// import { useAuth } from "../Context/AuthContext";

// import CoinsTable from "../Components/CoinsTable";
const CoinsTable = lazy(() => import("../Components/CoinsTable"));

const CoinMarket = () => {
  // const { currentUser } = useAuth();
  return (
    <section className="lg:px-4 py-2 lg:py-8 mx-auto max-w-[1600px]">
      <p className="font-title text-white font-bold text-2xl md:text-3xl font-title mt-4 lg:mt-0 ml-3">
        Cryptocurrency Prices
      </p>
      <CoinsTable />
    </section>
  );
};

export default CoinMarket;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { AiOutlineClose } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";

import usd from "../Assets/svg/USD.svg";

import { useAuth } from "../Context/AuthContext";
import { supabase } from "../Utils/init-supabase";
import { fetchAvailableCoins } from "../Features/availableCoins";

const SellCoins = ({ data, modal, setModal }) => {
  const { currentUser } = useAuth();
  const [coinValue, setCoinValue] = useState(1);
  const [coinUsdPrice, setCoinUsdPrice] = useState(data.market_data.current_price.usd);
  const [orderLoading, setOrderLoading] = useState(false);

  const [availabeCoinAmt, setAvailabeCoinAmt] = useState(0);

  const availableUsdCoins = useSelector((state) => state.availableCoins);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAvailableCoins(currentUser.uid));
    // get amount of coin that you have purchased
    async function coinAmount() {
      let {
        data: availableCoinAmount
        // , error
      } = await supabase
        .from("portfolio")
        .select("coinName,coinAmount")
        .eq("userId", `${currentUser.uid}`)
        .eq("coinId", `${data.id}`);
      if (availableCoinAmount.length !== 0) {
        setAvailabeCoinAmt(availableCoinAmount[0].coinAmount);
      }
    }
    coinAmount();
  }, [currentUser.uid, data.id, dispatch]);

  const changeCoinValue = (e) => {
    setCoinValue(e.target.value);
    setCoinUsdPrice(data.market_data.current_price.usd * e.target.value);
  };

  const changeUsdValue = (e) => {
    setCoinUsdPrice(e.target.value);
    setCoinValue(e.target.value / data.market_data.current_price.usd);
  };

  async function onPlaceOrder() {
    try {
      setOrderLoading(true);
      // get available coins and check if it coin amount is more than what we want to sell

      if (coinValue > availabeCoinAmt) {
        throw new Error("Not enough coins!");
      }

      // check if the coin is already purchased i.e. add the coin amount  to our existing coin in portfolio db

      // update the sold coin to database
      const portfolioUsdAmount = data.market_data.current_price.usd * (availabeCoinAmt - coinValue);
      const updatedCoinAmount = availabeCoinAmt - coinValue;

      const {
        // data: removefromPortfolio,
        error: removefromPortfolioError
      } = await supabase
        .from("portfolio")
        .update([
          {
            amount: `${portfolioUsdAmount.toFixed(3)}`,
            coinAmount: `${updatedCoinAmount.toFixed(3)}`
          }
        ])
        .eq("userId", `${currentUser.uid}`)
        .eq("coinId", `${data.id}`);

      if (removefromPortfolioError) {
        throw new Error("Something went wrong, Please try again!");
      }

      // add the value to virtual usd
      let updatedUsdValue = availableUsdCoins.data.amount + coinUsdPrice;

      let {
        // data: updateUsdCoin,
        error: updateUsdCoinError
      } = await supabase
        .from("portfolio")
        .update({ amount: updatedUsdValue })
        .eq("userId", `${currentUser.uid}`)
        .eq("coinId", "USD");

      if (updateUsdCoinError) {
        throw new Error("Something went wrong!");
      }

      // delete the portfolio from db if the coinValue is 0
      if (updatedCoinAmount === 0) {
        // const {data: deleteRow, error: errorRow } =
        await supabase
          .from("portfolio")
          .delete()
          .eq("userId", `${currentUser.uid}`)
          .eq("coinId", `${data.id}`);
      }

      // calculate networth

      setOrderLoading(false);
      setModal(false);
      alert("Coin Sold Successfully");
      navigate("/app/portfolio");
    } catch (error) {
      setOrderLoading(false);
      alert(error);
    }
  }
  return (
    //  Large Modal
    <div
      className={`${
        !modal && "hidden"
      } flex flex-col overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`}
      id="large-modal"
    >
      <div className="relative px-4 w-full max-w-4xl h-full md:h-auto">
        {/* Modal content  */}
        <div className="relative  rounded-lg shadow bg-gray-700">
          {/* Modal header  */}
          <div className="flex justify-between items-center px-5 py-3 md:p-5 rounded-t border-b border-gray-600">
            <h3 className="text-md md:text-xl font-medium  text-white">
              Sell {data.name} | <span className="uppercase">{data.symbol}</span>
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="large-modal"
              onClick={() => setModal(false)}
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
          </div>
          {/* Modal body  */}
          <div className="px-6 py-3 md:p-6">
            <p className="text-base leading-relaxed font-semibold text-gray-200">
              1 <span className="uppercase">{data.symbol}</span> ={" "}
              {data.market_data.current_price.usd} USD
            </p>

            <p className="text-base leading-relaxed font-semibold text-gray-200">
              Available Balance ={" "}
              {availableUsdCoins.status === "success" ? availableUsdCoins.data.amount : 0} USD
            </p>

            <p className="text-base leading-relaxed font-semibold text-gray-200">
              Available Coin amount = {availabeCoinAmt}
            </p>

            <div className="relative py-4">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <img src={data?.image?.small} alt={data.name} className="h-5 w-5" />
              </div>
              <input
                type="number"
                id="coinValue"
                name="coinValue"
                min="0"
                value={coinValue}
                onChange={changeCoinValue}
                className=" border   text-sm rounded-lg  block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <BsArrowDownUp className="h-4 w-4 text-white m-auto " />

            {/* usd value */}
            <div className="relative py-4">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <img src={usd} alt="usd price" className="h-5 w-5" />
              </div>
              <input
                type="number"
                min="0"
                id="coinUsdValue"
                name="coinUsdValue"
                value={coinUsdPrice}
                onChange={changeUsdValue}
                className=" border   text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {/* Modal footer  */}
          <div className="flex justify-center items-center  px-6 py-3 md:p-6 space-x-2 rounded-b border-t  border-gray-600">
            <button
              data-modal-toggle="large-modal"
              type="button"
              disabled={orderLoading}
              className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onClick={onPlaceOrder}
            >
              {orderLoading ? `Selling ${data.name}...` : `Sell ${data.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCoins;

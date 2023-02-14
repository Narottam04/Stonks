import { useAuth } from "../Context/AuthContext";
import { useFetchAvailableCoinsQuery } from "../services/supabaseApi";

const VirtualUsdPage = () => {
  const { currentUser } = useAuth();

  // get available coins
  const {
    data: availableUsdCoins,
    isSuccess: fetchAvailableUsdCoinsSuccess
    // error: fetchAvailableUsdCoinsError,
    // isLoading: fetchAvailableUsdCoinsLoading,
    // refetch: refetchAvailableCoins
  } = useFetchAvailableCoinsQuery(currentUser.uid);

  return (
    <>
      <p className="text-white font-bold text-2xl md:text-3xl font-title my-6 ml-3 px-2 md:px-2">
        Virtual USD
      </p>
      {fetchAvailableUsdCoinsSuccess && (
        <div className="  bg-gradient-to-tr from-gray-900 to-gray-700   overflow-hidden shadow rounded-lg w-60 md:w-72 relative mx-4">
          <img
            src="https://img.icons8.com/clouds/200/000000/bitcoin.png"
            alt="btc logo"
            className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
          />
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-400 truncate">
                Available USD coins
              </dt>
              <dd className="mt-1 text-xl leading-9 font-semibold text-gray-200">
                ${availableUsdCoins[0]?.amount}
              </dd>
            </dl>
          </div>
        </div>
      )}
      <p className="text-white font-semibold text-md md:text-xl font-title my-6 ml-3 px-2 md:px-2">
        Cryptocademy provides virtual USD coins that can be used to trade cryptocurrencies and see
        whether they are making profits or losses without having to risk realy money.
        <br />
        <br />
        1 virtual USD coins is equal to one united states dollar
        <br />
        <br />
        So go out there and enter the world of trading through Cryptocademy.
      </p>
    </>
  );
};

export default VirtualUsdPage;

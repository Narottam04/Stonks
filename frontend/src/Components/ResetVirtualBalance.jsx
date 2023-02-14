import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { useAuth } from "../Context/AuthContext";
import { supabase } from "../Utils/init-supabase";

const ResetVirtualBalance = ({ modal, setModal }) => {
  const { currentUser } = useAuth();
  const [resetLoading, setResetLoading] = useState(false);

  async function resetVirtualBalanceHandler() {
    try {
      setResetLoading(true);
      // first delete all the purchased coin in the user account
      const {
        // data,
        error: deletePortfolio
      } = await supabase.from("portfolio").delete().eq("userId", `${currentUser.uid}`);

      if (deletePortfolio) {
        throw new Error("Something went wrong!!");
      }

      const {
        // data: addedData,
        error: addVirtualUsdErr
      } = await supabase.from("portfolio").insert([
        {
          userId: currentUser.uid,
          coinId: "USD",
          coinName: "Virtual USD",
          image: "https://img.icons8.com/fluency/96/000000/us-dollar-circled.png",
          amount: 100000,
          coinSymbol: "vusd"
        }
      ]);

      if (addVirtualUsdErr) {
        throw new Error("Something went wrong!!");
      }
      setResetLoading(false);
      alert("Successfully, reset your account!");
    } catch (error) {
      setResetLoading(false);
      alert(error);
    }
  }
  return (
    <>
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        className={`${
          !modal && "hidden"
        } flex flex-col overflow-y-auto overflow-x-hidden fixed right-0 left-0  z-50 justify-center items-center md:inset-0 h-modal sm:h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg shadow bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-gray-600">
              <h3 className="text-xl font-semibold text-white">Reset Virtual USD balance</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                data-modal-toggle="large-modal"
                onClick={() => setModal(false)}
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-400">
                You can use the following action to delete your portfolio account and restore your
                initial USD balance of 100k to the account.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-600">
              <button
                data-modal-toggle="defaultModal"
                onClick={resetVirtualBalanceHandler}
                disabled={resetLoading}
                type="button"
                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                {resetLoading ? `Resetting Account...` : `Reset Account`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetVirtualBalance;

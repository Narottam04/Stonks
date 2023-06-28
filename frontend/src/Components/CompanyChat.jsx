import { useRef, useState } from "react";
import ErrorToast from "./ErrorToast";
import { useAuth } from "../Context/AuthContext";

const CompanyChat = ({ companyName }) => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [currentInput, setCurrentInput] = useState("");
  const toastRef = useRef();
  const { currentUser } = useAuth();
  console.log(chats);

  async function handleSubmit(context, question) {
    try {
      setLoading(true);
      const res = await fetch(`https://api-6tyd64odzq-uc.a.run.app/api/stocks/chat/billy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          context,
          question
        })
      });

      const data = await res.json();

      if (data.hasOwnProperty("message")) {
        throw new Error(data?.message);
      }

      if (!res.ok) {
        throw new Error(`Something went wrong!`);
      }

      setChats([...chats, data]);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }
  return (
    <>
      <ErrorToast message={errorMessage} ref={toastRef} />

      <section className="mx-4 flex-1">
        {/* Title */}
        <p className="font-title text-white font-bold text-2xl md:text-3xl font-title mt-4 lg:mt-0 ml-3 mb-4">
          Chat With Billy The Trader
        </p>
        {/* chat section */}
        <div className="relative">
          <div className="bg-gray-900 overflow-y-scroll h-[400px] rounded-lg p-4">
            {chats?.map((chat, idx) => (
              <>
                {/* question */}
                <div className="flex mb-4 flex-row-reverse">
                  <div className="flex-shrink-0 ml-2">
                    <img
                      src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${currentUser?.uid}&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                      alt="Avatar"
                      className="rounded-full w-8 h-8"
                    />
                  </div>
                  <div className="bg-green-500 rounded-lg px-4 py-2 text-white">
                    <p>{chat?.question}</p>
                    {/* <p className="text-sm">12:32 PM</p> */}
                  </div>
                </div>

                {/* answer */}
                <div className="flex mb-4">
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed='Billy'&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                      alt="Avatar"
                      className="rounded-full w-8 h-8"
                    />
                  </div>
                  <div className="bg-gray-800 rounded-lg px-4 py-2">
                    <p className="text-gray-300">{chat?.answer}</p>
                    {/* <p className="text-gray-500 text-sm">12:30 PM</p> */}
                  </div>
                </div>
              </>
            ))}
            {/* chat loader */}
            {loading && (
              <div className="flex mb-4">
                <div className="flex-shrink-0 mr-2">
                  <img
                    src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed='Billy'&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                  />
                </div>
                <div className="bg-gray-800 rounded-lg px-20 py-2">
                  <div className="dots-5"></div>
                </div>
              </div>
            )}
          </div>
          {/* send chat */}
          <div className="flex">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type a message"
              className="bg-gray-800 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300"
            />
            <button
              onClick={() => {
                if (currentInput?.length > 0) {
                  handleSubmit(
                    "Act like you are Billy, my personal virtual assistant for the stock market. You give me information about any company, their history, and information about investors.",
                    currentInput
                  );
                }
              }}
              className="bg-green-500 text-white px-4 py-2 "
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyChat;

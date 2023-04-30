const LiveChat = ({ companyName, data }) => {
  console.log(data);
  return (
    <section className="mx-4 flex-1">
      {/* Title */}
      <p className="font-title text-white font-bold text-2xl md:text-3xl font-title mt-4 lg:mt-0 ml-3 mb-4">
        {companyName} Live Chat
      </p>
      {/* chat section */}
      <div className="relative">
        {/* show a overlay with modal that tells users that the market is currently close */}
        {console.log("market state", data?.marketState === "CLOSED")}
        <div
          className={`${
            data?.marketState !== "CLOSED" && "hidden"
          } absolute bg-black inset-0 bg-opacity-75`}
        >
          <div className="max-w-sm p-6 rounded-lg shadow bg-gray-800 border-gray-700 mx-auto">
            <img alt="crying cat" src="https://img.icons8.com/emoji/96/null/crying-cat.png" />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">
              Market Is Close!!!
            </h5>
            <p className="mb-3 font-normal text-gray-400">
              Live chat is availble when the market is open.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 overflow-y-scroll h-[400px] rounded-lg p-4">
          <div className="flex mb-4">
            <div className="flex-shrink-0 mr-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Avatar"
                className="rounded-full w-8 h-8"
              />
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              <p className="text-gray-300">Hello! How are you?</p>
              <p className="text-gray-500 text-sm">12:30 PM</p>
            </div>
          </div>
          <div className="flex mb-4">
            <div className="flex-shrink-0 mr-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Avatar"
                className="rounded-full w-8 h-8"
              />
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              <p className="text-gray-300">I'm doing well, thanks for asking.</p>
              <p className="text-gray-500 text-sm">12:31 PM</p>
            </div>
          </div>
          <div className="flex mb-4 flex-row-reverse">
            <div className="flex-shrink-0 ml-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Avatar"
                className="rounded-full w-8 h-8"
              />
            </div>
            <div className="bg-green-500 rounded-lg px-4 py-2 text-white">
              <p>Great to hear!</p>
              <p className="text-sm">12:32 PM</p>
            </div>
          </div>
        </div>
        {/* send chat */}
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-gray-800 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-300"
          />
          <button className="bg-green-500 text-white px-4 py-2 ">Send</button>
        </div>
      </div>
    </section>
  );
};

export default LiveChat;

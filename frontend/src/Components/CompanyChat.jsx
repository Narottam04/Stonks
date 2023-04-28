const CompanyChat = ({ companyName }) => {
  return (
    <section className="mx-4 flex-1">
      {/* Title */}
      <p className="font-title text-white font-bold text-2xl md:text-3xl font-title mt-4 lg:mt-0 ml-3 mb-4">
        Chat With Billy The Trader
      </p>
      {/* chat section */}
      <div className="relative">
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
          <div className="flex mb-4 flex-row-reverse">
            <div className="flex-shrink-0 ml-2">
              <img
                src="https://via.placeholder.com/50"
                alt="Avatar"
                className="rounded-full w-8 h-8"
              />
            </div>
            <div className="bg-green-500 rounded-lg px-4 py-2 text-white">
              <p>Do you want to grab lunch later?</p>
              <p className="text-sm">12:33 PM</p>
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
              <p className="text-gray-300">Sure, that sounds good!</p>
              <p className="text-gray-500 text-sm">12:35 PM</p>
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

export default CompanyChat;

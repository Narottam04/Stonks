const Loader = ({ message }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-black">
        <div className="dots-5"></div>
        <p className="font-title text-white font-bold text-lg mt-2">{message}</p>
      </div>
    </>
  );
};

export default Loader;

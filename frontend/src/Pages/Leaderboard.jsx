// import { useAuth } from "../Context/AuthContext";
import { useGetLeaderboardQuery } from "../services/supabaseApi";

import Loader from "../Components/Loader";

const Leaderboard = () => {
  // const { currentUser } = useAuth();

  const {
    data,
    error,
    isLoading,
    // isFetching,
    isSuccess
    // refetch
  } = useGetLeaderboardQuery();

  // useEffect(() => {
  //   async function leaderboard() {
  //       try {
  //         // let { data: users,count, error } = await supabase
  //         // .from('users')
  //         // .select('*', { count: 'exact' })
  //         let { data: users, error } = await supabase
  //         .from('users')
  //         .select('username,networth')
  //         .order('networth', { ascending: false })
  //         .limit(100)

  //         console.log(users)
  //         setData(users)
  //       } catch (error) {
  //           console.log(error)
  //       }
  //   }
  //   leaderboard()
  // }, [])

  // if(data){
  //     console.log(data)
  // }

  return (
    <section className="lg:px-4 py-2 lg:py-8 max-w-[1600px]">
      <p className="text-white font-bold text-2xl md:text-3xl font-title mt-4 mb-4 lg:mt-0 ml-3 px-2 md:px-4">
        Global Leaderboard
      </p>
      {isLoading && <Loader />}
      <ul className="px-2 md:px-4 flex flex-col space-y-1 pb-12 text-white font-text">
        {/* Table Head */}
        <li className="grid grid-cols-3 text-gray-500 py-2 px-1md:px-5 cursor-pointer border-b-2 border-white">
          <div className="">
            <p className="text-white pl-4">Rank</p>
          </div>
          <div className="flex items-center justify-start ml-auto md:ml-0 ">
            <p className="w-28 md:w-40  text-white break-all text-left">Player</p>
          </div>
          <div className="flex items-center justify-end ml-auto md:ml-0 ">
            <p className="w-24 md:w-40  text-white text-right mr-2">Networth</p>
          </div>
        </li>
        {error ? (
          <p className="text-red-500 text-xl">Something went wrong</p>
        ) : (
          isSuccess &&
          data.map((user, index) => (
            <li
              key={index}
              className="grid grid-cols-3 text-gray-500 py-2 px-1 md:px-5 hover:bg-gray-900 rounded-lg cursor-pointer border-b-2 border-gray-800 "
            >
              <div className="flex items-center space-x-2 ">
                <p className="pl-1">{index + 1}</p>
                {index + 1 === 1 && (
                  <img
                    src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-trophy-reward-and-badges-justicon-flat-justicon-1.png"
                    alt="gold trophy"
                    className="w-8 h-8"
                  />
                )}
                {index + 1 === 2 && (
                  <img
                    src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-trophy-baseball-justicon-flat-justicon.png"
                    alt="silver trophy"
                    className="w-8 h-8"
                  />
                )}
                {index + 1 === 3 && (
                  <img
                    src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-trophy-reward-and-badges-justicon-flat-justicon-4.png"
                    alt="3rd rank trophy"
                    className="w-8 h-8"
                  />
                )}
              </div>
              <div className="flex items-center justify-start ml-auto md:ml-0 ">
                <p className="w-28 md:w-40 truncate text-white font-semibold">{user.username}</p>
              </div>
              <div className="flex items-center justify-end ml-auto md:ml-0 ">
                <p className="w-28 md:w-40 break-all text-white font-semibold text-right">
                  ${user.networth}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Leaderboard;

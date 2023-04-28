import React from "react";
import { useGetAllPostsQuery } from "../services/postsApi";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Faq } from "../Components/FAQ";

const Social = () => {
  const { currentUser } = useAuth();
  const { data, error, isLoading, isSuccess, refetch } = useGetAllPostsQuery();

  console.log(data)

  async function handleUpvotePost(postId) {
    try {
      if (typeof postId !== "string") {
        throw new Error("Something went wrong! please try again");
      }
      const res = await fetch("/api/post/upvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId,
          userId: currentUser?.uid
        })
      });
    } catch (error) {}
  }
  return (
    <main className="flex items-start gap-8 lg:px-4 py-2 lg:py-8  mx-auto  max-w-[1600px]">
      <section>
        <p className="text-white font-bold text-2xl md:text-3xl font-title pt-6 md:pt-0 mb-4 ml-3 px-2 md:px-4">
          Stonks Social
        </p>
        {/* navigate to post page */}
        <Link
          to="/app/social/new"
          class=" p-4 mb-6 mx-3 px-2 md:mx-6 rounded-lg  bg-[#1a1a1b] flex gap-3 cursor-pointer"
        >
          <img
            src={`https://avatars.dicebear.com/api/initials/${currentUser.displayName}.svg`}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <input
            type="text"
            id="default-input"
            class=" border text-sm rounded-lg  block w-full p-2.5 bg-[#1a1a1b] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Create Post"
            disabled
          />
        </Link>
        {data?.map((post, idx) => (
          <div
            key={idx}
            class="max-w-3xl  bg-[#1a1a1b] rounded-lg overflow-hidden shadow-lg mb-4 mx-3 px-2 md:mx-6 cursor-pointer"
          >
            {/* <!-- Post Info --> */}
            <div class="p-4">
              <div class="flex items-center mb-4">
                <img
                  class="w-8 h-8 rounded-full object-cover object-center mr-2"
                  src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${post?.user?.name}&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt="Avatar of User"
                />
                <div>
                  <p class="text-sm font-medium text-gray-100">{post?.user?.name}</p>
                </div>
              </div>
              <Link to={`/app/social/${post.id}`} state={{ data: post }}>
                <h2 class="text-xl font-medium text-gray-100 mb-2 ">{post?.title}</h2>
                <p class="text-gray-400 mb-4 line-clamp-3">{post?.body}</p>
              </Link>
              <div class="flex items-center">
                <button class="text-gray-400 focus:outline-none mr-1">
                  <BiUpvote className="text-gray-300 w-6 h-6 " />
                </button>
                <span class="text-gray-400  mr-4">1234</span>
                <button class="text-gray-400 focus:outline-none mr-1">
                  <BiDownvote className="text-gray-300 w-6 h-6 " />
                </button>
                <button class="text-gray-400 focus:outline-none ">
                  <i class="fas fa-comment"></i>
                </button>
                <span class="text-gray-400">123</span>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/*  */}
      <section className="hidden lg:block">
        {/* card to welcome folks to stonks social */}

        <div class="max-w-sm  border rounded-lg shadow bg-[#1a1a1b] border-[#1d1d1e]">
          <div>
            <img class="rounded-t-lg" src="https://source.unsplash.com/fiXLQXAhCfk" alt="" />
          </div>
          <div class="p-5">
            <div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight  text-white">
                Welcome To Stonks Community
              </h5>
            </div>
            <p class="mb-3 font-normal text-gray-400">
              Join our community of like-minded traders and gain valuable insights, tips, and
              support to help you make informed decisions and grow your portfolio.
            </p>
            <Link to="/app/social/new">
              <div class="relative w-full  inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 text-white hover:text-gray-900 focus:ring-4 focus:outline-none  focus:ring-lime-800">
                <span class="relative w-full text-center px-5 py-2.5 transition-all ease-in duration-75  bg-[#1a1a1b] rounded-md group-hover:bg-opacity-0">
                  Create Post
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* stonks faq */}

        <div class="hidden lg:block max-w-sm  p-6 mt-8 rounded-lg shadow bg-[#1a1a1b] border-[#1a1a1b]">
          <h5 class="mb-5 text-2xl font-bold tracking-tight  text-white">Rules</h5>

          <Faq title="No spam or self-promotion">
            Spam, ads, solicitations (including referral links), and self-promotion posts or
            comments will be removed and you might get banned. Instead, advertise here.
          </Faq>

          <Faq title="Context and Effort">
            Context and effort must be provided; empty posts or empty posts with links will be
            automatically removed. Low effort mentions for meme stocks will be removed, see here.
          </Faq>

          <Faq title="No trolling, insulting, or harassing">
            Trolling, insults, or harassment, especially in posts requesting advice, will be
            removed.
          </Faq>

          <Faq title="No penny stock or OTC discussions">
            No penny stock discussions, including OTC, microcaps, pump & dumps, low vol pumps and
            SPACs.
          </Faq>

          <Faq title="Stay on topic">
            Almost any post related to stocks and investment is welcome on stonks, including pre IPO
            news, futures & forex related to stocks, and geopolitical or corporate events indicating
            risks; outside this is offtopic and can be removed.
          </Faq>
        </div>
      </section>
    </main>
  );
};

export default Social;

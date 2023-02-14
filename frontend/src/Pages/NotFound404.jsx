import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import error404 from "../Assets/images/error404.png";

const NotFound404 = () => {
  return (
    <div className="bg-black">
      <Helmet>
        <title>Not Found 404</title>
        <meta
          name="description"
          content="Cryptocademy is an app that teaches people how to trade cryptocurrencies and invest in coins like bitcoin,ethereum etc. User can analyze market data by viewing charts, top daily cryptocurrency news. Through our curated blogs and courses,users can also learn more about cryptocurrency and blockchain concepts."
        />
        <link rel="canonical" href="https://cryptocademy.pages.dev/" />
        <meta property="og:title" content="Learn to invest like a pro" />
        <meta
          property="og:description"
          content="Cryptocademy is an app that teaches people how to trade cryptocurrencies and invest in coins like bitcoin,ethereum etc. User can analyze market data by viewing charts, top daily cryptocurrency news. Through our curated blogs and courses,users can also learn more about cryptocurrency and blockchain concepts."
        />
        <meta property="og:image" content="/cryptocademy-logo-sideways-light.png" />
        <meta property="og:image:width" content="2727" />
        <meta property="og:image:height" content="1952" />
        <meta property="og:site_name" content="Cryptocademy" />
        <meta property="og:type" content="Trading,Investment,Courses,Learning" />
        <meta name="language" content="EN" />
        <meta name="author" content="Cryptocademy" />
      </Helmet>
      <div className="flex justify-between h-screen items-center max-w-screen-xl mx-auto ">
        <div className="max-w-md text-center md:text-right">
          <h1 className="font-bold text-5xl mb-4 text-white">Oops!</h1>
          <h2 className="font-semibold text-4xl mb-14 text-gray-200">We couldn't find that page</h2>
          <p className="text-2xl mb-4 mx-2 md:mx-0 ">Maybe you can find what you need here?</p>
          <div>
            <Link className="font-bold text-xl underline text-blue-600" to="/">
              Dashboard
            </Link>
          </div>
          {/* <div >
                        <Link className="font-bold text-xl underline text-blue-600" to='/'>Homepage</Link>
                    </div>
                    <div >
                        <Link className="font-bold text-xl underline text-blue-600" to='/'>Homepage</Link>
                    </div> */}
        </div>
        <div className="hidden flex-1 md:flex flex-col">
          <img src={error404} alt="404 error not found" />
        </div>
      </div>
    </div>
  );
};

export default NotFound404;

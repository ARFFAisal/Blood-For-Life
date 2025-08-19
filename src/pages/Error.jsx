import { useRouteError } from "react-router";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="text-center max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-700 mb-2">
            Sorry, something went wrong.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {error?.statusText || error?.message || "Unexpected error occurred."}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;

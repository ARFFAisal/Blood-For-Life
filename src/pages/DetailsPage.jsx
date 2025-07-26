import axios from "axios";
import { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

export default function DetailsPage() {
  const { user } = useContext(AuthContext);
  console.log("🚀 ~ DetailsPage ~ user:", user)
  const book = useLoaderData();

  const handleRequest = () => {
    axios
      .patch(`http://localhost:5000/request/${book._id}`,{}, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => console.log(res.data));
  };
  //   console.log("🚀 ~ DetailsPage ~ data:", book);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Cover */}
        <div className="h-96">
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Info */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Pickup Location:</span>{" "}
            {book.location}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Available:</span> {book.quantity}{" "}
            copy{book.quantity > 1 ? "ies" : ""}
          </p>

          {/* Action Button */}
          <button
            onClick={handleRequest}
            className="mt-4 w-full bg-blue-600 text-white text-lg py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Request to Borrow
          </button>
        </div>
      </div>
    </div>
  );
}

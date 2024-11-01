import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/cartSlice";
import { RootState } from "../type/RootState";
import Header from "./Header";

const Favourite = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="bg-black min-h-screen text-white ">
      <Header />

      <div className="p-24">
        <h2 className="text-3xl font-semibold mb-6">Your Favourite Movies</h2>

        {cart.length === 0 ? (
          <p>No favourite movies added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{movie.overview}</p>
                <p className="text-sm text-yellow-400">
                  Rating: {movie.vote_average}/10
                </p>

                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️ Unlock
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <button
            onClick={handleClearCart}
            className="mt-6 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Favourites
          </button>
        )}
      </div>
    </div>
  );
};

export default Favourite;

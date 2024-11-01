import { useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../type/RootState";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { clearUser, setUser } from "../utils/userSlice";
import Swal from "sweetalert2";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleSingOut = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log me out!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log("Sign out error", error);
          navigate("/error");
        });
    }
  });
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(setUser({ uid, email, displayName }));
        if (!location.pathname.includes("/browse/favourite")) {
          navigate("/browse");
        }
      } else {
        dispatch(clearUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-8">
          <img src="/img/logo.png" alt="Netflix" className="w-24" />
          {user.uid && (
            <>
              <nav>
                <ul className="flex space-x-4 text-sm text-gray-300">
                  <li>
                    <Link to="/browse" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse/tv" className="hover:text-white">
                      TV Shows
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse/movies" className="hover:text-white">
                      Movies
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse/new" className="hover:text-white">
                      New & Popular
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse/my-list" className="hover:text-white">
                      My List
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse/languages" className="hover:text-white">
                      Browse by Languages
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
        {user.uid && (
          <>
            <div className="flex items-center space-x-4">
              <Search className="text-white" size={20} />
              <Link
                to="/browse/favourite"
                className="text-gray-50 hover:text-white"
              >
                Favourite({cart.items.length})
              </Link>
              <Bell className="text-white" size={20} />
              <div
                className="flex items-center space-x-1"
              > 
                <button  onClick={handleSingOut} className="px-3 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300">
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

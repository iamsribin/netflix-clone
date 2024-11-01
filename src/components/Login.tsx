import { useRef, useState } from "react";
import Header from "./Header";
import validateForm from "../utils/validate";
import { useDispatch } from "react-redux";


export const Login = () => {
  const [isSignInForm, setSignInForm] = useState<boolean>(true);
  let [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  let [passErrorMsg, setPassErrorMsg] = useState<string>("");
  const [nameErrorMsg, setNameErrorMsg] = useState<string>("");
  const dispatch = useDispatch();

  let [commError, setCommError] = useState<string>("");

  const toggleSingInForm = () => {
    setSignInForm(!isSignInForm);
  };

  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);
  let name = useRef<HTMLInputElement>(null);

  const handleForm = () => {
    let emailVal = email.current?.value;
    let passVal = password.current?.value;
    let nameVal = name.current?.value;
  
    if (emailVal && passVal) {
      setCommError("");
  
      if (!isSignInForm && !nameVal) {
        setNameErrorMsg("Full name is required for sign-up");
        return; 
      } else {
        setNameErrorMsg("");
      }
  
      validateForm(
        emailVal,
        passVal,
        nameVal, 
        setEmailErrorMsg,
        setPassErrorMsg,
        setCommError,
        dispatch,
        isSignInForm
      );
  
    } else {
      setCommError("All fields must be filled");
    }
  }
  return (
    <div>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-black bg-opacity-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/bg.jpg')" }}
      >
        <div className="w-full my-24 max-w-md p-14 space-y-8 bg-black bg-opacity-70 rounded-lg text-white">
          <h2 className="text-3xl font-bold">
            {" "}
            {isSignInForm ? "Sign In" : "Sign Up"}{" "}
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {!isSignInForm && (
              <div>
                <input
                  ref={name}
                  type="text"
                  placeholder="Full name"
                  className="w-full p-4 bg-opacity-80 bg-zinc-900 rounded-md outline ring-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <p className="text-red-500">{nameErrorMsg}</p>
              </div>
            )}
            <div>
              <input
                ref={email}
                type="text"
                placeholder="Email or mobile number"
                className="w-full p-4 bg-opacity-80 bg-zinc-900 rounded-md outline ring-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <p className="text-red-500">{emailErrorMsg}</p>
            </div>
            <div>
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-opacity-80 bg-zinc-900 rounded-md outline ring-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <p className="text-red-500">{passErrorMsg}</p>
            </div>
            <p className="text-red-500">{commError}</p>

            <button
              type="submit"
              onClick={handleForm}
              className="w-full p-4 bg-red-600 rounded-md font-bold hover:bg-red-700 transition duration-200"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-gray-300 hover:underline">
                {isSignInForm ? "Forgot password?" : ""}
              </a>
            </div>
          </form>
          <div className="text-center">
            <button className="text-white bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200">
              Use a sign-in code
            </button>
          </div>
          <p className="text-center text-gray-300">
            {isSignInForm ? "New to Netflix?" : "Already registered?"}{" "}
            <a
              onClick={toggleSingInForm}
              className="text-white hover:underline cursor-pointer"
            >
              {" "}
              {isSignInForm ? "Sign up now" : "Sign in now"}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

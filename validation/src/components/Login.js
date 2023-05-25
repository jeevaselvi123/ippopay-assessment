import React, { useEffect, useState } from "react";
import strongPasswordChecker from "../helper/passwordChecker";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [stepsNeeded, setStepsNeeded] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});
  const [isUnique, setIsUnique] = useState(false);

  const handleLogin = () => {
    setStepsNeeded(strongPasswordChecker(password));
    loginInfo.map((item) => {
      if (item.mail !== email && stepsNeeded > 0) {
        setIsUnique(true);
      } else {
        alert("Email already registered!");
      }
    });
    setIsValid(!isValid);
    console.log(isUnique);
    if (isUnique) {
      fetch(`${process.env.REACT_APP_VALIDATION_API_URL}/login/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: email, password: password }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          alert("Data saved to Db successfully!!");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleBackButton = () => {
    setIsValid(!isValid);
    setIsUnique(false);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_VALIDATION_API_URL}/login`)
      .then((response) => response.json())
      .then((json) => setLoginInfo(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <header className=" text-3xl font-semibold text-center pt-5 text-blue-700">
        Password Validator
      </header>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        {isValid ? (
          <div className=" flex flex-row">
            <button
              onClick={handleBackButton}
              className="items-start mr-2 px-4 py-2 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Back
            </button>

            {stepsNeeded > 0 ? (
              <p className="mt-2">
                Total steps needed for valid password: {stepsNeeded}
              </p>
            ) : (
              <p className="mt-2">
                Password is valid and Details are stored in Database!
              </p>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
              Sign in
            </h1>
            <form className="mt-4">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { signIn,signUp } from "../api";

const Input = ({ type, placeholder, handleChange, value }) => {
  return (
    <div className="my-5 w-full">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, type)}
        value={value}
        className="border-none no-underline appearance-none p-2 w-full"
      />
      <div className="w-full bg-black h-1"></div>
    </div>
  );
};

const Auth = () => {
  const navigate = useNavigate();
  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialData);
  const toggle = () => {
    setIsLogin((prev) => !prev);
    setFormData(initialData);
  };
  const handleChange = (e, name) => {
    e.preventDefault();
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isLogin) {
      const { data } = signIn(formData);
      console.log(data);
    } else {
      console.log("Signup");
    }
    navigate("/");
  };
  return (
    <div className="w-full h-screen md:grid md:grid-cols-2 flex flex-col bg-orange-400">
      <div className="flex w-full h-full items-center justify-center">
        <Player
          src="https://assets9.lottiefiles.com/packages/lf20_nc1bp7st.json"
          className="Player"
          autoplay
          loop
        />
      </div>
      <div className=" flex-nowrap w-full h-full flex items-center justify-center  ">
        <div className="flex flex-col p-10 justify-center items-center flex-nowrap bg-white rounded-lg shadow-2xl w-8/12">
          <h3 className="font-bold text-2xl text-orange-600">
            {isLogin ? "Login" : "Signup"}
          </h3>
          {!isLogin && (
            <Input
              placeholder={"Enter Your Name"}
              type={"text"}
              handleChange={handleChange}
              value={formData.name}
            ></Input>
          )}

          <Input
            placeholder={"Enter Your Email"}
            type={"email"}
            handleChange={handleChange}
            value={formData.email}
          ></Input>
          <Input
            placeholder={"Enter Your Password"}
            type={"password"}
            handleChange={handleChange}
            value={formData.password}
          ></Input>
          <button
            className="h-10 px-5 m-2 w-3/4 text-indigo-100 transition-colors duration-150 bg-orange-600 rounded-lg focus:shadow-outline hover:bg-orange-400"
            onClick={handleSubmit}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
          <p
            className="text-base font-medium text-amber-600 cursor-pointer hover:text-amber-500 my-3"
            onClick={() => toggle()}
          >
            {isLogin
              ? "Click Here If Not Registered"
              : "Click Here If Already An Account"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

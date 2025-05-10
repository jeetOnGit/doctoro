import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const {backendUrl, token, setToken} = useContext(AppContext)
  const [state, setState] = useState("sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'sign up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/login', {password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "sign up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "sign up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "sign up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit" className="bg-[#6C63FF] text-white w-full py-2 rounded-md text-base">
          {state === "sign up" ? "Create Account" : "Login"}
        </button>
        {state === "sign up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => setState("login")}
              className="text-[#6C63FF] underline cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span
              onClick={() => setState("sign up")}
              className="text-[#6C63FF] underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

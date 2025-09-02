import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://class-attendance-system-amd9.onrender.com/api/auth",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="m-0 p-0 box-border font-k2d text-black-olive">
      <div className="grid h-screen w-screen place-items-center bg-lotion selection:bg-rufous selection:text-lotion">
        <div className="overflow-hidden w-full max-w-[390px] bg-lotion p-[30px] rounded-[15px] shadow-[0_15px_20px_rgba(0,0,0,0.1)]">
          <div className="flex w-full">
            <div className="w-full text-[35px] font-semibold text-center">
              CAS
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-full text-[17px] font-semibold text-center">
              Class Attendence System
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex w-full">
              <form onSubmit={handleLogin} className="w-full">
                <div className="h-[50px] w-full mt-[20px]">
                  <input
                    type="text"
                    placeholder="name@rmuti.ac.th"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-full w-full outline-none pl-[15px] rounded-[15px] border border-solid border-silver-sand border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-rufous placeholder:text-silver-sand placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:text-rufous"
                  />
                </div>
                <div className="h-[50px] w-full mt-[20px]">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-full w-full outline-none pl-[15px] rounded-[15px] border border-solid border-silver-sand border-b-2 text-[17px] transition-all duration-300 ease-in-out focus:border-rufous placeholder:text-silver-sand placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:text-rufous"
                  />
                </div>
                <div className="mt-[5px]">
                  <a
                    href="#"
                    className="text-rufous no-underline hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mt-[20px] h-[50px] w-full rounded-[15px] overflow-hidden">
                  <input
                    type="submit"
                    value="Login"
                    className="h-full w-full bg-rufous text-lotion rounded-[15px] transition-all duration-[400ms] ease-in-out text-[20px] font-medium cursor-pointer border-none outline-none hover:bg-rosso-corsa"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

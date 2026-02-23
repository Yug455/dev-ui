import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Base_url from "../utils/BaseUrl";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState(true);

  const [EmailId, setEmailId] = useState("mainahibatauga@gmail.com");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("N7!pRz@4qVb#T1mgpsntL");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_url + "/login",
        {
          EmailId,
          Password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.response.data)
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(Base_url + "/signup",
        {
          FirstName,
          LastName,
          EmailId,
          Password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      console.log(err?.response?.data)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">

          <h2 className="card-title">
            {loginForm ? "Login" : "Signup"}
          </h2>

          {!loginForm && (
            <div>
              <label className="input validator text-fuchsia-600 mb-3">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="input validator text-fuchsia-600 mb-3">
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
          )}

          {/* ===== Email ===== */}
          <label className="input validator text-fuchsia-600 mb-3">
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={EmailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

      
          <label className="input validator text-orange-700 mb-3">
            <input
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain number, lowercase & uppercase letter"
            />
          </label>

   
          <p className="text-red-500">{error}</p>

        
          <div className="card-actions justify-end">
            <button
              className="btn"
              onClick={loginForm ? handleLogin : handleSignup}
            >
              {loginForm ? "Login" : "Signup"}
            </button>
          </div>

          {/* ===== Toggle ===== */}
          <div>
            <p
              className="cursor-pointer mt-3"
              onClick={() => {
                setLoginForm((prev) => !prev);
                setError("");
              }}
            >
              {loginForm
                ? "New user? Signup here"
                : "Already a user? Login here"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

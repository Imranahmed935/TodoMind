import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { handleLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginButton = async () => {
    try {
      const result = await handleLogin(); // Ensure handleLogin is properly defined
      
      if (!result?.user) {
        toast.error("Login failed");
        return;
      }
  
      const data = {
        name: result.user.displayName,
        email: result.user.email
      };
  
      // Check if user already exists
      const existingUser = await axios.get(`https://task-server-mocha-nine.vercel.app/users/${data.email}`);
  
      if (!existingUser.data) { 
        // Add new user if email does not exist
        const res = await axios.post('https://task-server-mocha-nine.vercel.app/users', data);
  
        if (res.data.insertedId) {
          toast.success('User added');
        }
      }
  
      navigate("/home");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Something went wrong");
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-4">Sign in to continue</p>

        <button
          onClick={handleLoginButton}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-md py-2 px-4 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition duration-300"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

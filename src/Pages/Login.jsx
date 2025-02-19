import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-600 mb-4">Sign in to continue</p>

                <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 shadow-md py-2 px-4 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition duration-300">
                    <FcGoogle className="text-2xl" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;

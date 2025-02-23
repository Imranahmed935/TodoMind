import { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    handleLogout()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  return (
    <div>
      <nav className="lg:w-8/12 mx-auto flex justify-between items-center lg:py-4 px-4 rounded mt-4 bg-sky-300">
        <h1 className="text-2xl font-bold">TodoMind</h1>
        <div className="flex items-center gap-4 ">
          <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
          <button onClick={handleLogoutButton}>LogOut</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

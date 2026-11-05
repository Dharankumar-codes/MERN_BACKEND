import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const user = useContext(UserContext);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-80">
      <h1 className="text-2xl font-bold mb-4">
        User Profile
      </h1>

      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
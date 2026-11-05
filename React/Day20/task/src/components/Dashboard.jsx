import { useNavigate, Navigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true" || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">My Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Welcome, {user.name}!
          </h2>

          <p className="text-gray-500 mb-6">
            You have successfully logged into your dashboard.
          </p>

          <div className="bg-indigo-50 p-5 rounded-xl">
            <h3 className="text-lg font-semibold text-indigo-700 mb-3">
              Your Profile
            </h3>

            <p className="text-gray-700 mb-2">
              <strong>Name:</strong> {user.name}
            </p>

            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
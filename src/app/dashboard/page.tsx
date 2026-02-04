export default function UserDashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back! 🌺
        </h2>
        <p className="text-gray-600">
          Discover beautiful flowers and manage your orders
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Browse Flowers Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-4xl mb-4">🌹</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Browse Flowers
          </h3>
          <p className="text-gray-600 mb-4">
            Explore our collection of beautiful flowers
          </p>
          <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
            View Catalog
          </button>
        </div>

        {/* My Orders Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            My Orders
          </h3>
          <p className="text-gray-600 mb-4">Track your flower deliveries</p>
          <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
            View Orders
          </button>
        </div>

        {/* Favorites Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-4xl mb-4">❤️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            My Favorites
          </h3>
          <p className="text-gray-600 mb-4">Your saved flower arrangements</p>
          <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
            View Favorites
          </button>
        </div>

        {/* Occasions Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Special Occasions
          </h3>
          <p className="text-gray-600 mb-4">
            Set reminders for important dates
          </p>
          <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
            Manage Dates
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            My Profile
          </h3>
          <p className="text-gray-600 mb-4">
            Update your account information
          </p>
          <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
            Edit Profile
          </button>
        </div>

        {/* Support Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Support
          </h3>
          <p className="text-gray-600 mb-4">Need help? Contact our team</p>
          <button className="w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition">
            Get Help
          </button>
        </div>
      </div>
    </>
  );
}
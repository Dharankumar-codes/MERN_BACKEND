const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">

      <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Contact Us
        </h1>

        <form>

          <div className="mb-5">
            <label className="block text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 mb-2">
              Message
            </label>

            <textarea
              placeholder="Enter your message"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
};

export default Contact;
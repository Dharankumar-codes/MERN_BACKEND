const Help = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Help Center
        </h1>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              How can I register?
            </h2>

            <p className="text-gray-600 mt-2">
              Click the Register button in the navigation bar and
              fill in the registration form.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              How can I contact you?
            </h2>

            <p className="text-gray-600 mt-2">
              Go to the Contact page and send us a message.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              What technology is used?
            </h2>

            <p className="text-gray-600 mt-2">
              This website uses React, React Router DOM and Tailwind CSS.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Help;
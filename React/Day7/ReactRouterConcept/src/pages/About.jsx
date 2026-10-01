const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Us
        </h1>

        <p className="text-gray-600 text-lg leading-8">
          Welcome to our website. This project is created using React,
          React Router DOM and Tailwind CSS.
        </p>

        <p className="text-gray-600 text-lg leading-8 mt-4">
          React Router DOM is used to move between different pages
          without refreshing the entire website.
        </p>

      </div>

    </div>
  );
};

export default About;
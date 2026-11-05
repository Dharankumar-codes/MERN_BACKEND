import { useRef } from "react";

const Task3 = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <nav className="bg-gray-900 text-white p-5 flex justify-center gap-6 sticky top-0">
        <button onClick={() => scrollToSection(homeRef)}>
          Home
        </button>

        <button onClick={() => scrollToSection(aboutRef)}>
          About
        </button>

        <button onClick={() => scrollToSection(servicesRef)}>
          Services
        </button>

        <button onClick={() => scrollToSection(contactRef)}>
          Contact
        </button>
      </nav>

      <section
        ref={homeRef}
        className="min-h-screen bg-blue-200 flex items-center justify-center scroll-mt-16"
      >
        <h1 className="text-4xl font-bold">Home Section</h1>
      </section>

      <section
        ref={aboutRef}
        className="min-h-screen bg-green-200 flex items-center justify-center scroll-mt-16"
      >
        <h1 className="text-4xl font-bold">About Section</h1>
      </section>

      <section
        ref={servicesRef}
        className="min-h-screen bg-yellow-200 flex items-center justify-center scroll-mt-16"
      >
        <h1 className="text-4xl font-bold">Services Section</h1>
      </section>

      <section
        ref={contactRef}
        className="min-h-screen bg-pink-200 flex items-center justify-center scroll-mt-16"
      >
        <h1 className="text-4xl font-bold">Contact Section</h1>
      </section>
    </div>
  );
};

export default Task3;
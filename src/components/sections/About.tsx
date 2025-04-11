import React from "react";
import aboutImage from "../../assets/aboutImg.svg"; // Adjust the path as necessary
// Removed unused import: import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Image on Left - 4 columns on md+ */}
        <div className="md:col-span-5 flex justify-center">
          <img
            src={aboutImage}
            alt="About Driva"
            className="w-full max-w-sm h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Text on Right - 8 columns on md+ */}
        <div className="md:col-span-7">
          <h2 className="text-3xl font-bold mb-4">About Driva</h2>
          <p className="text-gray-700 text-lg mb-4">
            Driva is Guwahati's trusted local driver network offering hourly,
            outstation, and full-day driver hire at affordable rates. We believe
            in safety, reliability, and convenience for every trip.
          </p>
          <p className="text-gray-600 text-base mb-4">
            Whether you're heading to work, running errands, or planning a long
            journey — our verified drivers ensure you reach on time,
            stress-free.
          </p>
          <a
            href="#readmore"
            className="text-blue-600 font-medium hover:underline"
          >
            Read More →
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
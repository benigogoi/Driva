import React from "react";
import Button from "../common/Button";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  icon,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className={`font-bold text-center mb-2 ${price ? "text-green-600" : "invisible"}`}>
        {price || "placeholder"}
      </p>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button to="/book" variant="outline" fullWidth>
        Book Now
      </Button>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Hourly Driver */}
          <ServiceCard
            title="Hourly Driver Hire"
            description="Need a driver for a few hours? Get professional drivers at an affordable hourly rate."
            price="₹199/hr"
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          {/* Outstation Trips */}
          <ServiceCard
            title="Outstation & Long Trips"
            description="Planning a trip outside the city? Our drivers are experienced with long routes and overnight journeys."
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          />

          {/* Night Drivers */}
          <ServiceCard
            title="Night Drivers"
            description="Need a driver late at night? Our night drivers ensure you reach safely regardless of the hour."
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            }
          />

          {/* Full-Day Hire */}
          <ServiceCard
            title="Full-Day Driver Hire"
            description="Need a driver for the entire day? Our full-day service is perfect for busy schedules and multiple stops."
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

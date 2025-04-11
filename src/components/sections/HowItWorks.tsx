import React from "react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {icon}
      </div>
      {/* <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">
        <span className="font-bold">{number}</span>
      </div> */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Step
            title="Book a Driver"
            description="Book via our simple form or WhatsApp us directly for immediate assistance."
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
          />

          {/* Step 2 */}
          <Step
            title="Driver Arrives On-Time"
            description="Our professional driver arrives punctually at your doorstep, ready to serve."
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />

          {/* Step 3 */}
          <Step
            title="Travel Safely & Pay After"
            description="Enjoy a safe journey with our trusted driver. Pay only after your trip is complete."
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

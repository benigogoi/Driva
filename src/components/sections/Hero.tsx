import React from "react";
import WhatsAppButton from "../common/WhatsAppButton";
import BookingForm from "../sections/BookingForm";
import heroBack from "../../assets/heroDrop.svg" 
const Hero: React.FC = () => {
  return (
    <section className="relative text-white pt-28 pb-12 md:pt-36 md:pb-20 px-4 overflow-hidden bg-gradient-to-br from-[#0D1117] via-[#0F1A2D] to-[#0D1117]">
      {/* Grid dots and decorative glowing dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_2px)] bg-[length:60px_60px]" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white opacity-20" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-white opacity-20" />
      </div>

      {/* SVG Overlay Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src={heroBack}// 👈 Replace with actual public path or import
          alt="Guwahati skyline"
          className="w-full h-full object-cover"
          
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left - Text */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4">
              Need a Driver in <span className="text-blue-400">Guwahati</span>?
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Local Drivers. Trusted Rides. Pay After the Trip.
            </p>
            <WhatsAppButton size="lg" className="mx-auto lg:mx-0" />
          </div>

          {/* Right - Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 text-gray-800">
              <BookingForm compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

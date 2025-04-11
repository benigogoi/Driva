import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Services from '../components/sections/Services';
// import BookingForm from '../components/sections/BookingForm';
import DriverCTA from '../components/sections/DriverCTA';
import About from '../components/sections/About';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Services />
      {/* <BookingForm /> */}
      <DriverCTA />
    </>
  );
};

export default Home;
import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Services from '../components/sections/Services';
// import BookingForm from '../components/sections/BookingForm';
import DriverCTA from '../components/sections/DriverCTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      {/* <BookingForm /> */}
      <DriverCTA />
    </>
  );
};

export default Home;
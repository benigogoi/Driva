import React from 'react';
import Button from '../common/Button';

const DriverCTA: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Driver?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join our network of trusted drivers. Earn weekly income, enjoy flexible work hours, and become part of Guwahati's premier driver service.
        </p>
        <Button to="/join" variant="secondary" size="lg">
          Apply as a Driver
        </Button>
      </div>
    </section>
  );
};

export default DriverCTA;
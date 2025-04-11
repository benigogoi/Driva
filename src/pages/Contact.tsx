import React from 'react';
import Contact from '../components/sections/Contact';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 pb-8"> {/* Changed py-8 to pt-24 pb-8 to add more top padding */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
        
        {/* Contact Section */}
        <Contact />
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">How do I book a driver?</h3>
              <p className="text-gray-600">
                You can book a driver through our online form, or by contacting us directly via WhatsApp or phone call. We recommend booking at least 2 hours in advance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">What are your operating hours?</h3>
              <p className="text-gray-600">
                Our regular operating hours are from 6:00 AM to 10:00 PM, seven days a week. For late night or early morning services, please book in advance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Do your drivers speak English?</h3>
              <p className="text-gray-600">
                Yes, all our drivers can communicate in English, Hindi, and Assamese to ensure seamless communication with our clients.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">How do I pay for the service?</h3>
              <p className="text-gray-600">
                Payment is made directly to the driver after your trip is completed. We accept cash, UPI payments, and online bank transfers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Can I book a driver for outstation trips?</h3>
              <p className="text-gray-600">
                Yes, we offer outstation trip services. For long trips, please provide details in advance so we can assign the right driver and arrange accommodations if necessary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
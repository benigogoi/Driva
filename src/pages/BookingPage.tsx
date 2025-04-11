import React from 'react';
import BookingForm from '../components/sections/BookingForm';
import WhatsAppButton from '../components/common/WhatsAppButton';

const BookingPage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Driver</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to book a driver, or contact us directly through WhatsApp for immediate assistance.
          </p>
          <div className="mt-6">
            <WhatsAppButton />
          </div>
        </div>
        
        {/* Booking Form */}
        <BookingForm />
        
        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Booking Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Hourly Rates</h3>
              <p className="text-gray-600">Our standard rate is ₹199/hour. Minimum booking duration is 2 hours.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Cancellation Policy</h3>
              <p className="text-gray-600">Free cancellation up to 2 hours before the scheduled pickup time. Late cancellations may incur a fee.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Payment Methods</h3>
              <p className="text-gray-600">Cash, UPI, or online bank transfer after the trip is completed.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Special Requests</h3>
              <p className="text-gray-600">For special requirements or emergency bookings, please contact us directly via WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
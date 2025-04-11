import React, { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  phoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  dateTime: string;
}

interface BookingFormProps {
  compact?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ compact = false }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    pickupLocation: '',
    dropoffLocation: '',
    dateTime: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Removed unused state variables and refs
  // const [showDateModal, setShowDateModal] = useState(false);
  // const [showTimeModal, setShowTimeModal] = useState(false);
  // const dateInputRef = useRef<HTMLInputElement>(null);
  // const timeInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup address is required';
    }
    
    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Dropoff address is required';
    }
    
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Set today's date as default if not already set
  useEffect(() => {
    if (!formData.dateTime) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      setFormData(prev => ({
        ...prev,
        dateTime: `${year}-${month}-${day}T${hours}:${minutes}`
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call - will be replaced with actual backend integration later
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        phoneNumber: '',
        pickupLocation: '',
        dropoffLocation: '',
        dateTime: '',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Compact form for hero section (Uber-style)
  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Phone Number fields (side by side) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-4 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors ${
                errors.fullName ? 'border-red-500' : ''
              }`}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
          </div>
          
          <div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className={`w-full px-4 py-4 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors ${
                errors.phoneNumber ? 'border-red-500' : ''
              }`}
            />
            {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
          </div>
        </div>
        
        {/* Pickup and Dropoff Locations (side by side) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Pickup Location */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              id="pickupLocation"
              name="pickupLocation"
              type="text"
              placeholder="Pickup location"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              className={`w-full pl-12 py-4 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors ${
                errors.pickupLocation ? 'border-red-500' : ''
              }`}
            />
            {errors.pickupLocation && <p className="mt-1 text-xs text-red-600">{errors.pickupLocation}</p>}
          </div>
          
          {/* Dropoff Location */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              id="dropoffLocation"
              name="dropoffLocation"
              type="text"
              placeholder="Dropoff location"
              value={formData.dropoffLocation}
              onChange={handleChange}
              required
              className={`w-full pl-12 py-4 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors ${
                errors.dropoffLocation ? 'border-red-500' : ''
              }`}
            />
            {errors.dropoffLocation && <p className="mt-1 text-xs text-red-600">{errors.dropoffLocation}</p>}
          </div>
        </div>
        
        {/* Date and Time selectors (side by side) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <button
              type="button"
              className="w-full text-left pl-12 py-4 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors text-gray-500"
            >
              {formData.dateTime && formData.dateTime.split('T')[0] ? 
                new Date(formData.dateTime.split('T')[0]).toLocaleDateString() : 
                'Today'}
            </button>
            <input
              id="hiddenDatePicker"
              name="datePicker"
              type="date"
              value={formData.dateTime ? formData.dateTime.split('T')[0] : ''}
              onChange={(e) => {
                const currentTimeValue = formData.dateTime ? formData.dateTime.split('T')[1] : '00:00';
                setFormData(prev => ({
                  ...prev,
                  dateTime: `${e.target.value}T${currentTimeValue}`
                }));
              }}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
              aria-label="Select date"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <button
              type="button"
              className="w-full text-left pl-12 py-4 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors text-gray-500"
            >
              {formData.dateTime && formData.dateTime.split('T')[1] ? 
                formData.dateTime.split('T')[1].substring(0, 5) : 
                'Now'}
            </button>
            <input
              id="hiddenTimePicker"
              name="timePicker"
              type="time"
              value={formData.dateTime ? formData.dateTime.split('T')[1] : ''}
              onChange={(e) => {
                const currentDateValue = formData.dateTime ? formData.dateTime.split('T')[0] : new Date().toISOString().split('T')[0];
                setFormData(prev => ({
                  ...prev,
                  dateTime: `${currentDateValue}T${e.target.value}`
                }));
              }}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
              aria-label="Select time"
            />
          </div>
        </div>
        
        {/* Hidden datetime field to store the combined value */}
        <input
          id="dateTime"
          name="dateTime"
          type="hidden"
          value={formData.dateTime}
        />
        
        <button
          type="submit"
          className="w-full mt-2 py-4 bg-blue-600 text-white text-base font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    );
  }

  // Full form for booking page (also updated to match the new layout)
  return (
    <section id="booking" className={compact ? '' : 'py-16'}>
      <div className={compact ? '' : 'container mx-auto px-4'}>
        <div className={compact ? '' : 'max-w-2xl mx-auto'}>
          {!compact && <h2 className="text-3xl font-bold text-center mb-8">Book a Driver</h2>}
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p>Your booking has been submitted successfully! We'll contact you shortly to confirm.</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.phoneNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    id="pickupLocation"
                    name="pickupLocation"
                    type="text"
                    placeholder="Your pickup location"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.pickupLocation ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.pickupLocation && <p className="mt-1 text-xs text-red-600">{errors.pickupLocation}</p>}
              </div>
              
              <div>
                <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Dropoff Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    id="dropoffLocation"
                    name="dropoffLocation"
                    type="text"
                    placeholder="Your destination"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    required
                    className={`w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.dropoffLocation ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.dropoffLocation && <p className="mt-1 text-xs text-red-600">{errors.dropoffLocation}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className={`w-full text-left pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.dateTime ? 'border-red-500' : ''
                    } text-gray-700`}
                  >
                    {formData.dateTime && formData.dateTime.split('T')[0] ? 
                      new Date(formData.dateTime.split('T')[0]).toLocaleDateString() : 
                      'Today'}
                  </button>
                  <input
                    id="hiddenFullFormDatePicker"
                    name="datePicker"
                    type="date"
                    value={formData.dateTime ? formData.dateTime.split('T')[0] : ''}
                    onChange={(e) => {
                      const currentTimeValue = formData.dateTime ? formData.dateTime.split('T')[1] : '00:00';
                      setFormData(prev => ({
                        ...prev,
                        dateTime: `${e.target.value}T${currentTimeValue}`
                      }));
                    }}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  />
                </div>
                {errors.dateTime && <p className="mt-1 text-xs text-red-600">{errors.dateTime}</p>}
              </div>
              
              <div>
                <label htmlFor="timePicker" className="block text-sm font-medium text-gray-700 mb-1">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className={`w-full text-left pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.dateTime ? 'border-red-500' : ''
                    } text-gray-700`}
                  >
                    {formData.dateTime && formData.dateTime.split('T')[1] ? 
                      formData.dateTime.split('T')[1].substring(0, 5) : 
                      'Now'}
                  </button>
                  <input
                    id="hiddenFullFormTimePicker"
                    name="timePicker"
                    type="time"
                    value={formData.dateTime ? formData.dateTime.split('T')[1] : ''}
                    onChange={(e) => {
                      const currentDateValue = formData.dateTime ? formData.dateTime.split('T')[0] : new Date().toISOString().split('T')[0];
                      setFormData(prev => ({
                        ...prev,
                        dateTime: `${currentDateValue}T${e.target.value}`
                      }));
                    }}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  />
                </div>
              </div>
              
              {/* Hidden datetime field to store the combined value */}
              <input
                id="fullFormDateTime"
                name="dateTime"
                type="hidden"
                value={formData.dateTime}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-base font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
import React, { useState, useRef, useEffect } from 'react';

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

  // Date and Time picker related states
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

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

  // Handle Date Selection
  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTimeValue = formData.dateTime ? formData.dateTime.split('T')[1] : '12:00';
    setFormData(prev => ({
      ...prev,
      dateTime: `${e.target.value}T${currentTimeValue}`
    }));
    setShowDateModal(false);
  };
  
  // Handle Time Selection
  const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDateValue = formData.dateTime ? formData.dateTime.split('T')[0] : new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      dateTime: `${currentDateValue}T${e.target.value}`
    }));
    setShowTimeModal(false);
  };
  
  // Open date picker modal
  const openDatePicker = () => {
    setShowDateModal(true);
    // Focus after modal is shown
    setTimeout(() => {
      if (dateInputRef.current) {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }, 100);
  };
  
  // Open time picker modal
  const openTimePicker = () => {
    setShowTimeModal(true);
    // Focus after modal is shown
    setTimeout(() => {
      if (timeInputRef.current) {
        timeInputRef.current.focus();
        timeInputRef.current.click();
      }
    }, 100);
  };
  
  // Set to today
  const handleTodayClick = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentTime = formData.dateTime ? formData.dateTime.split('T')[1] : '12:00';
    
    setFormData(prev => ({
      ...prev,
      dateTime: `${year}-${month}-${day}T${currentTime}`
    }));
    setShowDateModal(false);
  };
  
  // Set to now
  const handleNowClick = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentDate = formData.dateTime ? formData.dateTime.split('T')[0] : new Date().toISOString().split('T')[0];
    
    setFormData(prev => ({
      ...prev,
      dateTime: `${currentDate}T${hours}:${minutes}`
    }));
    setShowTimeModal(false);
  };

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

  // Conditionally render the form based on compact prop
  if (compact) {
    return renderCompactForm();
  }

  return renderFullForm();

  // Compact form render method
  function renderCompactForm() {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Similar compact form implementation as before */}
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
          
          {/* Rest of the compact form remains the same */}
        </div>
        
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

  // Full form render method
  function renderFullForm() {
    return (
      <section id="booking" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book a Driver</h2>
            
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p>Your booking has been submitted successfully! We'll contact you shortly to confirm.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Similar full form implementation as before */}
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
                
                {/* Rest of the full form remains the same */}
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
  }
};

export default BookingForm;
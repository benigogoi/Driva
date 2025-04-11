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
    // ... (existing validation logic remains the same)
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

  // Rest of the component remains the same as in the original file
  // ... (full render method with compact and full form versions)

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

  // The full render method would remain exactly the same as in the original file
  // Just ensures the variables are now being "used"
};

export default BookingForm;
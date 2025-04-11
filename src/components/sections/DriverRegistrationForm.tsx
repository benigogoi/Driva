import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import FileUpload from '../common/FileUpload';
import Button from '../common/Button';

interface DriverFormData {
  name: string;
  phoneNumber: string;
  experience: string;
  preferredShift: 'day' | 'night' | 'both';
}

interface DriverFormFiles {
  drivingLicense: File | null;
  idProof: File | null;
}

const DriverRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<DriverFormData>({
    name: '',
    phoneNumber: '',
    experience: '',
    preferredShift: 'both'
  });
  
  const [formFiles, setFormFiles] = useState<DriverFormFiles>({
    drivingLicense: null,
    idProof: null
  });
  
  const [errors, setErrors] = useState<Partial<DriverFormData>>({});
  const [fileErrors, setFileErrors] = useState<Partial<Record<keyof DriverFormFiles, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof DriverFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (name: keyof DriverFormFiles) => (file: File | null) => {
    setFormFiles(prev => ({
      ...prev,
      [name]: file
    }));
    
    // Clear error for this file when user uploads a new one
    if (fileErrors[name]) {
      setFileErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DriverFormData> = {};
    const newFileErrors: Partial<Record<keyof DriverFormFiles, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }
    
    if (!formFiles.drivingLicense) {
      newFileErrors.drivingLicense = 'Driving license is required';
    }
    
    if (!formFiles.idProof) {
      newFileErrors.idProof = 'ID proof is required';
    }
    
    setErrors(newErrors);
    setFileErrors(newFileErrors);
    
    return Object.keys(newErrors).length === 0 && Object.keys(newFileErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call - will be replaced with actual backend integration later
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log form data and files
      console.log('Form submitted:', formData);
      console.log('Files:', formFiles);
      
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        phoneNumber: '',
        experience: '',
        preferredShift: 'both'
      });
      
      setFormFiles({
        drivingLicense: null,
        idProof: null
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Become a Driva Partner Today!</h2>
          <p className="text-center text-gray-600 mb-8">Earn weekly. Work with trusted clients. Drive local.</p>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p>Your application has been submitted successfully! We'll review your details and get back to you soon.</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="name"
                label="Full Name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
              />
              
              <FormInput
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                error={errors.phoneNumber}
              />
            </div>
            
            <FileUpload
              id="drivingLicense"
              label="Upload Driving License"
              required
              error={fileErrors.drivingLicense}
              onChange={handleFileChange('drivingLicense')}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="experience"
                label="Experience (years)"
                type="number"
                placeholder="Years of driving experience"
                value={formData.experience}
                onChange={handleChange}
                required
                error={errors.experience}
              />
              
              <div className="mb-4">
                <label 
                  htmlFor="preferredShift" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preferred Shift
                </label>
                <select
                  id="preferredShift"
                  name="preferredShift"
                  value={formData.preferredShift}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            
            <FileUpload
              id="idProof"
              label="Upload Aadhaar/Voter ID"
              required
              error={fileErrors.idProof}
              onChange={handleFileChange('idProof')}
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Application...' : 'Apply Now'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DriverRegistrationForm;
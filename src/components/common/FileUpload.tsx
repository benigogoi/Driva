import React, { useState, useRef } from 'react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
  error?: string;
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept = 'image/*,.pdf',
  required = false,
  error,
  onChange,
  maxSizeMB = 5 // Default max file size: 5MB
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [localError, setLocalError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setLocalError(`File size exceeds maximum allowed (${maxSizeMB}MB)`);
        setFileName('');
        onChange(null);
        return;
      }
      
      setFileName(file.name);
      setLocalError('');
      onChange(file);
    } else {
      setFileName('');
      onChange(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="flex items-center">
        <input
          id={id}
          name={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
          ref={fileInputRef}
          required={required}
        />
        
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-l-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Choose File
        </button>
        
        <div className="flex-grow px-3 py-2 border border-l-0 rounded-r-md bg-gray-50 text-gray-500 text-sm">
          {fileName || 'No file chosen'}
        </div>
      </div>
      
      {(localError || error) && (
        <p className="mt-1 text-sm text-red-600">{localError || error}</p>
      )}
      
      <p className="mt-1 text-xs text-gray-500">
        Max file size: {maxSizeMB}MB. Accepted formats: images and PDF.
      </p>
    </div>
  );
};

export default FileUpload;
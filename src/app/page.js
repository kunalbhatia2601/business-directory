'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedProfession, setSelectedProfession] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    name: '',
    address: '',
    experience: '',
    phone: '',
    images: [null, null, null, null],
    imagePreviewUrls: [null, null, null, null]
  });

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      formData.imagePreviewUrls.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const professions = [
    'Doctor',
    'Lawyer',
    'Engineer',
    'Teacher',
    'Accountant',
    'Consultant',
    'Designer',
    'Developer'
  ];

  const categories = {
    Doctor: ['General Practitioner', 'Specialist', 'Surgeon'],
    Lawyer: ['Corporate Law', 'Criminal Law', 'Family Law'],
    Engineer: ['Software', 'Civil', 'Mechanical'],
    Teacher: ['Primary Education', 'Secondary Education', 'Higher Education'],
    Accountant: ['Tax Accounting', 'Audit', 'Financial Planning'],
    Consultant: ['Business Consultant', 'IT Consultant', 'Management Consultant'],
    Designer: ['Graphic Designer', 'Interior Designer', 'Web Designer'],
    Developer: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer']
  };

  const subCategories = {
    // Doctor sub-categories
    'General Practitioner': ['Family Medicine', 'Internal Medicine', 'Preventive Medicine'],
    'Specialist': ['Cardiology', 'Neurology', 'Dermatology', 'Psychiatry', 'Oncology', 'Endocrinology'],
    'Surgeon': ['General Surgery', 'Orthopedic Surgery', 'Cardiac Surgery', 'Plastic Surgery', 'Neurosurgery'],
    
    // Lawyer sub-categories
    'Corporate Law': ['Mergers & Acquisitions', 'Securities Law', 'Corporate Compliance', 'Contract Law'],
    'Criminal Law': ['Defense Attorney', 'Prosecutor', 'DUI Defense', 'White Collar Crime'],
    'Family Law': ['Divorce Law', 'Child Custody', 'Adoption', 'Domestic Relations'],
    
    // Engineer sub-categories
    'Software': ['Web Development', 'Mobile Apps', 'AI/ML', 'DevOps', 'Cybersecurity'],
    'Civil': ['Construction', 'Infrastructure', 'Environmental', 'Transportation', 'Water Resources'],
    'Mechanical': ['Automotive', 'Manufacturing', 'HVAC', 'Aerospace', 'Robotics'],
    
    // Teacher sub-categories
    'Primary Education': ['Kindergarten', 'Elementary (K-5)', 'Special Education', 'ESL Teaching'],
    'Secondary Education': ['Middle School (6-8)', 'High School (9-12)', 'Subject Specialist', 'School Counseling'],
    'Higher Education': ['University Professor', 'Community College', 'Research', 'Academic Administration'],
    
    // Accountant sub-categories
    'Tax Accounting': ['Individual Tax', 'Corporate Tax', 'Tax Planning', 'Tax Resolution'],
    'Audit': ['External Audit', 'Internal Audit', 'Forensic Accounting', 'Compliance Audit'],
    'Financial Planning': ['Personal Finance', 'Investment Advisory', 'Retirement Planning', 'Estate Planning'],
    
    // Consultant sub-categories
    'Business Consultant': ['Strategy Consulting', 'Operations Consulting', 'Process Improvement', 'Change Management'],
    'IT Consultant': ['Systems Integration', 'Cloud Migration', 'Digital Transformation', 'IT Security'],
    'Management Consultant': ['Leadership Development', 'Organizational Design', 'Performance Management', 'HR Consulting'],
    
    // Designer sub-categories
    'Graphic Designer': ['Brand Design', 'Print Design', 'Digital Design', 'Packaging Design'],
    'Interior Designer': ['Residential Design', 'Commercial Design', 'Space Planning', 'Furniture Design'],
    'Web Designer': ['UI/UX Design', 'Responsive Design', 'E-commerce Design', 'Landing Page Design'],
    
    // Developer sub-categories
    'Frontend Developer': ['React Development', 'Vue.js Development', 'Angular Development', 'Mobile UI Development'],
    'Backend Developer': ['API Development', 'Database Design', 'Server Architecture', 'Microservices'],
    'Full Stack Developer': ['MEAN Stack', 'MERN Stack', 'Django Development', 'Laravel Development']
  };

  const handleProfessionChange = (e) => {
    setSelectedProfession(e.target.value);
    // Clean up any existing preview URLs
    formData.imagePreviewUrls.forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
    setFormData({
      category: '',
      subCategory: '',
      name: '',
      address: '',
      experience: '',
      phone: '',
      images: [null, null, null, null],
      imagePreviewUrls: [null, null, null, null]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Clean up previous preview URL if it exists
      if (formData.imagePreviewUrls[index]) {
        URL.revokeObjectURL(formData.imagePreviewUrls[index]);
      }
      
      // Create new preview URL
      const previewUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        images: prev.images.map((img, i) => i === index ? file : img),
        imagePreviewUrls: prev.imagePreviewUrls.map((url, i) => i === index ? previewUrl : url)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { profession: selectedProfession, ...formData });
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Profession dropdown */}
            <div className="flex items-center">
              <select
                value={selectedProfession}
                onChange={handleProfessionChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Profession</option>
                {professions.map(profession => (
                  <option key={profession} value={profession}>{profession}</option>
                ))}
              </select>
            </div>

            {/* Center - Title */}
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Business Directory
              </h1>
            </div>

            {/* Right side - Theme toggle */}
            {/* <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  // Sun icon for light mode
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  // Moon icon for dark mode
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {selectedProfession ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl p-6 transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {selectedProfession} Registration Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category and Sub Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories[selectedProfession]?.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition-colors"
                    disabled={!formData.category}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories[formData.category]?.map(subCat => (
                      <option key={subCat} value={subCat}>{subCat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience (in years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Image Upload Grid */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Upload Images (4 images max)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map(index => (
                    <div key={index} className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                        className="hidden"
                        id={`image-${index}`}
                      />
                      <label
                        htmlFor={`image-${index}`}
                        className="block w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-gray-50 dark:bg-gray-700/50 overflow-hidden"
                      >
                        {formData.imagePreviewUrls[index] ? (
                          <div className="relative w-full h-full">
                            <img
                              src={formData.imagePreviewUrls[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="text-white text-sm font-medium">
                                Click to change
                              </div>
                            </div>
                            <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              ✓
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="text-gray-400 dark:text-gray-500 text-2xl mb-2">+</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Upload Image {index + 1}</div>
                          </div>
                        )}
                      </label>
                      {formData.images[index] && (
                        <button
                          type="button"
                          onClick={() => {
                            // Clean up preview URL
                            if (formData.imagePreviewUrls[index]) {
                              URL.revokeObjectURL(formData.imagePreviewUrls[index]);
                            }
                            setFormData(prev => ({
                              ...prev,
                              images: prev.images.map((img, i) => i === index ? null : img),
                              imagePreviewUrls: prev.imagePreviewUrls.map((url, i) => i === index ? null : url)
                            }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-lg transition-colors"
                          title="Remove image"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl p-8 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Business Directory Registration
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please select a profession from the dropdown in the header to begin registration.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

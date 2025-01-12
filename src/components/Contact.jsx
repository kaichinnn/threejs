import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Globe, 
  Clock, 
  Calendar, 
  RefreshCw, 
  Shield 
} from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [captcha, setCaptcha] = useState({
    num1: 0,
    num2: 0,
    answer: '',
    isCorrect: false
  });

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptcha({
      num1,
      num2,
      answer: '',
      isCorrect: false
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const verifyCaptcha = (value) => {
    const userAnswer = parseInt(value, 10);
    const correctAnswer = captcha.num1 + captcha.num2;
    const isCorrect = userAnswer === correctAnswer;
    setCaptcha(prev => ({ ...prev, answer: value, isCorrect }));
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      verifyCaptcha(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (!captcha.isCorrect) {
      newErrors.captcha = 'Please solve the captcha correctly';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors in the form');
      return;
    }
  
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('form-name', 'contact');
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
  
      // Submit the form
      const response = await fetch('/', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      generateCaptcha();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="pt-20 text-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative mb-12">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[100vh] lg:hidden" 
              style={{
                content: "''",
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                background: 'rgba(255, 255, 255, 0.001)',
                WebkitMask: 'radial-gradient(ellipse 150% 80% at center, white, white 5%, transparent 20%)',
                mask: 'radial-gradient(ellipse 120% 80% at center, white, white 5%, transparent 20%)'
              }}
            ></div>
            <div className="relative text-center">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Let's Build Something Together
              </h2>
              <p className="text-xl text-gray-400">
                Have a project in mind? Let's discuss how we can collaborate.
              </p>
            </div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-8">
              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-sm" />
                <div className="relative space-y-6 p-6 rounded-xl bg-slate-900 bg-opacity-60 border border-gray-800/50">
                  <ContactInfo
                    icon={<Mail className="text-blue-400" />}
                    title="Email"
                    content="hokaichin@gmail.com"
                  />
                  <ContactInfo
                    icon={<Phone className="text-green-400" />}
                    title="Phone"
                    content="+65 9855 9959"
                  />
                  <ContactInfo
                    icon={<MapPin className="text-red-400" />}
                    title="Location"
                    content="Singapore"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-sm" />
                <div className="relative p-6 rounded-xl bg-slate-900 bg-opacity-60 border border-gray-800/50">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Working Hours & Availability
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 text-gray-300">
                      <Globe className="w-5 h-5 mt-1 flex-shrink-0 text-indigo-400" />
                      <p>Available for clients worldwide</p>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-300">
                      <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" />
                      <p>Flexible scheduling to accommodate different time zones</p>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-300">
                      <Calendar className="w-5 h-5 mt-1 flex-shrink-0 text-green-400" />
                      <p>Core hours: 9 AM - 6 PM (GMT+8)<br />Available for scheduled calls outside these hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16 p-6 rounded-xl bg-slate-900 bg-opacity-50 border border-gray-800/50">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-netlify="true"
                name="contact"
                method="POST"
                netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <input name="bot-field" />
                </div>

                <FormField
                  label="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={isSubmitting}
                />

                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isSubmitting}
                />

                <FormField
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  disabled={isSubmitting}
                />

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.message 
                        ? 'border-red-500' 
                        : 'border-gray-600 focus:border-blue-500'
                    } bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
                    placeholder="Write your message here..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Verify you're human
                  </label>
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-indigo-400" />
                      <span className="text-gray-300">
                        {captcha.num1} + {captcha.num2} = ?
                      </span>
                    </div>
                    <input
                      type="text"
                      value={captcha.answer}
                      onChange={handleCaptchaChange}
                      className="w-20 px-3 py-2 rounded-lg border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:border-blue-500"
                      placeholder="Answer"
                    />
                    <motion.button
                      type="button"
                      onClick={generateCaptcha}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 
                        text-gray-300 transition-colors duration-200"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.button>
                  </div>
                  {errors.captcha && (
                    <p className="text-sm text-red-400">{errors.captcha}</p>
                  )}
                  {captcha.answer !== '' && captcha.isCorrect && (
                    <p className="text-sm text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Correct!
                    </p>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 rounded-lg ${
                        submitStatus === 'success'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {submitStatus === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span>{submitMessage}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !captcha.isCorrect}
                  whileHover={{ scale: (!isSubmitting && captcha.isCorrect) ? 1.02 : 1 }}
                  whileTap={{ scale: (!isSubmitting && captcha.isCorrect) ? 0.98 : 1 }}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg 
                    ${captcha.isCorrect 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-600 cursor-not-allowed'}
                    text-white disabled:opacity-50 
                    transition-all duration-300 ease-in-out 
                    transform hover:shadow-xl`}
                >
                  {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, content }) => (
  <div className="flex items-start space-x-3">
    <div className="p-2 rounded-lg bg-gray-700">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-white">
        {title}
      </h4>
      <p className="text-gray-400">
        {content}
      </p>
    </div>
  </div>
);

const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  disabled
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium mb-1 text-gray-300"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-lg border 
        ${error ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}
        bg-gray-700 text-white placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        disabled:opacity-50 disabled:cursor-not-allowed 
        transition-colors duration-200`}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-400">{error}</p>
    )}
  </div>
);

export default Contact;
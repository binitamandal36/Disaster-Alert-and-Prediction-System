import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: in a real app you would send to backend or mailto
    alert("Thank you. Your message has been sent. We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#2C3E50] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get in touch for questions about early warning systems, support, or partnerships.
          </p>
        </div>
      </div>

      {/* Main: form + contact details (Telegrafia-style) */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Contact form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="e.g. General inquiry, Support"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-y"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Contact details + image (Telegrafia-style) */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact information</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold shrink-0">Address</span>
                  <span>[Your office address]</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold shrink-0">Email</span>
                  <a href="mailto:your-email@example.com" className="text-red-600 hover:underline">
                    your-email@example.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold shrink-0">Phone</span>
                  <a href="tel:+1234567890" className="text-gray-700 hover:text-red-600">
                    +1 234 567 890
                  </a>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              Disaster Alert System is an academic project. For project or viva-related
              questions, reach out using the form or details above.
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src="/images/contact-centre.jpg"
                alt="Control centre"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

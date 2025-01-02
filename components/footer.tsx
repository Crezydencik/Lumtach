'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';


interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}
export default function Footer() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    const phoneRegex = /^(\+?[0-9]{1,4})?[0-9]{8,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = t('footer.errors.nameRequired');
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('footer.errors.invalidPhone');
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('footer.errors.invalidEmail');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('footer.errors.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/sendmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage(t('footer.successMessage'));
          setFormData({ name: '', phone: '', email: '', message: '' });
          setErrors({});
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ server: t('footer.errors.serverError') });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <footer id='contact' className="bg-black text-white p-12">
      <div className="md:flex ">
        {/* Contact Form */}
        <div className="pr-6 rounded-lg md:w-[33%]">
          <h3 className="text-lime-400 text-sm font-mono mb-4">{t('footer.contactUs')}</h3>
          <h2 className="text-[rgba(255, 255, 255, 40)] md:text-4xl font-bold mb-6">
            {t('footer.wantTo')} 
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="formLabel" htmlFor="name">
                {t('footer.form.name')}
                {errors.name && <span className="text-red-500 text-sm ml-2">{errors.name}</span>}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-style ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                placeholder={t('footer.placeholders.name')}
              />
            </div>

            <div className="relative">
              <label className="formLabel" htmlFor="phone">
                {t('footer.form.phone')}
                {errors.phone && <span className="text-red-500 text-sm ml-2">{errors.phone}</span>}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-style ${errors.phone ? 'border-red-500' : 'border-gray-700'}`}
                placeholder={t('footer.placeholders.phone')}
              />
            </div>

            <div className="relative">
              <label className="formLabel" htmlFor="email">
                {t('footer.form.email')}
                {errors.email && <span className="text-red-500 text-sm ml-2">{errors.email}</span>}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-style ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                placeholder={t('footer.placeholders.email')}
              />
            </div>

            <div className="relative">
              <label className="formLabel" htmlFor="message">
                {t('footer.form.message')}
                {errors.message && <span className="text-red-500 text-sm ml-2">{errors.message}</span>}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-style ${errors.message ? 'border-red-500' : 'border-gray-700'}`}
                placeholder={t('footer.placeholders.message')}
              ></textarea>
            </div>

            <button type="submit" className="button button--primary">
              {t('footer.submit')}
            </button>

            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errors.server && <p className="text-red-500 mt-4">{errors.server}</p>}
          </form>
        </div>
    <div className="md:flex justify-between md:w-[67%]">

        {/* Navigation and Contact Details */}
        <div className="">
          <div>
            <h3 className="text-lime-400 text-sm font-mono mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                {t('footer.links.company')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                {t('footer.links.team')}
                </Link>
              </li> */}
              <li>
                <Link href="#project" className="text-gray-400 hover:text-white">
                {t('footer.links.projects')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lime-400 text-sm font-mono mb-4 mt-2">{t('footer.info')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white">
                {t('footer.links.services')}
                </Link>
              </li>
              <li>
                <Link href="#advant" className="text-gray-400 hover:text-white">
                {t('footer.links.advantages')}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white">
                {t('footer.links.faq')}
                </Link>
              </li>
            </ul>
          </div>
          </div>
        <div className="">
          <div>
            <h3 className="text-lime-400 text-sm font-mono mb-4">{t('footer.contact.contacts')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">+37129992017</li>
              <li className="text-gray-400">lumtach@gmail.com</li>
              <li className="text-gray-400"> {t('footer.contact.address')}</li>
            </ul>
          </div>
        </div>
        {/* Logo and Social Links */}
        <div className="">
          <div className="flex justify-center lg:justify-end">
            <Link href="/" className="flex items-center mb-4">
            <Image
              src="/lumtech-logo.svg"
              alt="Lumtech"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
            </Link>
          </div>
          </div>
      </div>
    </div>
        <div className="center">
          <div className="flex space-x-4 justify-center mb-4">
            <Link href="https://www.facebook.com/lumtach"   target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="https://www.instagram.com/lumtach/"   target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </Link>
            {/* <Link href="#" className="text-gray-400 hover:text-white">
              <Youtube className="w-6 h-6" />
            </Link> */}
            {/* <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </Link> */}
          </div>
          <div className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()}  {t('footer.bottomText')}
          </div>
        </div>
    </footer>
  );
}

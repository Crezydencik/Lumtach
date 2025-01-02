'use client';

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().required(t('footer.errors.nameRequired')),
    phone: Yup.string()
      .matches(
        /^(\+?[0-9]{1,4})?[0-9]{8,15}$/,
        t('footer.errors.invalidPhone')
      )
      .required(t('footer.errors.nameRequired')),
    email: Yup.string()
      .email(t('footer.errors.invalidEmail'))
      .required(t('footer.errors.nameRequired')),
    message: Yup.string().required(t('footer.errors.messageRequired')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('/api/sendmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          resetForm();
          alert(t('footer.successMessage'));
        } else {
          alert(t('footer.errors.serverError'));
        }
      } catch (error) {
        console.error(error);
        alert(t('footer.errors.serverError'));
      }
    },
  });

  return (
    <footer id="contact" className="bg-black text-white p-12">
      <div className="md:flex">
        {/* Contact Form */}
        <div className="pr-6 rounded-lg md:w-[33%]">
          <h3 className="text-lime-400 text-sm font-mono mb-4">
            {t('footer.contactUs')}
          </h3>
          <h2 className="text-[rgba(255, 255, 255, 40)] md:text-4xl font-bold mb-6">
            {t('footer.wantTo')}
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="formLabel">
                {t('footer.form.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-style ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-gray-700'
                }`}
                placeholder={t('footer.placeholders.name')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="formLabel">
                {t('footer.form.phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className={`form-style ${
                  formik.touched.phone && formik.errors.phone
                    ? 'border-red-500'
                    : 'border-gray-700'
                }`}
                placeholder={t('footer.placeholders.phone')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="formLabel">
                {t('footer.form.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-style ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-700'
                }`}
                placeholder={t('footer.placeholders.email')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="formLabel">
                {t('footer.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                className={`form-style ${
                  formik.touched.message && formik.errors.message
                    ? 'border-red-500'
                    : 'border-gray-700'
                }`}
                placeholder={t('footer.placeholders.message')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm">{formik.errors.message}</p>
              )}
            </div>

            <button type="submit" className="button button--primary">
              {t('footer.submit')}
            </button>
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

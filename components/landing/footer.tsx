'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(t('footer.errors.nameRequired')),
    phone: Yup.string()
      .trim()
      .matches(/^(\+?[0-9]{1,4})?[0-9]{8,15}$/, t('footer.errors.invalidPhone'))
      .required(t('footer.errors.nameRequired')),
    email: Yup.string()
      .trim()
      .email(t('footer.errors.invalidEmail'))
      .required(t('footer.errors.nameRequired')),
    message: Yup.string().trim().required(t('footer.errors.messageRequired')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      setSubmitMessage('');
      setSubmitError('');

      try {
        const response = await fetch('/api/sendmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          if (payload?.fieldErrors) {
            helpers.setErrors(payload.fieldErrors);
          }

          setSubmitError(payload?.error || t('footer.errors.serverError'));
          return;
        }

        helpers.resetForm();
        setSubmitMessage(t('footer.successMessage'));
      } catch (error) {
        console.error(error);
        setSubmitError(t('footer.errors.serverError'));
      }
    },
  });

  const hasError = (field: keyof typeof formik.values) =>
    Boolean(formik.touched[field] && formik.errors[field]);

  const getInputClassName = (field: keyof typeof formik.values) =>
    [
      'w-full rounded-[18px] border bg-[#101014] px-5 pb-3 pt-7 text-[15px] text-white outline-none transition',
      hasError(field) ? 'border-red-500/80 focus:border-red-400' : 'border-white/18 focus:border-white/45',
    ].join(' ');

  const inputLabelClassName =
    'pointer-events-none absolute left-5 top-3 text-[10px] font-mono uppercase tracking-[0.16em] text-white/45';
  const errorClassName = 'mt-2 text-xs text-red-400';

  return (
    <footer id="contact" className="px-3 pb-8 pt-12 text-white md:px-8 xl:px-10">
      <div className="mx-auto max-w-[1560px]">
        <div className="overflow-hidden">
          <div className="grid gap-0 xl:grid-cols-[460px_minmax(0,1fr)]">
            <div className="rounded-[22px] bg-[#0f0f12] p-5 md:p-8 xl:min-h-[680px] xl:rounded-none xl:bg-transparent xl:p-10">
              <div className="mb-8">
                <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#A6EB53]">
                  {t('footer.contactUs')}
                </p>
                <h2 className="max-w-[320px] text-[22px] font-semibold uppercase leading-tight text-white md:text-4xl">
                  {t('footer.wantTo')}?
                </h2>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
                <div className="relative">
                  <label htmlFor="name" className={inputLabelClassName}>
                    {t('footer.form.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('footer.placeholders.name')}
                    className={getInputClassName('name')}
                    aria-invalid={hasError('name')}
                  />
                  {hasError('name') ? <p className={errorClassName}>{formik.errors.name}</p> : null}
                </div>

                <div className="relative">
                  <label htmlFor="phone" className={inputLabelClassName}>
                    {t('footer.form.phone')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('footer.placeholders.phone')}
                    className={getInputClassName('phone')}
                    aria-invalid={hasError('phone')}
                  />
                  {hasError('phone') ? <p className={errorClassName}>{formik.errors.phone}</p> : null}
                </div>

                <div className="relative">
                  <label htmlFor="email" className={inputLabelClassName}>
                    {t('footer.form.email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('footer.placeholders.email')}
                    className={getInputClassName('email')}
                    aria-invalid={hasError('email')}
                  />
                  {hasError('email') ? <p className={errorClassName}>{formik.errors.email}</p> : null}
                </div>

                <div className="relative">
                  <label htmlFor="message" className={inputLabelClassName}>
                    {t('footer.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('footer.placeholders.message')}
                    className={`${getInputClassName('message')} min-h-[174px] resize-none`}
                    aria-invalid={hasError('message')}
                  />
                  {hasError('message') ? <p className={errorClassName}>{formik.errors.message}</p> : null}
                </div>

                {submitError ? <p className="text-sm text-red-400">{submitError}</p> : null}
                {submitMessage ? <p className="text-sm text-[#B8F34A]">{submitMessage}</p> : null}

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="min-h-[52px] rounded-full bg-[#B8F34A] px-7 text-sm font-semibold text-black hover:bg-[#a6eb53] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formik.isSubmitting ? 'Sending...' : t('footer.submit')}
                </button>
              </form>

              <div className="mt-8 text-[11px] text-white/35 xl:hidden">Privacy</div>
            </div>

            <div className="px-1 pt-8 md:px-2 md:pt-10 xl:min-h-[680px] xl:px-10 xl:pt-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <div className="flex justify-start xl:hidden">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/lumtech-logo.svg"
                      alt="Lumtech"
                      width={200}
                      height={48}
                      className="h-12 w-auto"
                    />
                  </Link>
                </div>

                <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start xl:gap-16">
                  <div className="flex justify-start xl:justify-center">
                    <div className="grid w-full max-w-[680px] gap-10 sm:grid-cols-2 xl:grid-cols-[240px_220px] xl:gap-x-24 xl:gap-y-14">
                      <div>
                        <h3 className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#A6EB53]">
                          {t('footer.about')}
                        </h3>
                        <ul className="space-y-3 text-sm text-white/75">
                          <li>
                            <Link href="#" className="transition hover:text-white">
                              {t('footer.links.company')}
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="transition hover:text-white">
                              {t('footer.links.team')}
                            </Link>
                          </li>
                          <li>
                            <Link href="#project" className="transition hover:text-white">
                              {t('footer.links.projects')}
                            </Link>
                          </li>
                        </ul>

                        <div className="mt-10 xl:mt-14">
                          <h3 className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#A6EB53]">
                            {t('footer.contact.contacts')}
                          </h3>
                          <ul className="space-y-3 text-sm text-white/75">
                            <li>+37129992017</li>
                            <li>lumtach@gmail.com</li>
                            <li>{t('footer.contact.address')}</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#A6EB53]">
                          {t('footer.info')}
                        </h3>
                        <ul className="space-y-3 text-sm text-white/75">
                          <li>
                            <Link href="#services" className="transition hover:text-white">
                              {t('footer.links.services')}
                            </Link>
                          </li>
                          <li>
                            <Link href="#advant" className="transition hover:text-white">
                              {t('footer.links.advantages')}
                            </Link>
                          </li>
                          <li>
                            <Link href="#faq" className="transition hover:text-white">
                              {t('footer.links.faq')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="hidden xl:flex xl:justify-end xl:self-start">
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/lumtech-logo.svg"
                        alt="Lumtech"
                        width={240}
                        height={56}
                        className="h-14 w-auto"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-1 pt-8 md:px-2 xl:px-10 xl:pt-0">
            <div className="flex items-center justify-between border-t border-white/6 pt-5 text-sm text-white/45">
              <div className="hidden xl:block">Privacy</div>

              <div className="flex items-center gap-3">
                <Link
                  href="https://www.facebook.com/lumtach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#A6EB53] hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="https://www.instagram.com/lumtach/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#A6EB53] hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </div>

              <div className="text-right text-[11px] sm:text-sm">
                &copy; {new Date().getFullYear()} {t('footer.bottomText')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

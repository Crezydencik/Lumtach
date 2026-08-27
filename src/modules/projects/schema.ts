import { z } from 'zod';
import { PROJECT_LOCALES } from './types';

function labelForLocale(locale: (typeof PROJECT_LOCALES)[number]) {
  switch (locale) {
    case 'ru':
      return 'русском';
    case 'en':
      return 'английском';
    case 'lv':
      return 'латышском';
    default:
      return locale;
  }
}

const projectTranslationSchema = z.object({
  title: z.string().trim().min(1, 'Введите название.').max(160, 'Название слишком длинное.'),
  description: z
    .string()
    .trim()
    .min(1, 'Введите описание.')
    .max(5000, 'Описание слишком длинное.'),
  features: z
    .array(z.string().trim().min(1, 'Пустые строки в списке фич не допускаются.').max(120))
    .max(8, 'Можно добавить максимум 8 фич.'),
});

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, 'Укажите slug проекта.')
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'Slug может содержать только строчные буквы, цифры и дефисы.'),
  image: z.string().trim().min(1, 'Загрузите изображение проекта.').max(500),
  link: z.string().trim().url('Укажите корректную ссылку на проект.'),
  order: z.number().int().min(0, 'Порядок не может быть меньше 0.').max(9999),
  published: z.boolean(),
  translations: z.object(
    Object.fromEntries(
      PROJECT_LOCALES.map((locale) => [
        locale,
        projectTranslationSchema.superRefine((value, ctx) => {
          if (!value.title.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Заполните название на ${labelForLocale(locale)} языке.`,
              path: ['title'],
            });
          }

          if (!value.description.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Заполните описание на ${labelForLocale(locale)} языке.`,
              path: ['description'],
            });
          }
        }),
      ])
    ) as Record<(typeof PROJECT_LOCALES)[number], z.ZodTypeAny>
  ),
});

export const projectUpdateSchema = projectInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Нужно изменить хотя бы одно поле.'
);

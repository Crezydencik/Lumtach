'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, PencilLine, Plus, Search, Trash2 } from 'lucide-react';
import AdminShell from '@/components/admin/admin-shell';
import ImageUploadField from '@/components/admin/image-upload-field';
import { PROJECT_LOCALES, ProjectLocale, ProjectRecord } from '@/modules/projects/types';

type TranslationFormState = {
  title: string;
  description: string;
  featuresText: string;
};

type ProjectFormState = {
  slug: string;
  image: string;
  link: string;
  order: number;
  published: boolean;
  translations: Record<ProjectLocale, TranslationFormState>;
};

const EMPTY_TRANSLATION: TranslationFormState = {
  title: '',
  description: '',
  featuresText: '',
};

const EMPTY_FORM: ProjectFormState = {
  slug: '',
  image: '',
  link: '',
  order: 0,
  published: true,
  translations: {
    ru: { ...EMPTY_TRANSLATION },
    en: { ...EMPTY_TRANSLATION },
    lv: { ...EMPTY_TRANSLATION },
  },
};

function mapProjectToForm(project: ProjectRecord): ProjectFormState {
  return {
    slug: project.slug,
    image: project.image,
    link: project.link,
    order: project.order,
    published: project.published,
    translations: {
      ru: {
        title: project.translations.ru.title,
        description: project.translations.ru.description,
        featuresText: project.translations.ru.features.join('\n'),
      },
      en: {
        title: project.translations.en.title,
        description: project.translations.en.description,
        featuresText: project.translations.en.features.join('\n'),
      },
      lv: {
        title: project.translations.lv.title,
        description: project.translations.lv.description,
        featuresText: project.translations.lv.features.join('\n'),
      },
    },
  };
}

function mapFormToPayload(form: ProjectFormState) {
  return {
    slug: form.slug.trim(),
    image: form.image.trim(),
    link: form.link.trim(),
    order: Number(form.order),
    published: form.published,
    translations: Object.fromEntries(
      PROJECT_LOCALES.map((locale) => [
        locale,
        {
          title: form.translations[locale].title.trim(),
          description: form.translations[locale].description.trim(),
          features: form.translations[locale].featuresText
            .split('\n')
            .map((feature) => feature.trim())
            .filter(Boolean),
        },
      ])
    ),
  };
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedLocale, setSelectedLocale] = useState<ProjectLocale>('ru');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  async function loadProjects() {
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/projects', { cache: 'no-store' });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || 'Не удалось загрузить проекты.');
      }

      setProjects(payload.projects || []);
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить проекты.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const sortedProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const base = [...projects].sort((first, second) => first.order - second.order);

    if (!normalizedQuery) {
      return base;
    }

    return base.filter((project) => {
      const text = [
        project.slug,
        project.translations.ru.title,
        project.translations.en.title,
        project.translations.lv.title,
      ]
        .join(' ')
        .toLowerCase();

      return text.includes(normalizedQuery);
    });
  }, [projects, query]);

  const publishedCount = useMemo(
    () => projects.filter((project) => project.published).length,
    [projects]
  );

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSelectedLocale('ru');
    setSuccessMessage(null);
  }

  function updateTranslationField(locale: ProjectLocale, field: keyof TranslationFormState, value: string) {
    setForm((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: {
          ...current.translations[locale],
          [field]: value,
        },
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const payload = mapFormToPayload(form);
      const url = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Не удалось сохранить проект.');
      }

      await loadProjects();
      resetForm();
      setSuccessMessage(editingId ? 'Проект обновлён.' : 'Проект создан.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось сохранить проект.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить проект?')) {
      return;
    }

    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || 'Не удалось удалить проект.');
      }

      if (editingId === id) {
        resetForm();
      }

      await loadProjects();
      setSuccessMessage('Проект удалён.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось удалить проект.');
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/login';
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <AdminShell
      eyebrow="Admin"
      title="Управление проектами"
      description="Полноценная панель для контента сайта: редактирование карточек, языков, ссылок и загрузка изображений в одном месте."
      stats={[
        { label: 'Всего проектов', value: String(projects.length) },
        { label: 'Опубликовано', value: String(publishedCount) },
        { label: 'Языков', value: String(PROJECT_LOCALES.length) },
      ]}
      actions={
        <>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full bg-[#A6EB53] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#93d246]"
          >
            <Plus className="h-4 w-4" />
            Новый проект
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/75 transition hover:border-red-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoggingOut ? 'Выход...' : 'Выйти'}
          </button>
        </>
      }
    >
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_520px]">
        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/8 bg-[#101014] p-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск по slug или названию проекта"
                className="w-full rounded-2xl border border-white/10 bg-[#17171d] py-3 pl-11 pr-4 text-white outline-none transition focus:border-[#A6EB53]/50"
              />
            </div>
          </div>

          {error ? <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
          {successMessage ? <div className="rounded-2xl border border-[#A6EB53]/20 bg-[#A6EB53]/10 px-4 py-3 text-sm text-[#d9ff9e]">{successMessage}</div> : null}

          <div className="space-y-4">
            {isLoading ? (
              <div className="rounded-[24px] border border-white/8 bg-white/5 px-5 py-6 text-sm text-white/60">Загрузка проектов...</div>
            ) : sortedProjects.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/5 px-5 py-6 text-sm text-white/60">Проекты пока не добавлены.</div>
            ) : (
              sortedProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(21,21,26,0.98)_0%,rgba(11,11,14,0.98)_100%)] p-5 md:p-6"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex gap-5">
                      <div
                        className="hidden h-[132px] w-[180px] flex-none overflow-hidden rounded-[20px] border border-white/8 bg-[#15151c] md:block"
                        style={{
                          backgroundImage: project.image ? `url(${project.image})` : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />

                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em]">
                          <span className="text-white">{project.slug}</span>
                          <span className={project.published ? 'text-[#A6EB53]' : 'text-orange-300'}>
                            {project.published ? 'published' : 'draft'}
                          </span>
                          <span className="text-white/30">#{project.order}</span>
                        </div>
                        <h2 className="text-3xl font-semibold text-white">{project.translations.ru.title}</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-8 text-white/58">
                          {project.translations.ru.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={project.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:border-[#A6EB53]/40 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Открыть
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(project.id);
                          setForm(mapProjectToForm(project));
                          setSelectedLocale('ru');
                          setSuccessMessage(null);
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:border-[#A6EB53]/40 hover:text-white"
                      >
                        <PencilLine className="h-4 w-4" />
                        Редактировать
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-500/20 px-4 py-2 text-sm text-red-200 transition hover:border-red-400/50 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Удалить
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[30px] border border-white/8 bg-[#101014] p-6 md:p-8 2xl:sticky 2xl:top-6 2xl:h-[calc(100vh-48px)] 2xl:overflow-y-auto">
          <div className="mb-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A6EB53]">
              {editingId ? 'Редактирование' : 'Создание'}
            </div>
            <h2 className="mt-3 text-2xl font-semibold uppercase text-white">
              {editingId ? 'Изменить проект' : 'Новый проект'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-white/70">
                <span>Slug</span>
                <input
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                  placeholder="in-baltic-eu"
                />
              </label>

              <label className="space-y-2 text-sm text-white/70">
                <span>Порядок</span>
                <input
                  type="number"
                  value={form.order}
                  onChange={(event) => setForm((current) => ({ ...current, order: Number(event.target.value) }))}
                  className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                />
              </label>
            </div>

            <ImageUploadField
              value={form.image}
              onChange={(value) => setForm((current) => ({ ...current, image: value }))}
            />

            <label className="space-y-2 text-sm text-white/70">
              <span>Ссылка на проект</span>
              <input
                value={form.link}
                onChange={(event) => setForm((current) => ({ ...current, link: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                placeholder="https://example.com"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-sm text-white/75">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
              />
              Опубликован
            </label>

            <div className="flex flex-wrap gap-2">
              {PROJECT_LOCALES.map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => setSelectedLocale(locale)}
                  className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.18em] transition ${
                    selectedLocale === locale
                      ? 'bg-[#A6EB53] text-black'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#A6EB53]/40 hover:text-white'
                  }`}
                >
                  {locale}
                </button>
              ))}
            </div>

            <div className="space-y-4 rounded-[24px] border border-white/8 bg-white/5 p-4">
              <label className="space-y-2 text-sm text-white/70">
                <span>Название ({selectedLocale})</span>
                <input
                  value={form.translations[selectedLocale].title}
                  onChange={(event) => updateTranslationField(selectedLocale, 'title', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                />
              </label>

              <label className="space-y-2 text-sm text-white/70">
                <span>Описание ({selectedLocale})</span>
                <textarea
                  rows={5}
                  value={form.translations[selectedLocale].description}
                  onChange={(event) => updateTranslationField(selectedLocale, 'description', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                />
              </label>

              <label className="space-y-2 text-sm text-white/70">
                <span>Преимущества / фичи ({selectedLocale})</span>
                <textarea
                  rows={4}
                  value={form.translations[selectedLocale].featuresText}
                  onChange={(event) => updateTranslationField(selectedLocale, 'featuresText', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                  placeholder={'Одна строка = одна фича'}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#A6EB53] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#93d246] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? 'Сохраняю...' : editingId ? 'Сохранить изменения' : 'Создать проект'}
            </button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}

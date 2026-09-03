'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ExternalLink, GripVertical, PencilLine, Plus, Search, Star, Trash2 } from 'lucide-react';
import AdminShell from '@/components/admin/admin-shell';
import ImageUploadField from '@/components/admin/image-upload-field';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PROJECT_LOCALES, ProjectLocale, ProjectRecord } from '@/modules/projects/types';

type TranslationFormState = {
  description: string;
};

type ProjectFormState = {
  slug: string;
  title: string;
  image: string;
  link: string;
  published: boolean;
  translations: Record<ProjectLocale, TranslationFormState>;
  featureKeys: string[];
};

const EMPTY_TRANSLATION: TranslationFormState = {
  description: '',
};

const EMPTY_FORM: ProjectFormState = {
  slug: '',
  title: '',
  image: '',
  link: '',
  published: true,
  translations: {
    ru: { ...EMPTY_TRANSLATION },
    en: { ...EMPTY_TRANSLATION },
    lv: { ...EMPTY_TRANSLATION },
  },
  featureKeys: [],
};

const FEATURE_OPTIONS = [
  {
    key: 'ux-ui-design',
    labels: {
      ru: 'UX/UI дизайн',
      en: 'UX/UI design',
      lv: 'UX/UI dizains',
    },
  },
  {
    key: 'web-development',
    labels: {
      ru: 'Веб-разработка',
      en: 'Web development',
      lv: 'Tīmekļa izstrāde',
    },
  },
  {
    key: 'mobile-development',
    labels: {
      ru: 'Мобильная разработка',
      en: 'Mobile development',
      lv: 'Mobilo lietotņu izstrāde',
    },
  },
  {
    key: 'software-development',
    labels: {
      ru: 'Разработка ПО',
      en: 'Software development',
      lv: 'Programmatūras izstrāde',
    },
  },
  {
    key: 'e-commerce',
    labels: {
      ru: 'E-commerce',
      en: 'E-commerce',
      lv: 'E-komercija',
    },
  },
  {
    key: 'crm-systems',
    labels: {
      ru: 'CRM-системы',
      en: 'CRM systems',
      lv: 'CRM sistēmas',
    },
  },
  {
    key: 'data-science',
    labels: {
      ru: 'Data Science',
      en: 'Data Science',
      lv: 'Data Science',
    },
  },
  {
    key: 'technical-support',
    labels: {
      ru: 'Техническая поддержка',
      en: 'Technical support',
      lv: 'Tehniskais atbalsts',
    },
  },
];

function getFeatureKeys(project: ProjectRecord) {
  const projectFeatures = PROJECT_LOCALES.flatMap((locale) => project.translations[locale].features);

  return FEATURE_OPTIONS
    .filter((option) =>
      PROJECT_LOCALES.some((locale) =>
        projectFeatures.some((feature) => feature.toLowerCase() === option.labels[locale].toLowerCase())
      )
    )
    .map((option) => option.key);
}

function mapProjectToForm(project: ProjectRecord): ProjectFormState {
  return {
    slug: project.slug,
    title: project.translations.ru.title || project.translations.en.title || project.translations.lv.title,
    image: project.image,
    link: project.link,
    published: project.published,
    translations: {
      ru: {
        description: project.translations.ru.description,
      },
      en: {
        description: project.translations.en.description,
      },
      lv: {
        description: project.translations.lv.description,
      },
    },
    featureKeys: getFeatureKeys(project),
  };
}

function mapFormToPayload(form: ProjectFormState) {
  return {
    slug: form.slug.trim(),
    image: form.image.trim(),
    link: form.link.trim(),
    published: form.published,
    translations: Object.fromEntries(
      PROJECT_LOCALES.map((locale) => [
        locale,
        {
          title: form.title.trim(),
          description: form.translations[locale].description.trim(),
          features: FEATURE_OPTIONS
            .filter((option) => form.featureKeys.includes(option.key))
            .map((option) => option.labels[locale]),
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);

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

  const orderedProjects = useMemo(
    () => [...projects].sort((first, second) => first.order - second.order),
    [projects]
  );

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

  function openCreateForm() {
    resetForm();
    setIsFormOpen(true);
  }

  function openEditForm(project: ProjectRecord) {
    setEditingId(project.id);
    setForm(mapProjectToForm(project));
    setSelectedLocale('ru');
    setSuccessMessage(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) {
      return;
    }

    resetForm();
    setIsFormOpen(false);
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

  function toggleFeature(featureKey: string) {
    setForm((current) => ({
      ...current,
      featureKeys: current.featureKeys.includes(featureKey)
        ? current.featureKeys.filter((selectedFeatureKey) => selectedFeatureKey !== featureKey)
        : [...current.featureKeys, featureKey],
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
      setIsFormOpen(false);
      setSuccessMessage(editingId ? 'Проект обновлён.' : 'Проект создан.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось сохранить проект.');
    } finally {
      setIsSaving(false);
    }
  }

  async function saveProjectOrder(nextProjects: ProjectRecord[]) {
    const previousProjects = projects;
    const normalizedProjects = nextProjects.map((project, index) => ({
      ...project,
      order: index + 1,
    }));

    setProjects(normalizedProjects);
    setIsReordering(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectIds: normalizedProjects.map((project) => project.id) }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || 'Не удалось сохранить порядок проектов.');
      }

      setProjects(payload.projects || normalizedProjects);
      setSuccessMessage('Порядок проектов обновлён.');
    } catch (requestError) {
      setProjects(previousProjects);
      setError(requestError instanceof Error ? requestError.message : 'Не удалось сохранить порядок проектов.');
    } finally {
      setIsReordering(false);
    }
  }

  function moveProject(projectId: string, direction: -1 | 1) {
    const currentIndex = orderedProjects.findIndex((project) => project.id === projectId);
    const targetIndex = currentIndex + direction;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= orderedProjects.length) {
      return;
    }

    const nextProjects = [...orderedProjects];
    const [movedProject] = nextProjects.splice(currentIndex, 1);
    nextProjects.splice(targetIndex, 0, movedProject);
    saveProjectOrder(nextProjects);
  }

  function dropProject(targetProjectId: string) {
    if (!draggedProjectId || draggedProjectId === targetProjectId || query.trim()) {
      setDraggedProjectId(null);
      return;
    }

    const nextProjects = [...orderedProjects];
    const draggedIndex = nextProjects.findIndex((project) => project.id === draggedProjectId);
    const targetIndex = nextProjects.findIndex((project) => project.id === targetProjectId);

    if (draggedIndex < 0 || targetIndex < 0) {
      setDraggedProjectId(null);
      return;
    }

    const [draggedProject] = nextProjects.splice(draggedIndex, 1);
    nextProjects.splice(targetIndex, 0, draggedProject);
    setDraggedProjectId(null);
    saveProjectOrder(nextProjects);
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
        { label: 'На главной', value: '3' },
      ]}
      actions={
        <>
          <button
            type="button"
            onClick={openCreateForm}
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
      <div className="space-y-6">
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
            <p className="mt-4 text-sm leading-6 text-white/45">
              Перетаскивай карточки или используй стрелки. Первые 3 опубликованных проекта со звездой показываются на главной.
            </p>
          </div>

          {error ? <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
          {successMessage ? <div className="rounded-2xl border border-[#A6EB53]/20 bg-[#A6EB53]/10 px-4 py-3 text-sm text-[#d9ff9e]">{successMessage}</div> : null}

          <div className="space-y-4">
            {isLoading ? (
              <div className="rounded-[24px] border border-white/8 bg-white/5 px-5 py-6 text-sm text-white/60">Загрузка проектов...</div>
            ) : sortedProjects.length === 0 ? (
              <div className="rounded-[24px] border border-white/8 bg-white/5 px-5 py-6 text-sm text-white/60">Проекты пока не добавлены.</div>
            ) : (
              sortedProjects.map((project, index) => {
                const orderedIndex = orderedProjects.findIndex((orderedProject) => orderedProject.id === project.id);
                const isHomepageProject = project.published && orderedProjects
                  .filter((orderedProject) => orderedProject.published)
                  .slice(0, 3)
                  .some((orderedProject) => orderedProject.id === project.id);
                const canReorder = !query.trim() && !isReordering;

                return (
                  <article
                    key={project.id}
                    draggable={canReorder}
                    onDragStart={() => setDraggedProjectId(project.id)}
                    onDragOver={(event) => {
                      if (canReorder) {
                        event.preventDefault();
                      }
                    }}
                    onDrop={() => dropProject(project.id)}
                    onDragEnd={() => setDraggedProjectId(null)}
                    className={`rounded-[24px] border bg-[linear-gradient(180deg,rgba(21,21,26,0.98)_0%,rgba(11,11,14,0.98)_100%)] p-4 transition ${
                      draggedProjectId === project.id ? 'border-[#A6EB53]/60 opacity-60' : 'border-white/8'
                    }`}
                  >
                    <div className="grid gap-4 lg:grid-cols-[44px_120px_minmax(0,1fr)_auto] lg:items-center">
                      <div className="flex items-center gap-2 lg:flex-col">
                        <GripVertical className={`h-5 w-5 ${canReorder ? 'text-white/45' : 'text-white/15'}`} />
                        <button
                          type="button"
                          onClick={() => moveProject(project.id, -1)}
                          disabled={!canReorder || orderedIndex <= 0}
                          className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-[#A6EB53]/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Поднять проект выше"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProject(project.id, 1)}
                          disabled={!canReorder || orderedIndex >= orderedProjects.length - 1}
                          className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-[#A6EB53]/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Опустить проект ниже"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>

                      <div
                        className="hidden aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-white/8 bg-[#15151c] md:block"
                        style={{
                          backgroundImage: project.image ? `url(${project.image})` : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
                          <span className="truncate text-white">{project.slug}</span>
                          <span className={project.published ? 'text-[#A6EB53]' : 'text-orange-300'}>
                            {project.published ? 'published' : 'draft'}
                          </span>
                          {isHomepageProject ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#A6EB53]/35 bg-[#A6EB53]/12 px-2.5 py-1 text-[#A6EB53]">
                              <span className="inline-flex items-center gap-0.5">
                                {[0, 1, 2].map((starIndex) => (
                                  <Star key={starIndex} className="h-3 w-3 fill-[#A6EB53]" />
                                ))}
                              </span>
                              на главной
                            </span>
                          ) : null}
                        </div>
                        <h2 className="truncate text-2xl font-semibold text-white">{project.translations.ru.title}</h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
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
                          onClick={() => openEditForm(project)}
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
                );
              })
            )}
          </div>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={(open) => (open ? setIsFormOpen(true) : closeForm())}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#101014] p-6 text-white shadow-2xl md:p-8">
          <DialogHeader>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A6EB53]">
              {editingId ? 'Редактирование' : 'Создание'}
            </div>
            <DialogTitle className="text-2xl font-semibold uppercase text-white">
              {editingId ? 'Изменить проект' : 'Новый проект'}
            </DialogTitle>
            <DialogDescription className="text-white/45">
              Заполните данные проекта. Порядок на главной меняется в списке карточек.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <span>Название</span>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                placeholder="Lumtech"
              />
            </label>

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
                <span>Описание ({selectedLocale})</span>
                <textarea
                  rows={5}
                  value={form.translations[selectedLocale].description}
                  onChange={(event) => updateTranslationField(selectedLocale, 'description', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                />
              </label>
            </div>

            <div className="space-y-3 rounded-[24px] border border-white/8 bg-white/5 p-4">
              <div>
                <div className="text-sm font-medium text-white/80">Фичи проекта</div>
                <p className="mt-1 text-xs leading-5 text-white/40">
                  Выбранные фичи автоматически сохраняются на всех языках.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {FEATURE_OPTIONS.map((feature) => (
                  <label
                    key={feature.key}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-sm text-white/75 transition hover:border-[#A6EB53]/40 hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={form.featureKeys.includes(feature.key)}
                      onChange={() => toggleFeature(feature.key)}
                      className="h-4 w-4 accent-[#A6EB53]"
                    />
                    {feature.labels[selectedLocale]}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#A6EB53] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#93d246] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? 'Сохраняю...' : editingId ? 'Сохранить изменения' : 'Создать проект'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}

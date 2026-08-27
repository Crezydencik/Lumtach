'use client';

import { useMemo, useState } from 'react';
import AdminShell from '@/components/admin/admin-shell';
import ImageUploadField from '@/components/admin/image-upload-field';
import { ProjectRecord } from '@/modules/projects/types';

type MediaAdminProps = {
  projects: ProjectRecord[];
};

export default function MediaAdmin({ projects }: MediaAdminProps) {
  const [imageUrl, setImageUrl] = useState('');

  const recentImages = useMemo(
    () =>
      projects
        .filter((project) => project.image)
        .slice()
        .sort((a, b) => a.order - b.order)
        .slice(0, 8),
    [projects]
  );

  return (
    <AdminShell
      eyebrow="Media"
      title="Библиотека файлов"
      description="Загружай изображения в Firebase Storage и сразу используй их в карточках проектов. Ссылка появится автоматически и ее можно вставить в форму проекта."
      stats={[
        { label: 'Изображений в проектах', value: String(recentImages.length) },
        { label: 'Storage', value: 'Firebase' },
        { label: 'Формат', value: 'JPG / PNG / WEBP' },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[30px] border border-white/8 bg-[#101014] p-6 md:p-8">
          <div className="mb-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#A6EB53]">Upload</div>
            <h2 className="mt-3 text-3xl font-semibold uppercase text-white">Загрузка изображения</h2>
          </div>

          <ImageUploadField value={imageUrl} onChange={setImageUrl} />
        </div>

        <div className="rounded-[30px] border border-white/8 bg-[#101014] p-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#A6EB53]">Recent</div>
          <h2 className="mt-3 text-2xl font-semibold uppercase text-white">Последние изображения</h2>

          <div className="mt-6 space-y-3">
            {recentImages.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setImageUrl(project.image)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left transition hover:border-[#A6EB53]/40 hover:bg-white/[0.08]"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{project.translations.ru.title}</div>
                  <div className="mt-1 text-xs text-white/45">{project.slug}</div>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#A6EB53]">Use</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

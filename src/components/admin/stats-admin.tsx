'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminShell from '@/components/admin/admin-shell';
import { STATS_KEYS, STATS_LOCALES, StatsKey, StatsLocale, StatsRecord } from '@/modules/stats/types';

type StatsFormItem = {
  key: StatsKey;
  value: string;
  labels: Record<StatsLocale, string>;
};

const ITEM_TITLES: Record<StatsKey, string> = {
  projects: 'Projects',
  clients: 'Clients',
  awards: 'Awards',
  employees: 'Employees',
};

export default function StatsAdmin() {
  const [stats, setStats] = useState<StatsRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formItems = useMemo<StatsFormItem[]>(() => {
    if (!stats) {
      return [];
    }

    return stats.items.map((item) => ({
      key: item.key,
      value: item.value,
      labels: { ...item.labels },
    }));
  }, [stats]);

  const [draft, setDraft] = useState<StatsFormItem[]>([]);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);

      try {
        const response = await fetch('/api/admin/stats', { cache: 'no-store' });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(payload?.error || 'Не удалось загрузить статистику.');
        }

        setStats(payload.stats);
        setDraft(payload.stats.items);
        setError(null);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить статистику.');
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  function updateItem(key: StatsKey, patch: Partial<StatsFormItem>) {
    setDraft((current) =>
      current.map((item) => (item.key === key ? { ...item, ...patch } : item))
    );
  }

  function updateLabel(key: StatsKey, locale: StatsLocale, value: string) {
    setDraft((current) =>
      current.map((item) =>
        item.key === key ? { ...item, labels: { ...item.labels, [locale]: value } } : item
      )
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: draft }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || 'Не удалось сохранить статистику.');
      }

      setStats(payload.stats);
      setDraft(payload.stats.items);
      setSuccessMessage('Статистика обновлена.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось сохранить статистику.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminShell
      eyebrow="Stats"
      title="Статистика сайта"
      description="Редактируй цифры и подписи блока About на главной странице. Для каждого показателя можно отдельно менять значение и текст на трех языках."
      stats={[
        { label: 'Показателей', value: String(STATS_KEYS.length) },
        { label: 'Языков', value: String(STATS_LOCALES.length) },
        { label: 'Раздел', value: 'About' },
      ]}
    >
      <div className="rounded-[30px] border border-white/8 bg-[#101014] p-6 md:p-8">
        {error ? (
          <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="mb-4 rounded-2xl border border-[#A6EB53]/20 bg-[#A6EB53]/10 px-4 py-3 text-sm text-[#d9ff9e]">
            {successMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-[24px] border border-white/8 bg-white/5 px-5 py-6 text-sm text-white/60">
            Загрузка статистики...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              {draft.map((item) => (
                <div
                  key={item.key}
                  className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(21,21,26,0.98)_0%,rgba(11,11,14,0.98)_100%)] p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="text-lg font-semibold text-white">{ITEM_TITLES[item.key]}</div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#A6EB53]">
                      {item.key}
                    </div>
                  </div>

                  <label className="mb-5 block space-y-2 text-sm text-white/70">
                    <span>Значение</span>
                    <input
                      value={item.value}
                      onChange={(event) => updateItem(item.key, { value: event.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                      placeholder="10"
                    />
                  </label>

                  <div className="grid gap-4">
                    {STATS_LOCALES.map((locale) => (
                      <label key={locale} className="space-y-2 text-sm text-white/70">
                        <span>Подпись ({locale})</span>
                        <input
                          value={item.labels[locale]}
                          onChange={(event) => updateLabel(item.key, locale, event.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-full bg-[#A6EB53] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#93d246] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? 'Сохраняю...' : 'Сохранить статистику'}
            </button>
          </form>
        )}
      </div>
    </AdminShell>
  );
}

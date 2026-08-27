'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, FolderKanban, ImagePlus, LayoutGrid, LogOut } from 'lucide-react';

type AdminShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const NAV_ITEMS = [
  { href: '/admin/projects', label: 'Проекты', icon: FolderKanban },
  { href: '/admin/stats', label: 'Статистика', icon: BarChart3 },
  { href: '/admin/media', label: 'Медиа', icon: ImagePlus },
];

export default function AdminShell({
  eyebrow,
  title,
  description,
  stats = [],
  actions,
  children,
}: AdminShellProps) {
  const pathname = usePathname();

  return (
    <section className="min-h-screen bg-[#050507] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1720px] gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[30px] border border-white/8 bg-[#101014] p-5 xl:sticky xl:top-6 xl:h-[calc(100vh-48px)] xl:p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A6EB53]/12 text-[#A6EB53]">
              <LayoutGrid className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#A6EB53]">Lumtach</div>
              <div className="text-lg font-semibold text-white">Admin Panel</div>
            </div>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? 'bg-[#A6EB53] text-black'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-[24px] border border-white/8 bg-white/5 p-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/35">Совет</div>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Загружай изображения сразу в панель, чтобы не хранить ручные пути и не править ссылки в коде.
            </p>
          </div>

          <div className="mt-auto hidden pt-8 xl:block">
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-[#0b0b0f] px-4 py-3 text-sm text-white/60">
              <LogOut className="h-4 w-4" />
              Доступ через Firebase Auth
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <header className="rounded-[30px] border border-white/8 bg-[#101014] p-6 md:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl">
                <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#A6EB53]">
                  {eyebrow}
                </div>
                <h1 className="mt-4 text-4xl font-semibold uppercase leading-none text-white md:text-6xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/60 md:text-lg">
                  {description}
                </p>
              </div>

              {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
            </div>

            {stats.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-4"
                  >
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/35">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </header>

          {children}
        </div>
      </div>
    </section>
  );
}

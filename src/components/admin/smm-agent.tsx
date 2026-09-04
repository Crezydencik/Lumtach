'use client';

import { useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import AdminShell from './admin-shell';

type Network = 'Instagram' | 'Facebook' | 'LinkedIn';

const networkNotes: Record<Network, string> = {
  Instagram: 'Короткий визуальный пост с вовлекающим вопросом.',
  Facebook: 'Пост с контекстом и ссылкой на обсуждение проекта.',
  LinkedIn: 'Профессиональный кейс с фокусом на бизнес-результате.',
};

export default function SmmAgent() {
  const [network, setNetwork] = useState<Network>('Instagram');
  const [goal, setGoal] = useState('получить заявки на разработку');
  const [topic, setTopic] = useState('веб-сервис или мобильное приложение для бизнеса');
  const [audience, setAudience] = useState('владельцев малого и среднего бизнеса в Латвии');
  const [post, setPost] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setPost(`Хотите ${goal}?\n\n${topic} — это не просто красивая идея, а инструмент, который помогает бизнесу работать быстрее, понятнее и удобнее для клиентов. В Lumtach мы превращаем задачи компаний в понятные цифровые продукты: от исследования и UX/UI-дизайна до запуска сайта или приложения.\n\nЭтот подход особенно полезен для ${audience}. Расскажите, какую часть вашего бизнеса вы хотите улучшить с помощью технологий?\n\nНапишите нам в директ или оставьте заявку на сайте — обсудим проект и предложим следующий шаг.\n\n#Lumtach #РазработкаСайтов #ВебРазработка #МобильныеПриложения #UXUIDesign #ITРига #БизнесЛатвия`);
    setCopied(false);
  };

  const copyPost = async () => {
    if (!post) return;
    await navigator.clipboard.writeText(post);
    setCopied(true);
  };

  return (
    <AdminShell
      eyebrow="Маркетинг"
      title="SMM-агент"
      description="Собирает основу поста под канал, цель и аудиторию. Перед публикацией отредактируйте текст под конкретный кейс и добавьте визуал."
      stats={[{ label: 'Каналы', value: '3' }, { label: 'Формат', value: 'Пост + CTA' }, { label: 'Статус', value: 'Готов' }]}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section className="rounded-[30px] border border-white/8 bg-[#101014] p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 text-[#A6EB53]"><Sparkles className="h-5 w-5" /><span className="text-sm font-medium">Бриф для поста</span></div>
          <div className="space-y-5">
            <Field label="Площадка"><select value={network} onChange={(event) => setNetwork(event.target.value as Network)} className="agent-input"><option>Instagram</option><option>Facebook</option><option>LinkedIn</option></select></Field>
            <Field label="Цель"><input value={goal} onChange={(event) => setGoal(event.target.value)} className="agent-input" /></Field>
            <Field label="Тема"><textarea value={topic} onChange={(event) => setTopic(event.target.value)} className="agent-input min-h-[88px]" /></Field>
            <Field label="Аудитория"><input value={audience} onChange={(event) => setAudience(event.target.value)} className="agent-input" /></Field>
            <button onClick={generate} className="w-full rounded-2xl bg-[#A6EB53] px-5 py-4 text-sm font-semibold text-black transition hover:bg-[#b8f36b]">Сгенерировать пост</button>
          </div>
        </section>
        <section className="rounded-[30px] border border-white/8 bg-[#101014] p-6 md:p-8">
          <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">Черновик для {network}</h2><p className="mt-2 text-sm leading-6 text-white/55">{networkNotes[network]}</p></div>{post ? <button onClick={copyPost} className="flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs text-white/80 hover:border-[#A6EB53]">{copied ? <Check className="h-4 w-4 text-[#A6EB53]" /> : <Copy className="h-4 w-4" />}{copied ? 'Скопировано' : 'Копировать'}</button> : null}</div>
          {post ? <textarea value={post} onChange={(event) => setPost(event.target.value)} className="agent-input mt-7 min-h-[380px] leading-7" aria-label="Черновик SMM-поста" /> : <div className="mt-7 flex min-h-[380px] items-center justify-center rounded-2xl border border-dashed border-white/15 px-8 text-center text-sm leading-6 text-white/40">Заполните бриф и нажмите «Сгенерировать пост». Здесь появится редактируемый черновик с CTA и хэштегами.</div>}
        </section>
      </div>
      <style jsx global>{`.agent-input { width: 100%; border-radius: 16px; border: 1px solid rgba(255,255,255,.12); background: #09090c; padding: 13px 15px; color: white; font-size: 14px; outline: none; } .agent-input:focus { border-color: #A6EB53; }`}</style>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[11px] font-mono uppercase tracking-[.18em] text-white/45">{label}</span>{children}</label>;
}

'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ImageUp, Loader2 } from 'lucide-react';

type ImageUploadFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || 'Не удалось загрузить изображение.');
      }

      onChange(payload.url);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить изображение.');
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[#14141a]">
        <div className="flex min-h-[220px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(166,235,83,0.16),transparent_40%),linear-gradient(180deg,#17171d_0%,#101014_100%)]">
          {value ? (
            <div className="relative h-[220px] w-full">
              <Image src={value} alt="Project preview" fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 text-center text-white/45">
              <ImageUp className="h-10 w-10 text-[#A6EB53]" />
              <p className="max-w-[260px] text-sm leading-6">
                Загрузите превью проекта. После upload ссылка подставится в форму автоматически.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-2 rounded-full bg-[#A6EB53] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#93d246] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
          {isUploading ? 'Загрузка...' : 'Загрузить изображение'}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <label className="space-y-2 text-sm text-white/70">
        <span>URL изображения</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-[#17171d] px-4 py-3 text-white outline-none transition focus:border-[#A6EB53]/50"
          placeholder="https://..."
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
    </div>
  );
}

import path from 'path';
import { randomUUID } from 'crypto';
import { getFirebaseAdminStorage } from '@/lib/firebase-admin';

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]);

function sanitizeFileName(fileName: string) {
  const parsed = path.parse(fileName);
  const safeName = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  const extension = parsed.ext.toLowerCase() || '.png';

  return `${safeName || 'image'}${extension}`;
}

export function assertValidImageUpload(contentType: string, size: number) {
  if (!IMAGE_MIME_TYPES.has(contentType)) {
    throw new Error('Можно загружать только изображения JPG, PNG, WEBP, GIF, SVG или AVIF.');
  }

  if (size > 8 * 1024 * 1024) {
    throw new Error('Максимальный размер изображения: 8 MB.');
  }
}

export async function uploadAdminImage(params: {
  buffer: Buffer;
  contentType: string;
  fileName: string;
}) {
  const bucket = getFirebaseAdminStorage().bucket();
  const token = randomUUID();
  const safeFileName = sanitizeFileName(params.fileName);
  const objectPath = `projects/${Date.now()}-${safeFileName}`;
  const file = bucket.file(objectPath);

  await file.save(params.buffer, {
    resumable: false,
    metadata: {
      contentType: params.contentType,
      cacheControl: 'public, max-age=31536000, immutable',
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  return {
    path: objectPath,
    url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      objectPath
    )}?alt=media&token=${token}`,
  };
}

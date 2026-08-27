import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequestAuthenticated } from '@/modules/auth/server';
import { assertValidImageUpload, uploadAdminImage } from '@/modules/storage/service';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminRequestAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Файл не найден.' }, { status: 400 });
    }

    assertValidImageUpload(file.type, file.size);

    const arrayBuffer = await file.arrayBuffer();
    const uploaded = await uploadAdminImage({
      buffer: Buffer.from(arrayBuffer),
      contentType: file.type,
      fileName: file.name,
    });

    return NextResponse.json(uploaded, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Не удалось загрузить изображение.' },
      { status: 400 }
    );
  }
}

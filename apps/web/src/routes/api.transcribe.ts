import type { ActionFunctionArgs } from 'react-router';
import { json } from 'react-router';

const MAX_FILE_SIZE = 500 * 1024 * 1024;
const XAI_ENDPOINT = 'https://api.x.ai/v1/stt';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return json({ error: 'XAI_API_KEY is not configured on the server.' }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return json({ error: 'يرجى إرفاق ملف صوتي.' }, { status: 400 });
  }

  if (file.size === 0) {
    return json({ error: 'الملف فارغ.' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return json({ error: 'الحد الأقصى لحجم الملف هو 500 ميجابايت.' }, { status: 413 });
  }

  const xaiForm = new FormData();
  xaiForm.append('model', 'grok-voice-transcribe-2.0');
  xaiForm.append('language', 'ar');
  xaiForm.append('format', 'true');
  xaiForm.append('file', file, file.name);

  try {
    const response = await fetch(XAI_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: xaiForm,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('xAI STT error:', data);
      return json(
        { error: data?.error?.message || data?.message || 'تعذر تحويل الملف إلى نص.' },
        { status: response.status },
      );
    }

    return json({
      text: data.text || '',
      language: data.language || null,
      duration: data.duration || null,
      words: data.words || [],
    });
  } catch (error) {
    console.error('Transcription request failed:', error);
    return json({ error: 'حدث خطأ أثناء الاتصال بخدمة Grok.' }, { status: 502 });
  }
}

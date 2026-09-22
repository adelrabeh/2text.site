import { apiError, json, readFormData, withApi } from '@/lib/api.server';

const XAI_ENDPOINT = 'https://api.x.ai/v1/stt';
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const action = withApi(async ({ request }) => {
  if (request.method !== 'POST') {
    return apiError(405, 'Method not allowed');
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return apiError(503, 'خدمة التحويل غير مفعلة حالياً. يرجى إعداد مفتاح Grok على الخادم.');
  }

  const formData = await readFormData(request);
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return apiError(400, 'يرجى إرفاق ملف صوتي.');
  }

  if (file.size === 0) {
    return apiError(400, 'الملف فارغ.');
  }

  if (file.size > MAX_FILE_SIZE) {
    return apiError(413, 'الحد الأقصى لحجم الملف في النسخة الحالية هو 20 ميجابايت.');
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

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('xAI STT error:', data);
      return apiError(
        response.status >= 400 && response.status < 500 ? response.status : 502,
        data?.error?.message || data?.message || 'تعذر تحويل الملف إلى نص.',
      );
    }

    const text = typeof data?.text === 'string' ? data.text.trim() : '';

    if (!text) {
      console.error('xAI STT returned no transcript:', {
        language: data?.language,
        duration: data?.duration,
        words: Array.isArray(data?.words) ? data.words.length : 0,
      });
      return apiError(502, 'وصلت استجابة من Grok لكن لم يتم استخراج أي نص من الملف. تأكد من أن الملف يحتوي على صوت واضح وبصيغة مدعومة.');
    }

    return json({
      text,
      language: data?.language || 'ar',
      duration: data?.duration || null,
      words: data?.words || [],
    });
  } catch (error) {
    console.error('xAI STT request failed:', error);
    return apiError(502, 'حدث خطأ أثناء الاتصال بخدمة Grok.');
  }
});

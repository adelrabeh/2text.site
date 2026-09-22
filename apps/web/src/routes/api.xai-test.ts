import { json, apiError, withApi } from '@/lib/api.server';

export const loader = withApi(async () => {
  const apiKey = process.env.XAI_API_KEY;

  if (!apiKey) {
    return apiError(503, 'XAI_API_KEY غير موجود في بيئة الخادم.');
  }

  try {
    const response = await fetch('https://api.x.ai/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const data = await response.json().catch(() => null);

    return json({
      ok: response.ok,
      status: response.status,
      message: response.ok
        ? 'الاتصال بخادم xAI ومفتاح API يعملان.'
        : (data?.error?.message || data?.message || 'رفض خادم xAI الطلب.'),
    }, { status: response.ok ? 200 : 502 });
  } catch (error) {
    return apiError(
      502,
      error instanceof Error
        ? `تعذر الاتصال بخادم xAI: ${error.message}`
        : 'تعذر الاتصال بخادم xAI.',
    );
  }
});

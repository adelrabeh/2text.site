import { useEffect, useRef, useState } from 'react';
import {
	Check,
	CloudUpload,
	Copy,
	Download,
	FileAudio,
	Loader2,
	Pause,
	Play,
	RotateCcw,
	Sparkles,
	Trash2,
} from 'lucide-react';
import { Waveform } from '@/components/home/waveform';
import { SectionEdge } from '@/components/section-edge';
import { formatDuration, formatFileSize } from '@/lib/format';
import { cn } from '@/lib/utils';

type DemoStatus = 'idle' | 'ready' | 'processing' | 'done';

interface DemoFile {
	name: string;
	size: number;
	url: string | null;
	sample: boolean;
}

const STAGES = [
	'جاري تجهيز الملف',
	'تحليل الموجات الصوتية',
	'تحويل الكلام إلى نص',
	'مراجعة التوقيتات والمتحدثين',
];

const SAMPLE_TRANSCRIPT = `[00:00:04] المتحدث الأول: أهلًا بكم في الاجتماع الأسبوعي، سنراجع اليوم خطة إطلاق النسخة الجديدة من المنصة.

[00:00:18] المتحدث الثاني: جهّزنا النسخة التجريبية، وفريق الجودة أنهى اختبار رفع الملفات الكبيرة بنجاح.

[00:00:35] المتحدث الأول: ممتاز. نحتاج أيضًا مراجعة دقة التفريغ للهجات الخليجية والمصرية قبل موعد الإطلاق.

[00:00:52] المتحدث الثالث: النتائج الأولية مشجعة جدًا، وسأشارك تقريرًا مفصلًا معكم نهاية الأسبوع.

[00:01:10] المتحدث الأول: رائع، نلتقي الخميس القادم لاعتماد الخطة النهائية. شكرًا لكم.`;

const FAKE_DURATION = 74;
const ACCEPTED = '.mp3,.wav,.m4a,.ogg,.flac,.mp4,.mov,audio/*,video/*';

export function Demo() {
	const [status, setStatus] = useState<DemoStatus>('idle');
	const [file, setFile] = useState<DemoFile | null>(null);
	const [dragging, setDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [stage, setStage] = useState(0);
	const [progress, setProgress] = useState(0);
	const [transcript, setTranscript] = useState(SAMPLE_TRANSCRIPT);
	const [copied, setCopied] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (status !== 'processing') return;
		setStage(0);
		setProgress(0);
		const total = STAGES.length * 1300;
		const started = Date.now();
		const tick = window.setInterval(() => {
			const passed = Date.now() - started;
			const pct = Math.min(100, Math.round((passed / total) * 100));
			setProgress(pct);
			setStage(Math.min(STAGES.length - 1, Math.floor(passed / 1300)));
			if (pct >= 100) {
				window.clearInterval(tick);
				setStatus('done');
			}
		}, 80);
		return () => window.clearInterval(tick);
	}, [status]);

	useEffect(() => {
		if (!playing) return;
		const t = window.setInterval(
			() => setElapsed(e => Math.min(FAKE_DURATION, e + 1)),
			1000,
		);
		return () => window.clearInterval(t);
	}, [playing]);

	useEffect(() => {
		if (elapsed >= FAKE_DURATION) setPlaying(false);
	}, [elapsed]);

	function acceptFile(candidate: File | undefined) {
		if (!candidate) return;
		const ok =
			candidate.type.startsWith('audio/') ||
			candidate.type.startsWith('video/') ||
			/\.(mp3|wav|m4a|ogg|flac|mp4|mov)$/i.test(candidate.name);
		if (!ok) {
			setError('صيغة غير مدعومة — جرّب MP3 أو WAV أو M4A أو MP4.');
			return;
		}
		setError(null);
		setFile({
			name: candidate.name,
			size: candidate.size,
			url: URL.createObjectURL(candidate),
			sample: false,
		});
		setStatus('ready');
	}

	function loadSample() {
		setError(null);
		setFile({ name: 'اجتماع-فريق-المنتج.mp3', size: 25_821_184, url: null, sample: true });
		setStatus('ready');
	}

	function reset() {
		if (file?.url) URL.revokeObjectURL(file.url);
		setFile(null);
		setStatus('idle');
		setPlaying(false);
		setElapsed(0);
		setProgress(0);
		setStage(0);
		setTranscript(SAMPLE_TRANSCRIPT);
		setError(null);
	}

	async function copyText() {
		try {
			await navigator.clipboard.writeText(transcript);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	}

	function downloadText() {
		const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = 'تفريغ-تدوين.txt';
		anchor.click();
		URL.revokeObjectURL(url);
	}

	return (
		<section id="demo" className="bg-noise relative scroll-mt-20 bg-midnight">
			<SectionEdge index="٠٤" label="التجربة" tone="dark" />
			<div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
				<div className="max-w-2xl">
					<p className="text-sm font-semibold tracking-wide text-ice">التجربة التفاعلية</p>
					<h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl md:leading-tight">
						جرّبها بنفسك الآن
					</h2>
					<p className="mt-4 text-base leading-8 text-silver">
						ارفع ملفًا صوتيًا من جهازك أو جرّب النموذج التجريبي، وشاهد رحلة التحويل
						من الموجة إلى النص أمامك مباشرة.
					</p>
				</div>

				<div className="mt-12 grid gap-6 lg:grid-cols-2">
					{/* Input column */}
					<div className="rounded-3xl border border-white/10 bg-midnight-soft p-6 md:p-8">
						{status === 'idle' ? (
							<div
								role="button"
								tabIndex={0}
								onClick={() => inputRef.current?.click()}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
								}}
								onDragOver={e => {
									e.preventDefault();
									setDragging(true);
								}}
								onDragLeave={() => setDragging(false)}
								onDrop={e => {
									e.preventDefault();
									setDragging(false);
									acceptFile(e.dataTransfer.files?.[0]);
								}}
								className={cn(
									'flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 px-6 text-center transition-colors',
									dragging && 'border-ice bg-ice/10',
								)}
							>
								<span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ice/15 text-ice">
									<CloudUpload className="h-7 w-7" strokeWidth={1.8} />
								</span>
								<p className="mt-5 font-display text-lg font-bold text-white">
									اسحب ملفك الصوتي هنا
								</p>
								<p className="mt-2 text-sm text-silver">أو اختره من جهازك — MP3, WAV, M4A, MP4</p>
								<div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
									<span className="inline-flex items-center rounded-full bg-ice px-6 py-2.5 text-sm font-bold text-midnight">
										اختر ملفًا
									</span>
									<button
										type="button"
										onClick={e => {
											e.stopPropagation();
											loadSample();
										}}
										className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-silver transition-colors hover:border-ice hover:text-ice"
									>
										<Sparkles className="h-4 w-4" />
										جرّب بملف تجريبي
									</button>
								</div>
								{error ? <p className="mt-4 text-sm font-medium text-red-300">{error}</p> : null}
							</div>
						) : (
							<div className="flex min-h-72 flex-col">
								<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ice/15 text-ice">
										<FileAudio className="h-5 w-5" />
									</span>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-semibold text-white">{file?.name}</p>
										<p className="mt-0.5 text-xs text-silver">
											{file ? formatFileSize(file.size) : ''}
											{file?.sample ? ' · ملف تجريبي' : ''}
										</p>
									</div>
									{status === 'ready' ? (
										<button
											type="button"
											onClick={reset}
											aria-label="إزالة الملف"
											className="flex h-9 w-9 items-center justify-center rounded-lg text-silver transition-colors hover:bg-white/10 hover:text-red-300"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									) : null}
								</div>

								{file?.url ? (
									<audio controls src={file.url} className="mt-5 w-full" dir="ltr" />
								) : (
									<div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
										<button
											type="button"
											onClick={() => setPlaying(p => !p)}
											aria-label={playing ? 'إيقاف مؤقت' : 'تشغيل'}
											className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice text-midnight transition-transform active:scale-95"
										>
											{playing ? (
												<Pause className="h-5 w-5" />
											) : (
												<Play className="h-5 w-5 -translate-x-px" />
											)}
										</button>
										<Waveform
											barCount={36}
											playing={playing || status === 'processing'}
											className="h-10 flex-1 overflow-hidden"
										/>
										<span dir="ltr" className="shrink-0 font-mono text-xs text-silver">
											{formatDuration(elapsed)} / {formatDuration(FAKE_DURATION)}
										</span>
									</div>
								)}

								{status === 'processing' ? (
									<div className="mt-6">
										<div className="flex items-center justify-between text-sm">
											<span className="flex items-center gap-2 font-medium text-ice">
												<Loader2 className="h-4 w-4 animate-spin" />
												{STAGES[stage]}
											</span>
											<span dir="ltr" className="font-mono text-silver">
												{progress}%
											</span>
										</div>
										<div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
											<div
												className="h-full rounded-full bg-ice transition-[width] duration-150"
												style={{ width: `${progress}%` }}
											/>
										</div>
									</div>
								) : null}

								{status === 'ready' ? (
									<button
										type="button"
										onClick={() => setStatus('processing')}
										className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ice px-8 text-base font-bold text-midnight transition-all hover:bg-white active:scale-[0.98]"
									>
										<Sparkles className="h-4 w-4" />
										ابدأ التحويل
									</button>
								) : null}

								{status === 'done' ? (
									<button
										type="button"
										onClick={reset}
										className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-8 text-sm font-semibold text-silver transition-colors hover:border-ice hover:text-ice"
									>
										<RotateCcw className="h-4 w-4" />
										تحويل ملف آخر
									</button>
								) : null}
							</div>
						)}
						<input
							ref={inputRef}
							type="file"
							accept={ACCEPTED}
							className="hidden"
							onChange={e => {
								acceptFile(e.target.files?.[0]);
								e.target.value = '';
							}}
						/>
					</div>

					{/* Output column */}
					<div className="flex flex-col rounded-3xl border border-white/10 bg-midnight-soft p-6 md:p-8">
						<div className="flex items-center justify-between">
							<h3 className="font-display text-lg font-bold text-white">النص الناتج</h3>
							{status === 'done' ? (
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={copyText}
										className="inline-flex h-10 items-center gap-2 rounded-full bg-ice px-4 text-xs font-bold text-midnight transition-all hover:bg-white active:scale-[0.98]"
									>
										{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
										{copied ? 'تم النسخ' : 'نسخ النص'}
									</button>
									<button
										type="button"
										onClick={downloadText}
										className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-silver transition-colors hover:border-ice hover:text-ice"
									>
										<Download className="h-4 w-4" />
										تحميل
									</button>
								</div>
							) : null}
						</div>

						{status === 'done' ? (
							<textarea
								value={transcript}
								onChange={e => setTranscript(e.target.value)}
								aria-label="النص المفرّغ القابل للتحرير"
								className="mt-5 min-h-72 flex-1 resize-y rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-8 text-silver outline-none transition-colors focus:border-ice"
							/>
						) : (
							<div className="mt-5 flex min-h-72 flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-6 text-center">
								{status === 'processing' ? (
									<>
										<Loader2 className="h-8 w-8 animate-spin text-ice" />
										<p className="mt-4 text-sm font-medium text-silver">
											يجري تفريغ التسجيل… سيظهر النص هنا خلال لحظات
										</p>
									</>
								) : (
									<>
										<FileAudio className="h-8 w-8 text-silver/50" />
										<p className="mt-4 max-w-xs text-sm leading-7 text-silver/70">
											سيظهر النص المفرّغ هنا مع التوقيتات الزمنية وأسماء المتحدثين،
											قابلًا للتحرير والنسخ والتحميل.
										</p>
									</>
								)}
							</div>
						)}
					</div>
				</div>

				<p className="mt-6 text-center text-xs text-silver/60">
					هذه تجربة توضيحية تعمل بالكامل داخل المتصفح — لا يُرفع أي ملف إلى خادم.
				</p>
			</div>
		</section>
	);
}

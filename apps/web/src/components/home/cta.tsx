import { ArrowLeft } from 'lucide-react';
import { Waveform } from '@/components/home/waveform';

export function Cta() {
	return (
		<section className="bg-noise relative overflow-hidden bg-midnight">
			<Waveform
				barCount={90}
				className="pointer-events-none absolute inset-x-0 bottom-0 h-40 justify-center opacity-[0.07]"
			/>
			<div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-24 text-center md:px-8 md:py-32">
				<h2 className="font-display text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl md:leading-tight">
					جاهز لتحويل أول تسجيل؟
				</h2>
				<p className="mt-5 max-w-xl text-base leading-8 text-silver">
					ابدأ مجانًا اليوم، وحوّل أول ملف صوتي إلى نص قابل للتحرير خلال دقائق —
					دون تثبيت أي برنامج.
				</p>
				<div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
					<a
						href="#demo"
						className="inline-flex items-center gap-2 rounded-full bg-ice px-8 py-3.5 text-base font-bold text-midnight transition-all hover:bg-white active:scale-[0.98]"
					>
						ابدأ الآن
						<ArrowLeft className="h-4 w-4" />
					</a>
					<a
						href="#how"
						className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-silver transition-colors hover:border-ice hover:text-ice active:scale-[0.98]"
					>
						تعرّف على الآلية
					</a>
				</div>
			</div>
		</section>
	);
}

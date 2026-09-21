import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Waveform } from '@/components/home/waveform';

const container = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
	hidden: { opacity: 0, y: 26 },
	show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const TEXT_LINES = ['92%', '74%', '86%', '60%'];

export function Hero() {
	return (
		<section id="top" className="bg-noise relative overflow-hidden">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-32 start-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-ice/15 blur-3xl"
			/>
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center md:px-8"
			>
				<motion.p
					variants={item}
					className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-accent"
				>
					<Sparkles className="h-3.5 w-3.5" />
					مدعوم بالذكاء الاصطناعي
				</motion.p>

				<motion.h1
					variants={item}
					className="mt-7 max-w-4xl font-display text-4xl font-extrabold leading-[1.25] tracking-tight text-foreground sm:text-6xl md:text-7xl md:leading-[1.2]"
				>
					حوّل صوتك إلى{' '}
					<span className="relative inline-block whitespace-nowrap">
						<span className="relative z-10">نص</span>
						<motion.svg
							aria-hidden="true"
							viewBox="0 0 120 22"
							className="absolute -bottom-2 start-0 z-0 h-4 w-full text-ice md:h-5"
							fill="none"
						>
							<motion.path
								d="M4 15 C 30 6, 62 20, 116 9"
								stroke="currentColor"
								strokeWidth="6"
								strokeLinecap="round"
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
							/>
						</motion.svg>
					</span>{' '}
					بدقة وسرعة
				</motion.h1>

				<motion.p
					variants={item}
					className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9"
				>
					حوّل التسجيلات الصوتية والمحاضرات والمقابلات والاجتماعات إلى نص قابل
					للتحرير خلال دقائق، مع تجربة سهلة ودعم متقدم للغة العربية.
				</motion.p>

				<motion.div variants={item} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
					<a
						href="#demo"
						className="inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-midnight-soft active:scale-[0.98]"
					>
						ابدأ الآن
						<ArrowLeft className="h-4 w-4" />
					</a>
					<a
						href="#demo"
						className="inline-flex h-13 items-center rounded-full border border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
					>
						جرّب مجانًا
					</a>
				</motion.div>

				<motion.p variants={item} className="mt-4 text-xs text-muted-foreground">
					لا حاجة لبطاقة ائتمانية · جرّب مباشرة من متصفحك
				</motion.p>

				{/* Waveform gradually turning into text */}
				<motion.div
					variants={item}
					className="mt-14 w-full max-w-4xl overflow-hidden rounded-3xl bg-midnight p-6 shadow-2xl shadow-primary/25 md:p-9"
				>
					<div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
						<div className="flex flex-col items-center gap-3">
							<Waveform barCount={40} className="h-20 w-full justify-center" />
							<span className="text-[11px] font-medium tracking-widest text-silver/70">
								المدخل الصوتي
							</span>
						</div>

						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-ice/30 bg-ice/10 text-ice">
							<ArrowLeft className="h-5 w-5 rotate-90 md:rotate-0" />
						</div>

						<div className="flex flex-col items-center gap-3">
							<div className="flex w-full max-w-xs flex-col gap-2.5">
								{TEXT_LINES.map((width, i) => (
									<span
										key={i}
										className="line-reveal h-2.5 rounded-full bg-silver/30"
										style={{ width, animationDelay: `${i * 0.55}s` }}
									/>
								))}
							</div>
							<span className="text-[11px] font-medium tracking-widest text-silver/70">
								النص الناتج
							</span>
						</div>
					</div>

					<div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-sm text-silver">
						<span className="caret-blink inline-block h-4 w-[2px] rounded-full bg-ice" />
						<span>…حوّل التسجيلات الصوتية والمحاضرات إلى نص قابل للتحرير</span>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}

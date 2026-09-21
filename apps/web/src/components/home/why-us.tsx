import { Check } from 'lucide-react';
import { SectionEdge } from '@/components/section-edge';

const POINTS = [
	'محرّك مدرّب خصيصًا على العربية الفصحى ولهجاتها المتنوعة',
	'بنية معالجة سحابية تنجز ساعات التسجيل في دقائق معدودة',
	'تُحذف ملفاتك تلقائيًا بعد انتهاء الجلسة — خصوصيتك أولوية',
];

const METRICS = [
	{ value: '+٣٠', label: 'صيغة ملف مدعومة' },
	{ value: '×١٠', label: 'أسرع من التفريغ اليدوي' },
	{ value: '١٠٠٪', label: 'خصوصية بياناتك' },
];

export function WhyUs() {
	return (
		<section id="why" className="relative scroll-mt-20">
			<SectionEdge index="٠٥" label="لماذا نحن" />
			<div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
				<div className="grid items-center gap-14 lg:grid-cols-[1.3fr_1fr]">
					<div>
						<p className="text-sm font-semibold tracking-wide text-accent">لماذا نحن؟</p>
						<h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight md:text-5xl md:leading-[1.35]">
							من الصوت إلى معرفة قابلة للاستخدام
						</h2>
						<p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
							لا نكتفي بتحويل الكلام إلى حروف — نحوّل تسجيلاتك إلى أصول معرفية
							قابلة للبحث والتحرير والمشاركة، لتبقى أفكارك ومحاضرك حيّة بعد انتهاء
							الصوت.
						</p>
						<ul className="mt-8 space-y-4">
							{POINTS.map(point => (
								<li key={point} className="flex items-start gap-3">
									<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ice/20 text-accent">
										<Check className="h-3.5 w-3.5" strokeWidth={3} />
									</span>
									<span className="text-sm leading-7 text-foreground">{point}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="flex flex-col divide-y divide-border rounded-3xl border border-border bg-card shadow-sm">
						{METRICS.map(metric => (
							<div key={metric.label} className="flex items-baseline justify-between gap-4 px-8 py-7">
								<span className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
									{metric.value}
								</span>
								<span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

import { BrainCircuit, CloudUpload, FileCheck2, type LucideIcon } from 'lucide-react';
import { SectionEdge } from '@/components/section-edge';

interface Step {
	number: string;
	icon: LucideIcon;
	title: string;
	description: string;
}

const STEPS: Step[] = [
	{
		number: '٠١',
		icon: CloudUpload,
		title: 'ارفع الملف',
		description: 'ارفع التسجيل الصوتي أو الفيديو بسحبه مباشرة إلى المنصة أو اختياره من جهازك.',
	},
	{
		number: '٠٢',
		icon: BrainCircuit,
		title: 'دع الذكاء الاصطناعي يعمل',
		description: 'تتم معالجة الصوت وتحويل الكلام إلى نص تلقائيًا مع التوقيتات والمتحدثين.',
	},
	{
		number: '٠٣',
		icon: FileCheck2,
		title: 'راجع وحمّل',
		description: 'راجع النص، حرّره داخل المحرر، ثم حمّله بالصيغة التي تناسبك.',
	},
];

export function HowItWorks() {
	return (
		<section id="how" className="relative scroll-mt-20">
			<SectionEdge index="٠١" label="كيف تعمل" />
			<div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
				<div className="max-w-2xl">
					<p className="text-sm font-semibold tracking-wide text-accent">كيف تعمل الخدمة؟</p>
					<h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight md:text-5xl md:leading-tight">
						ثلاث خطوات تفصلك عن نص جاهز
					</h2>
				</div>

				<ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
					{STEPS.map(step => (
						<li key={step.number} className="group relative border-t-2 border-border pt-8 transition-colors hover:border-ice">
							<span className="font-display text-5xl font-extrabold text-secondary transition-colors group-hover:text-ice/40">
								{step.number}
							</span>
							<div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-ice">
								<step.icon className="h-6 w-6" strokeWidth={1.8} />
							</div>
							<h3 className="mt-5 font-display text-xl font-bold">{step.title}</h3>
							<p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

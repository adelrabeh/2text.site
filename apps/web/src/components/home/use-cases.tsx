import { ArrowLeft } from 'lucide-react';
import { useCases } from '@/data/use-cases';
import { SectionEdge } from '@/components/section-edge';

const ARABIC_NUMERALS = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧', '٠٨'];

export function UseCases() {
	return (
		<section id="uses" className="relative scroll-mt-20">
			<SectionEdge index="٠٣" label="الاستخدامات" />
			<div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm font-semibold tracking-wide text-accent">حالات الاستخدام</p>
						<h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight md:text-5xl md:leading-tight">
							مصمم لاحتياجاتك
						</h2>
					</div>
					<p className="max-w-sm text-sm leading-7 text-muted-foreground">
						أيًا كان تسجيلك — اجتماع عمل أو حلقة بودكاست أو شهادة تاريخية — يحوّله
						تدوين إلى نص جاهز للاستخدام.
					</p>
				</div>

				<div className="mt-14 grid md:grid-cols-2 md:gap-x-12">
					{useCases.map((useCase, i) => (
						<div
							key={useCase.title}
							className="group flex items-center gap-5 border-t border-border py-6 transition-colors last:border-b hover:bg-secondary/40 md:last:border-t md:[&:nth-last-child(2)]:border-b"
						>
							<span className="font-display text-sm font-bold text-silver transition-colors group-hover:text-accent">
								{ARABIC_NUMERALS[i]}
							</span>
							<div className="flex-1">
								<h3 className="font-display text-lg font-bold md:text-xl">{useCase.title}</h3>
								<p className="mt-1.5 text-sm leading-7 text-muted-foreground">
									{useCase.description}
								</p>
							</div>
							<ArrowLeft className="h-5 w-5 shrink-0 text-silver opacity-0 transition-all group-hover:-translate-x-1 group-hover:text-accent group-hover:opacity-100" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

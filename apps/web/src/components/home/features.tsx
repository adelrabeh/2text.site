import { features } from '@/data/features';
import { SectionEdge } from '@/components/section-edge';

export function Features() {
	return (
		<section id="features" className="bg-noise relative scroll-mt-20 bg-secondary/50">
			<SectionEdge index="٠٢" label="المزايا" />
			<div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
				<div className="max-w-2xl">
					<p className="text-sm font-semibold tracking-wide text-accent">المزايا الرئيسية</p>
					<h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight md:text-5xl md:leading-tight">
						كل ما تحتاجه في منصة واحدة
					</h2>
					<p className="mt-4 text-base leading-8 text-muted-foreground">
						منظومة متكاملة من الأدوات صُممت لتأخذك من التسجيل الخام إلى نص نهائي
						جاهز للنشر والأرشفة.
					</p>
				</div>

				<div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{features.map(feature => (
						<article
							key={feature.title}
							className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ice/60 hover:shadow-lg hover:shadow-primary/10"
						>
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-accent transition-colors group-hover:bg-primary group-hover:text-ice">
								<feature.icon className="h-5 w-5" strokeWidth={2} />
							</div>
							<h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
							<p className="mt-2 text-sm leading-7 text-muted-foreground">
								{feature.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

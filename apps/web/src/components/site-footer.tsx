import { AudioLines } from 'lucide-react';

const PRODUCT_LINKS = [
	{ href: '#how', label: 'كيف تعمل الخدمة' },
	{ href: '#features', label: 'المزايا الرئيسية' },
	{ href: '#demo', label: 'التجربة التفاعلية' },
	{ href: '#uses', label: 'حالات الاستخدام' },
];

const COMPANY_LINKS = [
	{ href: '#why', label: 'لماذا تدوين' },
	{ href: '#top', label: 'من نحن' },
	{ href: '#top', label: 'تواصل معنا' },
	{ href: '#top', label: 'سياسة الخصوصية' },
];

export function SiteFooter() {
	const year = new Date().toLocaleDateString('ar-EG', { year: 'numeric' });

	return (
		<footer className="bg-midnight text-silver">
			<div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
				<div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
					<div>
						<a href="#top" className="flex items-center gap-2.5">
							<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ice/15 text-ice">
								<AudioLines className="h-5 w-5" strokeWidth={2.2} />
							</span>
							<span className="font-display text-xl font-bold text-white">تدوين</span>
						</a>
						<p className="mt-4 max-w-sm text-sm leading-7 text-silver/80">
							منصة عربية لتحويل الصوت إلى نص بالذكاء الاصطناعي — دقة عالية، سرعة
							فائقة، ودعم متقدم للغة العربية ولهجاتها.
						</p>
					</div>

					<nav aria-label="روابط المنتج">
						<h3 className="font-display text-sm font-semibold text-white">المنتج</h3>
						<ul className="mt-4 space-y-3">
							{PRODUCT_LINKS.map(link => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-silver/80 transition-colors hover:text-ice"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<nav aria-label="روابط الشركة">
						<h3 className="font-display text-sm font-semibold text-white">الشركة</h3>
						<ul className="mt-4 space-y-3">
							{COMPANY_LINKS.map(link => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-silver/80 transition-colors hover:text-ice"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-silver/60 sm:flex-row">
					<p>© {year} تدوين. جميع الحقوق محفوظة.</p>
					<p>صُنع بعناية للغة العربية</p>
				</div>
			</div>
		</footer>
	);
}

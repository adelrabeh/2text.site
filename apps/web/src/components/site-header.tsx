import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
	{ href: '#how', label: 'كيف تعمل' },
	{ href: '#features', label: 'المزايا' },
	{ href: '#uses', label: 'الاستخدامات' },
	{ href: '#demo', label: 'التجربة' },
	{ href: '#why', label: 'لماذا نحن' },
];

export function SiteHeader() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
				<a href="#top" className="flex items-center gap-2.5" aria-label="نطق">
					<img src="/logo.svg" alt="شعار نطق" className="h-11 w-16 object-contain" />
					<span className="font-display text-2xl font-bold tracking-tight">نطق</span>
				</a>

				<nav aria-label="التنقل الرئيسي" className="hidden items-center gap-7 lg:flex">
					{NAV_LINKS.map(link => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<a
						href="#demo"
						className="hidden h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:bg-midnight-soft active:scale-[0.98] sm:inline-flex"
					>
						ابدأ الآن
					</a>
					<button
						type="button"
						onClick={() => setOpen(prev => !prev)}
						aria-expanded={open}
						aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
						className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
					>
						{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</div>
			</div>

			{open ? (
				<nav
					aria-label="قائمة الجوال"
					className="border-t border-border/60 bg-background px-5 pb-6 pt-3 lg:hidden"
				>
					<ul className="space-y-1">
						{NAV_LINKS.map(link => (
							<li key={link.href}>
								<a
									href={link.href}
									onClick={() => setOpen(false)}
									className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
								>
									{link.label}
								</a>
							</li>
						))}
						<li>
							<a
								href="#demo"
								onClick={() => setOpen(false)}
								className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
							>
								ابدأ الآن
							</a>
						</li>
					</ul>
				</nav>
			) : null}
		</header>
	);
}

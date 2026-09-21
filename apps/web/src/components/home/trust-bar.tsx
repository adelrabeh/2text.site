import { FileAudio, FileText, Languages, ShieldCheck, Zap, type LucideIcon } from 'lucide-react';

interface TrustItem {
	icon: LucideIcon;
	title: string;
	description: string;
}

const ITEMS: TrustItem[] = [
	{ icon: Zap, title: 'تحويل سريع', description: 'دقائق بدلًا من ساعات' },
	{ icon: Languages, title: 'دعم اللغة العربية', description: 'الفصحى واللهجات' },
	{ icon: FileAudio, title: 'ملفات صوتية متعددة', description: 'MP3 وWAV وM4A وأكثر' },
	{ icon: FileText, title: 'نص قابل للتحرير', description: 'راجع وعدّل بسهولة' },
	{ icon: ShieldCheck, title: 'خصوصية وأمان', description: 'ملفاتك تبقى لك وحدك' },
];

export function TrustBar() {
	return (
		<section aria-label="مؤشرات الثقة" className="border-y border-border bg-secondary/60">
			<div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 sm:grid-cols-3 md:px-8 lg:grid-cols-5">
				{ITEMS.map(item => (
					<div key={item.title} className="flex items-start gap-3">
						<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-accent shadow-sm">
							<item.icon className="h-5 w-5" strokeWidth={2} />
						</span>
						<div>
							<p className="text-sm font-semibold text-foreground">{item.title}</p>
							<p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

import {
	AudioLines,
	Database,
	FileAudio,
	FileDown,
	Languages,
	PenLine,
	Search,
	Timer,
	Users,
	type LucideIcon,
} from 'lucide-react';

export interface Feature {
	icon: LucideIcon;
	title: string;
	description: string;
}

export const features: Feature[] = [
	{
		icon: AudioLines,
		title: 'تحويل الصوت إلى نص',
		description: 'محرّك ذكاء اصطناعي يلتقط الكلام بدقة عالية ويحوّله إلى نص واضح ومنسّق.',
	},
	{
		icon: Languages,
		title: 'دعم العربية',
		description: 'تفريغ دقيق للفصحى مع فهم اللهجات العربية المختلفة والتبديل بينها.',
	},
	{
		icon: Users,
		title: 'التعرف على المتحدثين',
		description: 'تمييز تلقائي بين أصوات المتحدثين وإسناد كل مقطع إلى صاحبه.',
	},
	{
		icon: Timer,
		title: 'التوقيتات الزمنية',
		description: 'طوابع زمنية دقيقة لكل مقطع تسهّل المراجعة والرجوع إلى التسجيل.',
	},
	{
		icon: PenLine,
		title: 'تحرير النص',
		description: 'محرر مدمج لتنقيح النص وتنسيقه مباشرة قبل التصدير النهائي.',
	},
	{
		icon: Search,
		title: 'البحث داخل النص',
		description: 'اعثر على أي كلمة أو عبارة داخل التفريغ في ثوانٍ معدودة.',
	},
	{
		icon: FileDown,
		title: 'تصدير النص',
		description: 'حمّل النص بصيغ TXT وDOCX وSRT وغيرها بضغطة واحدة.',
	},
	{
		icon: Database,
		title: 'معالجة الملفات الكبيرة',
		description: 'تسجيلات تمتد لساعات تُعالج كاملة دون تقطيع أو فقدان.',
	},
	{
		icon: FileAudio,
		title: 'دعم صيغ متعددة',
		description: 'MP3 وWAV وM4A وMP4 وغيرها من الصيغ الصوتية والمرئية الشائعة.',
	},
];

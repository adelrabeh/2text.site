import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { Hero } from '@/components/home/hero';
import { TrustBar } from '@/components/home/trust-bar';
import { HowItWorks } from '@/components/home/how-it-works';
import { Features } from '@/components/home/features';
import { UseCases } from '@/components/home/use-cases';
import { Demo } from '@/components/home/demo';
import { WhyUs } from '@/components/home/why-us';
import { Cta } from '@/components/home/cta';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'تدوين — حوّل صوتك إلى نص بدقة وسرعة',
		description:
			'منصة عربية لتحويل الصوت إلى نص بالذكاء الاصطناعي: التسجيلات والمحاضرات والمقابلات والاجتماعات تصبح نصًا قابلًا للتحرير خلال دقائق.',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: 'تدوين',
			applicationCategory: 'BusinessApplication',
			operatingSystem: 'Web',
			inLanguage: 'ar',
			description:
				'منصة عربية لتحويل الصوت إلى نص بالذكاء الاصطناعي مع دعم متقدم للغة العربية ولهجاتها.',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		},
	});
}

export default function HomePage() {
	return (
		<>
			<Hero />
			<TrustBar />
			<HowItWorks />
			<Features />
			<UseCases />
			<Demo />
			<WhyUs />
			<Cta />
		</>
	);
}

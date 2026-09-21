import { cn } from '@/lib/utils';

interface WaveformProps {
	barCount?: number;
	playing?: boolean;
	className?: string;
	barClassName?: string;
}

/** Deterministic pseudo-random height so SSR and client render match. */
function barHeight(index: number): number {
	const seed = Math.sin(index * 12.9898) * 43758.5453;
	const fraction = seed - Math.floor(seed);
	return 22 + fraction * 78;
}

export function Waveform({
	barCount = 48,
	playing = true,
	className,
	barClassName,
}: WaveformProps) {
	return (
		<div
			dir="ltr"
			aria-hidden="true"
			className={cn('flex h-16 items-center gap-[3px]', className)}
		>
			{Array.from({ length: barCount }, (_, i) => (
				<span
					key={i}
					className={cn('wave-bar w-[3px] shrink-0 rounded-full bg-ice/80', barClassName)}
					style={{
						height: `${barHeight(i)}%`,
						animationDuration: `${0.9 + (i % 5) * 0.18}s`,
						animationDelay: `${(i % 9) * 0.09}s`,
						animationPlayState: playing ? 'running' : 'paused',
					}}
				/>
			))}
		</div>
	);
}

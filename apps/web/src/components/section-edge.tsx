interface SectionEdgeProps {
	index: string;
	label: string;
	tone?: 'light' | 'dark';
}

/**
 * Vertical orientation label pinned to the section's start edge —
 * the recurring signature detail across the page's horizontal bands.
 */
export function SectionEdge({ index, label, tone = 'light' }: SectionEdgeProps) {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-y-0 start-3 hidden items-center lg:flex xl:start-6"
		>
			<span
				className={`vertical-edge-label rotate-180 text-[11px] font-medium tracking-[0.4em] ${
					tone === 'dark' ? 'text-silver/50' : 'text-muted-foreground/60'
				}`}
			>
				{index} · {label}
			</span>
		</div>
	);
}

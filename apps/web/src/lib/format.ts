export function formatFileSize(bytes: number): string {
	if (bytes <= 0) return '0 KB';
	const units = ['B', 'KB', 'MB', 'GB'];
	const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
	const value = bytes / 1024 ** index;
	return `${value.toFixed(value >= 100 || index === 0 ? 0 : 1)} ${units[index]}`;
}

export function formatDuration(totalSeconds: number): string {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

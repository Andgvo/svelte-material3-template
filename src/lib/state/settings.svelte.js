import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

class SettingsState {
	theme = $state('light');

	constructor() {
		if (typeof window !== 'undefined') {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme) {
				this.theme = storedTheme;
				this.applyTheme(storedTheme);
			} else {
				// Default based on body class or prefers-color-scheme
				const isDark = document.body.classList.contains('dark') || 
							   window.matchMedia('(prefers-color-scheme: dark)').matches;
				this.theme = isDark ? 'dark' : 'light';
				this.applyTheme(this.theme);
			}
		}
	}

	toggleTheme() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', this.theme);
			this.applyTheme(this.theme);
		}
	}

	/**
	 * @param {string} theme
	 */
	applyTheme(theme) {
		if (typeof document !== 'undefined') {
			if (theme === 'dark') {
				document.body.classList.add('dark');
				document.body.classList.remove('light');
			} else {
				document.body.classList.add('light');
				document.body.classList.remove('dark');
			}
		}
	}

	async signOut() {
		await goto(resolve('/login'));
	}
}

export const settings = new SettingsState();

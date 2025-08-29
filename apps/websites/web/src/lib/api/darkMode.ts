export const toggleDarkMode = () => {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

export const getCurrentMode = () => {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const current = body.getAttribute('data-theme');
    if (current) return current;

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
};

const applyInitialTheme = () => {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const current = body.getAttribute('data-theme');
    if (current) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.body.setAttribute('data-theme', theme);
};

applyInitialTheme();
export type Theme = 'light' | 'dark';

const storageKey = 'zeroclave-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: light)');

const readStoredTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const storeTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // The visual state still works when storage is unavailable.
  }
};

const getActiveTheme = (): Theme => {
  const currentTheme = document.documentElement.dataset.theme;
  if (currentTheme === 'light' || currentTheme === 'dark') {
    return currentTheme;
  }

  return systemTheme.matches ? 'light' : 'dark';
};

const syncThemeImages = (theme: Theme): void => {
  document
    .querySelectorAll<HTMLSourceElement>('source[data-theme-source="light"]')
    .forEach((source) => {
      source.media = theme === 'light' ? 'all' : 'not all';
    });
};

const syncThemeControl = (theme: Theme): void => {
  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (!toggle) {
    return;
  }

  const targetLabel = theme === 'dark' ? '切换到日间模式' : '切换到夜间模式';
  const visibleLabel = toggle.querySelector<HTMLElement>('[data-theme-toggle-label]');
  if (visibleLabel) {
    visibleLabel.textContent = theme === 'dark' ? '日间' : '夜间';
  }

  toggle.setAttribute('aria-label', targetLabel);
  toggle.setAttribute('title', targetLabel);
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
};

const applyTheme = (theme: Theme, persist = false): void => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  syncThemeImages(theme);
  syncThemeControl(theme);

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content = theme === 'light' ? '#ffffff' : '#020c09';
  }

  if (persist) {
    storeTheme(theme);
  }
};

export const initializeTheme = (): void => {
  applyTheme(getActiveTheme());

  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  toggle?.addEventListener('click', () => {
    const nextTheme: Theme = getActiveTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });

  systemTheme.addEventListener('change', (event) => {
    if (!readStoredTheme()) {
      applyTheme(event.matches ? 'light' : 'dark');
    }
  });
};

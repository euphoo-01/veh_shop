import { SVG_ICONS_PATH } from '@/app/config';

const svgRaw = import.meta.glob(SVG_ICONS_PATH, { as: 'raw', eager: 'true' });

const svgResources = (() => {
  const cache = new Map();
  for (const [path, code] of Object.entries(svgRaw)) {
    const iconName = path.slice(path.lastIndexOf('/') + 1, -4); // .svg = 4 символа
    cache.set(iconName, code);
  }
  return cache;
})();

export const getSvgIconCode = (iconName) => {
  return svgResources.get(iconName) || '';
};

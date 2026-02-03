const svgRaw = import.meta.glob('@/app/assets/icons/*.svg', { query: '?raw', eager: true });

const svgResources = (() => {
  const map = new Map();
  for (const [path, code] of Object.entries(svgRaw)) {
    const iconName = path.slice(path.lastIndexOf('/') + 1, -4); // .svg = 4 символа
    map.set(iconName, code.default);
  }
  return map;
})();

export const getSvgIconCode = (name) => {
  return svgResources.get(name);
};

export const checkIfIconNameExist = (iconName) => {
  return svgResources.has(iconName);
};

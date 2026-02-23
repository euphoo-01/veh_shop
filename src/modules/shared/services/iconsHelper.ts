const svgRaw = import.meta.glob("@/app/assets/icons/*.svg", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

const svgResources = (() => {
  const map = new Map<string, string>();
  for (const [path, code] of Object.entries(svgRaw)) {
    const iconName = path.slice(path.lastIndexOf("/") + 1, -4); // .svg = 4 chars
    map.set(iconName, code.default);
  }
  return map;
})();

export const getSvgIconCode = (name: string): string | undefined => {
  return svgResources.get(name);
};

export const checkIfIconNameExist = (iconName: string): boolean => {
  return svgResources.has(iconName);
};

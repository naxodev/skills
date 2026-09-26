() => {
  const theme = document.documentElement.dataset.theme;
  const figures = [...document.querySelectorAll('.mermaid-fig')];
  const measurements = figures.map((figure) => {
    const variants = [...figure.querySelectorAll('.mermaid-variant')];
    const visible = variants.filter((variant) => getComputedStyle(variant).display !== 'none');
    const svg = visible[0]?.querySelector('svg');
    return {
      variants: variants.length,
      visibleVariants: visible.length,
      visibleVariant: visible[0]?.className,
      matchesTheme: visible[0]?.classList.contains(`mermaid-${theme}`) ?? false,
      tabIndex: figure.tabIndex,
      label: figure.getAttribute('aria-label'),
      width: figure.clientWidth,
      scrollWidth: figure.scrollWidth,
      svgWidth: svg?.getBoundingClientRect().width,
      naturalWidth: svg?.viewBox.baseVal.width,
    };
  });
  const failures = [];
  if (figures.length !== 2) failures.push('Expected both fixture diagrams to render');
  if (document.documentElement.scrollWidth > innerWidth) failures.push('The page overflows horizontally');
  for (const [index, value] of measurements.entries()) {
    if (value.variants !== 2 || value.visibleVariants !== 1) failures.push(`Diagram ${index + 1}: theme variants are incorrect`);
    if (!value.matchesTheme) failures.push(`Diagram ${index + 1}: visible variant does not match ${theme} theme`);
    if (!value.naturalWidth || Math.abs(value.svgWidth - value.naturalWidth) > 1) failures.push(`Diagram ${index + 1}: labels shrink with the viewport`);
    if (value.tabIndex !== 0 || !value.label) failures.push(`Diagram ${index + 1}: scroll container lacks named keyboard access`);
  }
  return { passed: failures.length === 0, failures, theme, viewport: innerWidth, pageWidth: document.documentElement.scrollWidth, measurements };
};

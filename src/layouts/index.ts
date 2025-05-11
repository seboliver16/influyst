export { DefaultLayout } from './DefaultLayout';
export { CreatorLayout } from './CreatorLayout';
export { PortfolioLayout } from './PortfolioLayout';
export { MasonryLayout } from './MasonryLayout';

export type LayoutType = 'default' | 'creator' | 'portfolio' | 'masonry';

export const getLayout = (type: LayoutType) => {
  switch (type) {
    case 'creator':
      return CreatorLayout;
    case 'portfolio':
      return PortfolioLayout;
    case 'masonry':
      return MasonryLayout;
    default:
      return DefaultLayout;
  }
};
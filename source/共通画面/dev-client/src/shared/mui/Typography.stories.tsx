import React from 'react';
import KfTypography from './Typography';

export default {
  title: 'shared/mui/Typography',
  component: KfTypography,
};

export const Headline = () => (
  <KfTypography _variant="h4" _color="primary" _fontWeight="bold" _children="見出しテキスト" />
);

export const Body = () => (
  <KfTypography _variant="body1" _children="本文テキスト" />
);

export const NoWrap = () => (
  <KfTypography _variant="body2" _noWrap _children="とても長いテキストが折り返されません" />
);

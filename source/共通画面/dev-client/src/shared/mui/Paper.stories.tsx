import React from 'react';
import KfPaper from './Paper';

export default {
  title: 'shared/mui/Paper',
  component: KfPaper,
};

export const Elevation = () => (
  <KfPaper _elevation={3} _children={<div>影付きPaper</div>} />
);

export const Outlined = () => (
  <KfPaper _variant="outlined" _children={<div>枠線Paper</div>} />
);

export const WithStyle = () => (
  <KfPaper _style={{ padding: 16, background: '#eee' }} _children="カスタムスタイル" />
);

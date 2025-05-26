import React from 'react';
import KfBox from './Box';

export default {
  title: 'shared/mui/Box',
  component: KfBox,
};

export const Default = () => (
  <KfBox _children="デフォルトBox" />
);

export const WithStyle = () => (
  <KfBox _children="背景色付きBox" _sx={{ p: 2, bgcolor: 'lightblue' }} />
);

export const AsSection = () => (
  <KfBox _component="section" _children={<p>sectionタグとして描画</p>} />
);

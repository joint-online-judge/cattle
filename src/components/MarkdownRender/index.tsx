import React from 'react';
import { dynamic } from 'umi';

// Don't know the exact type. Just to suppress warning.
const AsyncMarkdownRender: React.FC = dynamic({
  async loader() {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
    const { default: MR } = await import(
      /* webpackChunkName: "external_markdown_render" */ './MarkdownRenderer'
    );
    return MR;
  },
}) as React.FC;

export default AsyncMarkdownRender;

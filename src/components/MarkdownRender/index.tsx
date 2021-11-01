import { dynamic } from 'umi';

const AsyncMarkdownRender = dynamic({
  loader: async function () {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
    const { default: MR } = await import(
      /* webpackChunkName: "external_markdown_render" */ './MarkdownRenderer'
    );
    return MR;
  },
});

export default AsyncMarkdownRender;

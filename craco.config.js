//配置具体的修改规则
const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    //支持装饰器
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true, //设置为true即是less 这里用的是css
        },
      ],
    ],
  }, //到这里配置了“按需引入”
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#088B42" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ], //到这里配置了“自定义主题”
};

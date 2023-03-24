// 引入包
const path = require("path");
// 引入html插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入clean插件 先清空dist目录然后再输出
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack中的所有配置 都应该写在下面中
module.exports = {
  mode: "none",
  // 指定入口文件
  entry: path.join(__dirname, "src/index.ts"),
  //指定打包文件所在的目录
  output: {
    // 指定打包输出路径
    // path: "./dist",
    path: path.resolve(__dirname, "dist"),
    // 打包后的文件名
    filename: "bundle.js",
    environment: {
      //告诉webpack 不使用箭头函数
      arrowFunction: false,
      // 不要使用const
      const: false,
    },
  },
  //指定webpack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      {
        // tst 指定的规则生效文件
        test: /\.ts$/, //以ts结尾的文件
        use: [
          //这个是按照顺序执行的
          //配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    modules: "commonjs",
                    //指定编译后代码兼容版本
                    targets: {
                      chrome: "88",
                      // 兼容ie
                      ie: "11",
                    },
                    //用那个版本的js 在packagejson 中 corejs 的版本
                    corejs: "3",
                    //使用corejs 的方式  usage是按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ], //用ts-loader处理 以.ts 结尾的文件 要使用的loader
        exclude: /node-modules/, //排除目录
      },
      // 设置less文件的处理
      {
        test: /\.less$/,
        use: [
          //从下至上进行解析
          "style-loader",
          "css-loader",
          // 引入postcss 去处理兼容问题
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // 插件
                    "postcss-preset-env",
                    {
                      // 浏览器环境
                      browers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      //   title: "这是一个自定义的title",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin({}),
  ],
  // 用来设置引用模块 以下数组中 指定文件后缀才可被引入
  resolve: {
    extensions: [".ts", ".js"],
  },
};


module.exports={
  entry:'./src/main.js',  //指定打包的入口文件
  output:{
  	path : __dirname+'/dist',  // 注意：webpack1.14.0 要求这个路径是一个绝对路径
  	filename:'build.js'
  },
  module:{
  	loaders:[
  		{
  			test: /\.css$/,
  			loader:'style-loader!css-loader'  //从右边向左边调用
  		}
  	]
  }
}
var path = require('path');

module.exports = {
	entry: "./src/main.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: path.resolve(__dirname, "node_modules"),
				loader: 'awesome-typescript-loader'
			}
		],
	},
	resolve: {
		modules: [
			__dirname,
			path.resolve(__dirname, "src"),
			"node_modules"
		],
		extensions: ['.ts', '.js'],
	},
	output: {
		path: __dirname + '/dist/',
		filename: '[name].js',
		publicPath: 'dist'
	},
	devServer: {
		contentBase: __dirname
	},
	devtool: "source-map"
};

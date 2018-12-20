'use strict';

const webpack                    = require('webpack');
const fs                         = require('fs');
const path                       = require('path');
const UglifyJsPlugin             = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin       = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin    = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin         = require('clean-webpack-plugin');
const glob                       = require('glob');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const json                       = JSON.parse(fs.readFileSync('./package.json'));
const randomString               = require('random-string');
const IncludeFileWebpackPlugin   = require('include-file-webpack-plugin');
const moment                     = require('moment');



let globs = {
	examples     : 'examples',
	build        : 'src',
	dist         : 'dist'
};




// Site Info
let customWebsiteVersion     = json.version,
	customWebsiteAuthor      = json.author,
	customWebsiteTitle       = 'Uix Webpack Scaffold',
	customWebsiteDesc        = 'Simple demo for scaffold of webpack 4 + react + babel. Supports batch processing of HTML templates, SASS, and JavaScript module files.',
	customWebsiteCanonical   = '<link rel="canonical" href="https://uiux.cc" />',
	customWebsiteGenerator   = 'Uix Webpack Scaffold',
	customWebsiteHash        = randomString({length: 20}),
	customWebsiteComment     = `
## Project Name        :  ` + customWebsiteTitle + `
## Project Description :  ` + customWebsiteDesc + `
## Based on            :  ` + customWebsiteGenerator + `
## Version             :  ` + customWebsiteVersion + `
## Last Update         :  ` + moment().format( "MMMM D, YYYY" ) + `
## Powered by          :  ` + customWebsiteAuthor + `
## Created by          :  UIUX Lab (https://uiux.cc)
## Contact Us          :  uiuxlab@gmail.com
## Compatible With     :  Bootstrap 4.x, React
## Released under the MIT license.
	`;



// Get all the HTML template files
let tempPages = glob.sync( './'+globs.build+'/components/**/*.html' );
let targetFilesName = [];

tempPages.map( ( event ) => {
	let filename = event.split( '/' ).pop();
	
	if ( filename.indexOf( 'include-' ) < 0 ) {
		targetFilesName.push( [ event, event.split( '/' ).pop() ] );
	}
	
});



const webpackConfig = {
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    mode: 'production',
	node: { fs: 'empty' },
    resolve: {
        extensions: ['.js', '.es6', '.vue', '.jsx' ]
    },
	entry: {
		'bundle': './'+globs.build+'/index.js',
		'bundle.min': './'+globs.build+'/index.js',
	},
    output: {
        path: path.resolve(__dirname, './' + globs.dist ),
        filename: '[name].js'
    },
	optimization: {
	    minimizer: [

			new UglifyJsPlugin({
				sourceMap: true,
			    test: /\.min\.js$/i,
			}),
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "[name].css",
				chunkFilename: "[id].css"
			}),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.min\.css$/g,
				cssProcessorPluginOptions: {
				    preset: ['default', { discardComments: { removeAll: false } }],
				},
				canPrint: true
			}),
		
		],
		
	},
    module: {
        rules: [
			{
				test: /\.json$/,
				use: 'json-loader'
			},
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve( __dirname, 'node_modules' ),
                query: {  
				  'presets': [
					  '@babel/preset-env', 
					  '@babel/preset-react'
				  ]
                }
			},
			{
				test: /\.(sa|sc|c)ss$/,
				include: path.resolve( __dirname, './' + globs.build ),
				use: [

					// fallback to style-loader in development
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: path.resolve(__dirname, './' + globs.dist )
						}
					},
					'css-loader',
					'sass-loader',

					
				]
			},
			
			{
				test: /\.html$/,
				use: [ 
					{
						loader: 'html-loader',
						options: {
							minimize: false,
							removeComments: false,
							collapseWhitespace: false
						}
					}
				]
			},
			
		
			/*
			{
				test: /\.scss$/,
				loader: 'prettier-loader',
				// force this loader to run first if it's not first in loaders list
				enforce: 'pre',
				// avoid running prettier on all the files!
				// use it only on your source code and not on dependencies!
				options: {
					'parser': 'postcss',
					// additional prettier options assigned to options in
					// - .prettierrc,
					// - prettier.config.js,
					// - "prettier" property in package.json
					'printWidth': 120,    
					'tabWidth': 4,
					'semi': true,           
					'singleQuote': true,   
					'trailingComma': 'none', 
					'bracketSpacing': true,
					'jsxBracketSameLine': false, 
					'arrowParens': 'avoid', 
					'requirePragma': false, 
					'proseWrap': 'preserve' 
					
				},
			},	
			*/
			
	
			
        ],
		
		

    },
	plugins: [
		
	]
	
	
};

// Remove include files and extra CSS files
webpackConfig.plugins.push(
    new CleanWebpackPlugin([
		globs.build + '/**/*.css',
		globs.examples + '/*.html'
	]),
	
	new webpack.BannerPlugin( customWebsiteComment ),
	
);


// Batch processing HTML template files
targetFilesName.map( ( event ) => {
	
	webpackConfig.plugins.push(
		
		new IncludeFileWebpackPlugin({
			directory: '',
			input: `${event[0]}`,
			output: `./${globs.examples}/${event[1]}`,
			processIncludeContents: function(html) {
				return html;
			}
		}),	
		
		new ReplaceInFileWebpackPlugin([
			{
				dir: globs.examples,
				files: [ event[1], event[1] ],
				rules: [
					{ search: '@@{website_title}', replace: customWebsiteTitle },
					{ search: '@@{website_desc}', replace: customWebsiteDesc },
					{ search: '@@{website_canonical}', replace: customWebsiteCanonical },
					{ search: '@@{website_author}', replace: customWebsiteAuthor },
					{ search: '@@{website_generator}', replace: customWebsiteGenerator },
					{ search: '@@{website_version}', replace: customWebsiteVersion },
					{ search: '@@{website_comment}', replace: customWebsiteComment },
					{ search: '@@{website_hash}', replace: customWebsiteHash },

				]
			}
		]),	
		
		
	);
});




module.exports = webpackConfig;


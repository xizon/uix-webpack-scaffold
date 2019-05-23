'use strict';

const webpack                    = require('webpack');
const express                    = require('express');
const fs                         = require('fs');
const path                       = require('path');
const UglifyJsPlugin             = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin       = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin    = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin         = require('clean-webpack-plugin');
const glob                       = require('glob');
const randomString               = require('random-string');
const IncludeFileWebpackPlugin   = require('include-file-webpack-plugin');
const moment                     = require('moment');
const WebpackDevServer           = require('webpack-dev-server');
const json                       = JSON.parse(fs.readFileSync('./package.json'));
const webpackDevMiddleware       = require('webpack-dev-middleware');
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m" //القرمزي
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};

let globs = {
	port         : 8080,
	examples     : 'examples',
	build        : 'src',
	dist         : 'dist'
};



/*! 
 *************************************
 * Site Info
 *************************************
 */

let customWebsiteVersion     = json.version,
	customWebsiteAuthor      = ( Object.prototype.toString.call( json.author ) == '[object Object]' ) ? json.author.name : json.author,
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
let tempAllPages = glob.sync( './'+globs.build+'/components/**/*.html' );
let targetTempFilesName = [];
let targetAllTempFilesName = [];

tempAllPages.map( ( event ) => {
	let filename = event.split( '/' ).pop();
	
	targetAllTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	
	if ( filename.indexOf( 'include-' ) < 0 ) {
		targetTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	}
	
});



let targetFilesNameArrays = [
  targetAllTempFilesName
];
let targetAllWatchFilesName = [].concat(...targetFilesNameArrays);


// String replacement for page templates
class ReplacePlaceholderForFile {
	constructor( options ) {
		this.options = options;
	}
	apply( compiler ) {
		compiler.hooks.done.tap('ReplacePlaceholderForFile', ( stats ) => {
			
			const filepath = this.options.filepath;
			
			// When the Node module is running, this plugin may be executed 
			// at the same time, which will result in incomplete content reading.
			/*
			@Other method:
			
			try {  
				var data = fs.readFileSync('file.html', 'utf8');
				console.log(data);    
			} catch(e) {
				console.log('Error:', e.stack);
			}
			*/
			fs.readFile( filepath, 'utf8', function(err, data ){

				if ( err ) {
					console.log(colors.fg.Red, err, colors.Reset);
				} else {
					
					
					if ( data.length > 0 && data.indexOf( '</html>' ) >= 0 ) {
						data = data.replace(/\@\@\{website_title\}/g, customWebsiteTitle )
									.replace(/\@\@\{website_desc\}/g, customWebsiteDesc )
									.replace(/\@\@\{website_canonical\}/g, customWebsiteCanonical )
									.replace(/\@\@\{website_author\}/g, customWebsiteAuthor )
									.replace(/\@\@\{website_generator\}/g, customWebsiteGenerator )
									.replace(/\@\@\{website_version\}/g, customWebsiteVersion )
									.replace(/\@\@\{website_comment\}/g, customWebsiteComment )
									.replace(/\@\@\{website_hash\}/g, customWebsiteHash );

						fs.writeFile( filepath, data, (err) => {
							if ( err ) {
								console.log(colors.fg.Red, err, colors.Reset);
								return;
							}
							//file written successfully
							console.log(colors.fg.Green, `${filepath} written successfully!`, colors.Reset);

						});		
					}


				}


			}); //end fs.readFile	
			
		

		});
	}
}



/*! 
 *************************************
 *  Main configuration
 *************************************
 */
const webpackConfig = {
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    mode: 'production',
	watch: true,
	node: { fs: 'empty' },
    resolve: {
        extensions: ['.js', '.es6', '.vue', '.jsx' ]
    },
	
	//Exclude react from bundle
//    externals: {
//      'react': 'React',
//		'react-dom': 'ReactDOM'
//    },
	entry: {
		'bundle': './'+globs.build+'/index.js',
		'bundle.min': './'+globs.build+'/index.js',
		'bundle-rtl': './'+globs.build+'/index-rtl.js',
		'bundle-rtl.min': './'+globs.build+'/index-rtl.js',
	},
    output: {
        path: path.resolve(__dirname, './' + globs.dist + '/js' ),
        filename: '[name].js',
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
				filename: '../css/[name].css'
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
		globs.examples + '/*.html',
		
	])
);

// Adds a banner to the top of each generated chunk.
webpackConfig.plugins.push(
    new webpack.BannerPlugin( customWebsiteComment )
);



// Batch processing HTML template files
targetTempFilesName.map( ( event ) => {

	webpackConfig.plugins.push(
		
		new IncludeFileWebpackPlugin({
			directory: '',
			input: `${event[0]}`,
			output: `./${globs.examples}/${event[1]}`,
			processIncludeContents: function(html) {
				return html;
			}
		})
		
	);
});



// String replacement for page templates
targetTempFilesName.map( ( event ) => {
	
	webpackConfig.plugins.push(
		new ReplacePlaceholderForFile({
			filepath: `./${globs.examples}/${event[1]}`
		})
	);

});


// Add .min.css files souce map
webpackConfig.plugins.push(
	new webpack.SourceMapDevToolPlugin({
	  filename: '../css/[name].css.map',
	})
);




/*! 
 *************************************
 *  Hook our plugins to fix webpack dev server is not serving the latest compiled code
 *************************************
 */
const compiler = webpack( webpackConfig );
const app = express();
const instance = webpackDevMiddleware( compiler );
app.use( instance );


//Watch for Files Changes in Node.js
require('log-timestamp');

targetAllWatchFilesName.map( ( event ) => {
	
	let curFile = `${event[0]}`;

	fs.watchFile( curFile, (curr, prev) => {
	    
		console.log(colors.fg.Yellow, `${curFile} file Changed`, colors.Reset);
		
		// After a short delay the configuration is changed and a banner plugin is added
		// to the config
		compiler.apply(

			new CleanWebpackPlugin([
				globs.build + '/**/*.css'
			])

		);


		targetTempFilesName.map( ( event ) => {

			compiler.apply(

				new IncludeFileWebpackPlugin({
					directory: '',
					input: `${event[0]}`,
					output: `./${globs.examples}/${event[1]}`,
					processIncludeContents: function(html) {
						return html;
					}
				}),

				new ReplacePlaceholderForFile({
					filepath: `./${globs.examples}/${event[1]}`
				})

			);



		});

		// Recompile the bundle with the banner plugin:
		instance.invalidate();	
	});
	
});




/*! 
 *************************************
 *  Listen the server
 *************************************
 */

const server = new WebpackDevServer( compiler, {
					contentBase: [
						path.resolve(__dirname, './' )
					],
	                hot: true,
					watchContentBase: true,
	
				});

server.listen( globs.port, "localhost", function (err, result) {
	if (err) {
	    return console.log(colors.fg.Red, err, colors.Reset);
	}


	console.log(colors.fg.Yellow, 'Listening at http://localhost:8080/', colors.Reset);
})


/*! 
 *************************************
 *  Build a table of contents (TOC)
 *************************************
 */
compiler.hooks.done.tap( 'MyPlugin', ( compilation ) => {
	
	setTimeout ( () => {
		['./'+globs.dist+'/css/bundle.css', './'+globs.dist+'/js/bundle.js'].map( ( filepath ) => {

			if ( fs.existsSync( filepath ) ) {

				fs.readFile( filepath, function( err, content ) {

					if ( err ) throw err;

					let curCon  = content.toString(),
						newtext = curCon.match(/<\!\-\-.*?(?:>|\-\-\/>)/gi );


					//is the matched group if found
					if ( newtext && newtext.length > 1 ) {  

						let curToc = '';

						for ( var p = 0; p < newtext.length; p++ ) {

							let curIndex = p + 1,
								newStr   = newtext[ p ].replace( '<!--', '' ).replace( '-->', '' ).replace(/^\s+|\s+$/g, '' );

							if ( p > 0 ) {
								curToc += '    ' + curIndex + '.' + newStr + '\n';
							} else {
								curToc +=  curIndex + '.' + newStr + '\n';
							}

						}

						//Replace a string in a file with nodejs
						var result = curCon.replace(/\$\{\{TOC\}\}/g, curToc );

						fs.writeFile( filepath, result, 'utf8', function (err) {
							
							if ( err ) {
								console.log(colors.fg.Red, err, colors.Reset);
								return;
							}
							//file written successfully	
							console.log(colors.bg.Green, colors.fg.White, `${filepath}'s table of contents generated successfully!`, colors.Reset);

						});


					}


				});			


			}


		});	
	}, 1000 );

	
	

});
									
									
/*! 
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;



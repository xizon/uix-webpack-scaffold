# Uix Webpack Scaffold

[![Travis CI](https://api.travis-ci.org/xizon/uix-webpack-scaffold.svg?branch=master)](https://travis-ci.org/xizon/uix-webpack-scaffold/) 
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.0.5&x2=0)](https://www.npmjs.com/package/uix-webpack-scaffold)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)


Simple demo for scaffold of webpack 4 + react + babel. Supports batch processing of HTML templates, SASS, and JavaScript module files.

By [UIUX Lab](https://uiux.cc)




## Installation And Test

You will need to have [node](https://nodejs.org/) setup on your machine. That will output the built distributables to `./dist/*` and `./examples/*.html`.


**Step 1.** Clone the repo to get all source files including build scripts: 

```sh
$ git clone git://github.com/xizon/uix-webpack-scaffold.git
```

Go to your current file directory

```sh
$ cd /{your_directory}/uix-webpack-scaffold
```


**Step 2.** Before doing all dev stuff make sure you have `Node 10+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install --only=dev --unsafe-perm --production
```


**Step 3.** Run the following code to enter development mode. The converted ES5 files will be created.

```sh
$ npm run build
```

**Step 4.** When you done, please open the browser and enter the following URL to check out.

```sh
http://localhost:8080/examples/
```


### Note:
 
**ERROR: npm update check failed.**

```sh
$ sudo chown -R $USER:$(id -gn $USER) /Users/{username}/.config
```





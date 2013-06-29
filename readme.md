Chrome Extensions Box `v0.1`
===========================
[Русская документация](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md) более полная в данный момент.

Starter kit for creating Google Chrome extensions. Quick start is the main goal.

- internationalization helper
- options page helper 
- page skeletons (background, options, popup pages)
- basic snippets (page communication etc)
- starter icons
- simple javaScript tabs
- extension builder (automation package creation)
- written with no jQuery (but last jQuery 2.x attached) 


Installation
------------

Variants:
 
- Clone repo: `git clone git://github.com/onikienko/chrome-extensions-box.git my-ext-name`
- Download [last zipped version](https://github.com/onikienko/chrome-extensions-box/archive/master.zip)



Usage
-----



### Internationalization ###

Helper file -  `js/helpers/localizer.js`


### Options page ###

Helper file - `js/helpers/quick_options.js`


### Tabs ###

Location: `lib/jsTabs`

Usage: `options.html` 

[Documentation](https://github.com/onikienko/jsTabs/blob/master/readme.ru.md)

[Example](http://sbox.pp.ua/jstabs/demo.html)


### Package builder ###

- check build version (from `manifest.json`)
- files (folders) to ignore
- javaScript minification (if you want)
- reminder
- mark to changelog

Written on **python** 3.3

Install python 3.3+ ([http://python.org/download/](http://python.org/download/)).

Run: 

	build.py

from `build` folder. New build will be create in `build\releases` folder.

By default builder will minify javaScript files from `js` folder with [UglifyJS](http://marijnhaverbeke.nl/uglifyjs) (online). For build without minification run

	build.py -m

or edit `build.json` from builder folder. (See below)

You can set reminder in `build.json`. For example: "off debug", "check TODO" etc. Before make build script will show you message  and will wait your command.

`build.json`:

```javaScript

	{
	    "exclude": [".*", "build"],  // in Unix shell style

	    "reminder": "",    // empty string - without reminder

	    "minify": {			
	        "dirs": ["../js"],  // relative path from builder folder. empty string - without minification
	        "exclude": ["*.min.js"]  
	    },

	    "changelog": {
			// changelog file will be create in build/releases folder
			// 	script will write version number and timestamp to this file	
	        "filename": "changelog.txt", // empty string - without changelog
	        "datetimeformat": "%d.%m.%Y %H:%M" // empty string - without timestamp
	    }
	}

```
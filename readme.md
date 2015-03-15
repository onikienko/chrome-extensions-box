Chrome Extensions Box
=====================
[Русская документация](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md) более полная в данный момент.

Starter kit for creating Google Chrome extensions. Quick start is the main goal.

- internationalization helper
- options page helper 
- page skeletons (background, options, popup pages)
- basic snippets (page communication etc)
- starter icons
- simple javaScript tabs
- extension builder (automation release package creation)
- written with no jQuery (but jQuery 2.x is attached)

Extensions written with Chrome Extensions Box:

- [tabHamster](https://github.com/onikienko/TabHamster)

A simple extension [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo).
Do nothing but demonstrates how `Chrome Extensions Box` works.


Installation
------------

Variants:
 
- Clone repo: `git clone git://github.com/onikienko/chrome-extensions-box.git my-ext-name`
- Download [latest zipped version](https://github.com/onikienko/chrome-extensions-box/archive/master.zip)

Usage
-----

###Start###

1. Edit `manifest.json` file. Do not remove `storage permissions` - Chrome Extensions Box uses this API to save settings ([chrome.storage](https://developer.chrome.com/extensions/storage.html)).
`JSON` does not support comments. Del them.
2. Del `_locales` folder if internationalization is not planned and edit the properties of `manifest.json` `name` and `description`.
Will better to keep the internationalization support. *Chrome Extensions Box* has a helper simplifies the process.
3. Edit `js/storage.js` file specifying the type of storage that will be used. 

Look at [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo). 


###Internationalization###

Helper file -  `js/helpers/localizer.js`

In HTML instead of text place `{{propertyNameFromLocale}}`. See example:

```HTML

	<!DOCTYPE html>
	<html>
	<head>
	    <title>{{extName}}</title>

		<!--Localisation helper first-->
		<script src="js/helpers/localization.js"></script>

		<!--Other scripts-->
		<script src="js/options.js"></script>
	</head>

	<body>
	    <header>
			<strong>{{extDescr}}</strong>
			<!--Also can use in attributes-->
	        <img src="img/ext_icons/48.png" title="{{extName}}">
	    </header>
	</body>
    </html>

```


Content of `_locales/en/message.json` file:

```JSON

	{
	    "extName": {
	        "message": "My extension name"
	    },
	    "extDescr": {
	        "message": "My extension description"
	    }
	}

```


In result will have HTML:

```HTML

	<!DOCTYPE html>
	<html>
	<head>
	    <title>My extension name</title>
		<script src="js/helpers/localization.js"></script>
		<script src="js/options.js"></script>
	</head>

	<body>
	    <header>
	        <strong>My extension description</strong>
	        <img src="img/ext_icons/48.png" title="My extension name">
	    </header>
	</body>
    </html>

```

As you can see every `{{}}` were replaced with relevant messages from `_locales/en/message.json` file.

###Options page###

Helper file - `js/helpers/quick_options.js`


###Tabs###

Location: `lib/jsTabs`

Usage: `options.html` 

[Documentation](https://github.com/onikienko/jsTabs/blob/master/readme.ru.md)

[Example](http://sbox.pp.ua/jstabs/demo.html)


###Package builder###

Make zip package ready to upload to Chrome Web Store.

- check build version (from `manifest.json`)
- files (folders) to ignore
- javaScript minification (optional)
- reminder (optional)
- mark to changelog (optional)

Written with **python** 3.3

Install python 3.3+ ([http://python.org/download/](http://python.org/download/)).

Run: 

	build.py

from `build` folder. New build will be create in `build/releases` folder.

By default builder will minify javaScript files from `js` folder with [UglifyJS](http://marijnhaverbeke.nl/uglifyjs) (online). For build without minification run

	build.py -m

or edit `build.json` from builder folder. (See below)

You can set reminder in `build.json`. For example: "off debug", "check TODO" etc. Before make build script will show you message  and will wait your command.

`build.json`:

```javaScript

	{
	    // in Unix shell style.
	    // Release package will exclude files and folders which starts with '.' and folder(s) with name 'build'
	    "exclude": [".*", "build"],

	    "reminder": "",    // empty string - without reminder

	    "minify": {
	    	// Minify all files from 'js' folder
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

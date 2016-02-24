Chrome Extensions Box
=====================
[Русская документация](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md).

Starter kit for creating Google Chrome extensions. Quick start is the main goal.

- internationalization helper
- options page helper 
- page skeletons (background, options, popup pages)
- basic snippets (page communication etc)
- starter icons
- simple javaScript tabs
- extension builder (automation release package creation)
- written with no jQuery (but jQuery 2.x is attached)

Open source extensions written with Chrome Extensions Box:

- [tabHamster](https://github.com/onikienko/TabHamster)
- [Dev extensions reload](https://github.com/onikienko/dev-extensions-reload)
- [keygenjukebox play button](https://github.com/onikienko/keygenjukebox-play-button)

A simple extension [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo).
Do nothing but demonstrates how *Chrome Extensions Box* works.


Installation
------------

Variants:
 
- Clone repo: `git clone git://github.com/onikienko/chrome-extensions-box.git my-ext-name`
- Download [latest zipped version](https://github.com/onikienko/chrome-extensions-box/archive/master.zip)

Usage
-----

###Start###

1. Edit `manifest.json` file. Do not remove `storage permissions` - *Chrome Extensions Box* uses this API to save settings ([chrome.storage](https://developer.chrome.com/extensions/storage.html)).
`JSON` does not support comments. Del them.
2. Remove `_locales` folder if you don't plan internationalization. Will better to keep the internationalization support. *Chrome Extensions Box* has a helper simplifies the process.
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

As you can see each `{{}}` were replaced with relevant messages from `_locales/en/message.json` file.


###Options page###

Helper file - `js/helpers/quick_options.js`

See [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo) to understand how it works.

It helps quickly build options page. You have to specify default options and storage type in `js/storage.js`.
In `options.html` bind `storage` and `html` with `data-storage` attributes.

Firstly, you have to edit `js/storage.js`. 
Specify `area` (`local` or `sync`) and extension options by default (`storage.default_options`). 

See example:

`js/storage.js`:

```javaScript

	var storage = {
	    area: chrome.storage.sync, // save options to sync storage
	    // default options
	    default_options: {
	        sound_type: 'type3' 
	    }
	}; 

```

`options.html`:

```HTML
	
	// bind SELECT to storage `sound_type` with attr `data-storage`
    <select data-storage="sound_type">
        <option value="type1">1</option>
        <option value="type2">2</option>
        <!-- this select will be selected because value="type3" was specified in default_options -->
        <option value="type3">3</option> 
    </select>

```

In `js/storage.js` specified storage type and default option. 
After extension installation this default option will write to specified storage.
There is SELECT in `options.html` with `data-storage` attribute with *name* of option.
Script `js/helpers/quick_options.js` will analyze HTML, find TAGs with `data-storage` (SELECT in this case), 
find in storage variable with that name (`sound_type`), find `option` tag with `value` attribute 'type3' and select it.

In addition, for this SELECT will created event handler which will write each changes in storage and
show message for the user. (*Option saved*).

For `input type="checkbox"` *value* attribute is ignored. For checked checkbox use 1, for unchecked - 0.

```javaScript

	var storage = {
	    area: chrome.storage.sync, // save options to sync storage
	    // default options
	    default_options: {
	        remember_me: 1,
	        show_hints: 0
	    }
	}; 

```

`options.html`:

```HTML
	
	<!-- after installation this checkbox will checked  -->
	<input type="checkbox" data-storage="remember_me">
		
	<!-- will unchecked -->
	<input type="checkbox" data-storage="show_hints">

```

For `<select multiple>` you have to specify array of string values.

For *text* inputs (like *text*, *password*, *tel*, *email*, *number*) and for `textarea` you have to add a button. 
When user push the button, script will save new value to a storage. The button should have the same `data-storage` as input.

```HTML
	
    <input type="text" data-storage="o_text"/>
    <input type="submit" data-storage="o_text" value="Save"/>

```

After each save operation script will dispatch `optionSaved` event. You can listen it:

```javaScript

    document.addEventListener('optionSaved', function(event) {
        console.log(event.detail);
    });

```

`optionSaved` returns callback with `event.detail` object which contains info about status of saving operation and option which was saved.

- `event.detail.success` true on success or false on error
- `event.detail.val` object with saved option

After helper finishes work with option page it will dispatch `optionsPageReady` event. You can listen it:

```javaScript

    document.addEventListener('optionsPageReady', function() {
        /* Options page is ready. Write your code here */
    });

```

Download and install this demo extension [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo).
See `options.html` and `js/storage.js` files. Also see console print for Option page.

###Tabs###

Location: `lib/jsTabs`

Usage: `options.html` 

[Documentation](https://github.com/onikienko/jsTabs/blob/master/readme.ru.md)

[Example](http://sbox.pp.ua/jstabs/demo.html)


###Package builder###

Make zip package ready to upload to Chrome Market.

- check build version (from `manifest.json`)
- files (folders) to ignore
- javaScript minification (optional)
- reminder (optional)
- mark to changelog (optional)

Written with **python** 3.3

Install python 3.3+ ([http://python.org/download/](http://python.org/download/)).

Run: 

	build.py

from `build` folder. New release package will be create in `build/releases` folder. You can upload this package to Chrome Web Store.

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

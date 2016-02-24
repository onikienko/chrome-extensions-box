Chrome Extensions Box
=====================

Стартовый набор для создания расширений для браузера Google Chrome. Это именно набор (каркас, скелет, bootstrap), не фреймворк. Основная задача - быстрое развертывание расширения.
 
Что внутри:

- хелпер для интернационализации
- хелпер для быстрого создания страницы настроек
- каркас страницы настроек (options), background, popup
- иконки-заглушки всех типоразмеров
- немного сниппетов
- простые javaScript табы (используются в каркасе страницы настроек)
- сборщик расширений (упаковка расширений для публикации в Магазине Chrome)
- написано на чистом javaScript без jQuery и других библиотек (jQuery 2.x включен в сборку)


Расширения (open source) использующие Chrome Extensions Box:

- [tabHamster](https://github.com/onikienko/TabHamster)
- [Dev extensions reload](https://github.com/onikienko/dev-extensions-reload)
- [keygenjukebox play button](https://github.com/onikienko/keygenjukebox-play-button)

Простое расширение, демонстрирующее возможности данного набора - [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo). 


1. [Установка](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#1-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)
2. [Использование](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#2-%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5) 
 1. [Старт](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#21-%D0%A1%D1%82%D0%B0%D1%80%D1%82)
 2. [Интернационализация](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#22-%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F)
 3. [Страница настроек](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#23-%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BA-options-page)
 4. [Табы](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#24-%D0%A2%D0%B0%D0%B1%D1%8B)
 5. [Сборщик](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#25-%D0%A1%D0%B1%D0%BE%D1%80%D1%89%D0%B8%D0%BA)
3. [Структура проекта](https://github.com/onikienko/chrome-extensions-box/blob/master/readme.ru.md#3-%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0)


1. Установка
------------
Варианты установки:
 
- Клонировать репозиторий: `git clone git://github.com/onikienko/chrome-extensions-box.git my-ext-name`
- Скачать [архив с последней версией](https://github.com/onikienko/chrome-extensions-box/archive/master.zip)

	
	
2. Использование
----------------

### 2.1 Старт ###

1. Переименуйте папку проекта (имя создаваемого расширения подойдет, но без кириллицы).
2. Отредактируйте файл `manifest.json` удалив все лишнее. В `permissions` оставьте разрешение `storage` - для хранения настроек используется это API ([chrome.storage](https://developer.chrome.com/extensions/storage.html)).  Комментарии также нужно удалить, `JSON` не поддерживает комментарии.
3. Если интернационализация не планируется - удалите папку `_locales` и отредактируйте в `manifest.json` свойства `name` и `description` (по умолчанию они заполнены с учетом локализации). Лучше, все таки, оставить поддержку интернационализации. В наборе есть хелпер упрощающий этот процесс.
4. Отредактируйте файл `js/storage.js` указав тип хранилища, которое будет использоваться а также все настройки расширения по умолчанию (подробности далее) 

Использование хелпера интернационализации и страницы настроек можно посмотреть в примере расширения [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo). Файл `options.html`.


### 2.2 Интернационализация ###

Файл хелпера - `js/helpers/localizer.js`. 

В своем HTML, вместо каждой строки, которая должна быть локализована поместите строку такого вида:

`{{имяСвойстваИзЛокали}}`

Использование:

```HTML

	<!DOCTYPE html>
	<html>
	<head>
		<!--В двойных фигурных скобках - имя свойства содержащее нужный перевод из json файла с локализацией->
	    <title>{{extName}}</title>

		<!--Сначала подключаем локализатор-->
		<script src="js/helpers/localization.js"></script>

		<!--Остальные скрипты-->
		<script src="js/options.js"></script>
	</head>

	<body>
	    <header>

			<strong>{{extDescr}}</strong>
			<!--Можно использовать в атрибутах-->
	        <img src="img/ext_icons/48.png" title="{{extName}}">
	        
	    </header>	
	</body>
	</html>

```

Для такого `_locales/ru/message.json`

```JSON

	{
	    "extName": {
	        "message": "Мое расширение"
	    },
	    "extDescr": {
	        "message": "Здесь будет описание моего расширения"
	    }
	}

```

Будет такой HTML на выходе:

```HTML

	<!DOCTYPE html>
	<html>
	<head>
	    <title>Мое расширение</title>
		<script src="js/helpers/localization.js"></script>
		<script src="js/options.js"></script>
	</head>

	<body>
	    <header>
	        <strong>Здесь будет описание моего расширения</strong>
	        <img src="img/ext_icons/48.png" title="Мое расширение">
	    </header>
	</body>
    </html>

```

Если в `message.json` не найдется запрашиваемого свойства, или значение равно пустой строке, то вернется исходная строка.

Такой подход работает для HTML. В скриптах можно использовать функцию `chrome.i18n.getMessage(messageName, substitutions)`.  Можно прочитать [тут](https://developer.chrome.com/extensions/i18n.html) и о `substitutions` - [здесь](https://developer.chrome.com/extensions/i18n-messages.html)


### 2.3 Страница настроек (Options page) ###

Файл хелпера - `js/helpers/quick_options.js`.

Поможет быстро создать страницу настроек расширения. Необходимо лишь указать настройки по умолчанию и тип хранилища. (В  `js/storage.js`). 
В `options.html` связать `storage` и `html` с помощью атрибутов `data-storage` и `value`.

Первое, что нужно сделать - отредактировать файл `js/storage.js`. 
Указать `area` (`local` или `sync`), а также настройки расширения по умолчанию (`storage.default_options`). 

Сразу пример, для ясности:

`js/storage.js`:

```javaScript

	var storage = {
	    area: chrome.storage.sync,
	    default_options: {
	        sound_type: 'type3' 
	    }
	}; 

```

`options.html`:

```HTML
	
	// связывание SELECT с storage `sound_type` через атрибут `data-storage`
    <select data-storage="sound_type">
        <option value="type1">1</option>
        <option value="2">type2</option>
        <!--будет выбран этот элемент списка, т.к. value="type3" указан в default_options-->
        <option value="type3">3</option> 
    </select>

```

В `js/storage.js` указан тип хранилища и дефолтная опция, которая после установки расширения будет записана в хранилище. 
В `options.html` есть `select` c атрибутом `data-storage`, в котором указано имя "настройки". 
Скрипт `js/helpers/quick_options.js` проанализирует все `option`, найдет `value` соответствующее записанному в хранилище и "выберет" его, установив атрибут `selected`. 
Таким образом, в данном примере, будет выбран последний пункт.

Также, к данному `select` будет добавлен обработчик события, который будет записывать все изменения в хранилище. 
Если пользователь выберет второй пункт, то в хранилище будет записано: `sound_type: 'type3'`

Скрипт обрабатывает все элементы типа `input`, `textarea`, `select` на странице. 
Если у элемента указан `data-storage`, в хранилище выполняется поиск свойства с таким именем и состояние элемента выставляется в соответствии со значениями.  

Для `input type="checkbox"` атрибут `value` игнорируется. Для отмеченного чекбокса используйте значени 1, для отключенного - 0 (`integer`)

Для `<select multiple>` нужно указывать массив строковых значений.

Для  "текстовых" `input` (типа *text*, *password*, *tel*, *email*, *number*) и для `textarea` необходимо добавлять кнопку, при нажатии на которую скрипт запишет содержимое этих полей в хранилище. 
У кнопки должен быть такой же `data-storage`, как и у текстового поля.

```HTML
	
    <input type="text" data-storage="o_text"/>
    <input type="submit" data-storage="o_text" value="Save"/>

```

Скрипт автоматически записывает все изменения опций, которые вносит пользователь на странице насроек, в хранилище (тип которого указан в файле `js/storage.js` в свойстве `storage.area`). 
Также выводит сообщение для пользователя об успешном (или нет) сохранении настроек.

После каждого сохранения изменений настроек стреляет событие `optionSaved`, которое можно слушать так:

```javaScript

    document.addEventListener('optionSaved', function(event) {
        console.log(event.detail);
    });

```

`event.detail` содержит информацию о статусе сохранения и о сохраненной опции.

- `event.detail.success` true on success or false on error
- `event.detail.val` объект с сохраненной опцией

После того, как хэлпер закончит работу над страницей опций, он отправит событие готовности страницы `optionsPageReady`,
которое можно слушать следующим образом:

```javaScript

    document.addEventListener('optionsPageReady', function() {
        /* Options page is ready. Write your code here */
    });

```

В демо расширении [Chrome Extensions Box #DEMO](https://github.com/onikienko/chrome-extensions-box-Demo) можно посмотреть использование всех типов элементов. 
См. файлы `options.html` и `js/storage.js`.

`quick_options.js` можно точно так же использовать для страницы `popup.html`.


### 2.4 Табы ###

Расположены - `lib/jsTabs`

Используются в шаблоне страницы опций `options.html`. Не требуют jQuery.

[Документация](https://github.com/onikienko/jsTabs/blob/master/readme.ru.md)

[Пример](http://sbox.pp.ua/jstabs/demo.html)


### 2.5 Сборщик ###

**Подготавливает и упаковывает файлы расширения в `zip` для публикации в Chrome Store**

Что делает:

- проверяет существования билда с такой версией (читает из `manifest.json`)
- папки\файлы для исключения из сборки
- минификация\обфускация javaScript (если нужна)
- установка напоминания перед сборкой
- отметка в changelog

Сборщик написан на **python** и для его работы требуется версия 3.3 (на других не тестировался, но более новые должны подойти).

Установите python 3.3 ([http://python.org/download/](http://python.org/download/)). Для удобства можно включить `Add python.exe to Path` (под Windows), чтоб не указывать путь к `python` при запуске скрипта.

Перейдите в папку `build` и запустите сборщик: 

	build.py

В папке `build` будет создана подпапка `releases`, куда и будут собираться все создаваемые версии расширения. Имя каждого архива с билдом - номер версии расширения (сборщик читает версию из `manifest.json`)

По умолчанию, сборщик минифицирует все javaScript файлы из папки `js` с помощью [UglifyJS](http://marijnhaverbeke.nl/uglifyjs) (онлайн). Для сборки без минификации запустите сборщик с параметром `-m`:

	build.py -m

или отредактируйте `build.json` из папки сборщика, оставив пустой массив для `minify.dirs` (удобно использовать, если минификация не планируется вообще).

После создания билда сборщик дописывает в начало файла чейнджлога (создает его, если еще не создан) номер версии и штамп времени. Если эта функция не интересна - оставьте пустую строку в `changelog.filename` в `build.json`.

`reminder` можно использовать для установки напоминаний перед сборкой. Например, отключить debug вывод, проверить TODO и тп. Сборщик выведет это напоминание перед созданием архива и будет ожидать команды для продолжения.

Настройки доступные в `build.json`:

```javaScript

	{
	    "exclude": [".*", "build"],  //шаблон имен, которые нужно исключить (Unix shell style)

	    "reminder": "",    //если пустая строка - без напоминания

	    "minify": {			
	        "dirs": ["../js"],  //путь относительно папки сборщика. если пустой массив - без минификации
	        "exclude": ["*.min.js"]  //шаблон имен, которые нужно исключить при минификации
	    },

	    "changelog": {
			//будет создан (если не существует) в папке build\releases 
			//с пустой строкой - без отметки в чейнджлоге
	        "filename": "changelog.txt",
	        "datetimeformat": "%d.%m.%Y %H:%M" //пустая строка - без временной метки
	    }
	}

```

**В пути до папки `build` не должно быть кириллицы**



3. Структура проекта
--------------------

	[_locales]
		[en]
			message.json
		[ru]	
			message.json

	[build]	// в этой папке находится сборщик расширения, а также будут храниться все собранные билды
		build.json	// конфигурация сборщика расширения
		build.py	// сборщик расширения

	[css]
		content_script.css
		options.css
		popup.css

	[img]
		[ext_icons]	// иконки-заглушки. все типоразмеры
			16.png
			19.png
			38.png
			48.png
			128.png

	[js]
		[helpers]
			localizer.js		// хелпер интернационализации
			quick_options.js	// быстрое создание страницы настроек расширения
		background.js
		storage.js	// 	дефолтные настройки расширения, а также тип используемого хранилища (sync или local)
		content_script.js
		options.js
		popup.js

	[lib]
		[jsTabs]	// простые табы https://github.com/onikienko/jsTabs/
			tabs.css
			tabs.js
		jquery.min.js	// последняя стабильная версия jQuery (ветка 2.X)
	options.html
	popup.html
	manifest.json

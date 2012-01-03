# Coré - An open-source, web-based [ISC](http://isc.ro) client

According to their own website, the [Internet Scrabble Club](http://isc.ro) is "the best place to play live online scrabble," and they're not exaggerating. Complete with timed games, ratings, different dictionaries, languages, and challenge rules, and serious competition, the ISC offers a purists' experience to everyone from beginners to, well, purists.

The ISC's own default Java-based client, WordBiz, is effective and offers a nerdtastic command-line interface coupled with the crucial ability for the user to type directly onto the board instead of dragging-and-dropping tiles to form words. At times, play can be sublime. At others, the client shows its age and clumsy interactions leave users struggling to successfuly type into dialog boxes, accidentally playing blanks, and generally wasting precious in-match-seconds due to these and other gripes. Here's a tiny picture of it.

![WordBiz](http://freegamedownloads.tk/th/wordbiz-1.7-1318547374.jpg)

**Coré** is an attempt to *be the change* -- to build a user-friendly client for the ISC that not only provides the same level of functionality as the current version, but improves upon the usability, look, and feel with the web technologies we all known and love: HTML, CSS, and JavaScript.

Work on this project began in late December of 2011, and at the moment, you couldn't even try to play a game on it, much less succeed. We're still just beginning work on implementing feature parity with WordBiz, and we're happy to have any and all hands on deck.

## Technology

* HTML, CSS, JS
* [Backbone](http://documentcloud.github.com/backbone/) & [Underscore](http://documentcloud.github.com/underscore/)
* [jQuery](http://jquery.com)
* [RequireJS](http://requirejs.org)
* [node.js](http://nodejs.org) & [npm](http://npmjs.org)
* [socket.io](http://socket.io)

## Developing

Before you get started, you'll need to have node.js and npm set up. Some of you did this a long time, ago, you can skip ahead to the bullet points. For the rest of you, luckily, it's the node 0.6+ era, so not only does `npm` ship as part of node, and there are literally [binary installer packages](http://nodejs.org/#download)
available for Windows, Mac, and Linux, so you can get set up straight away. If you're on Mac, you'll also probably want [xcode](http://developer.apple.com/xcode/). You can also install the [old fashioned way](https://github.com/joyent/node/wiki/Installation) or use [nave](https://github.com/isaacs/nave).

Phew.

1. Clone or fork this repository:<br/>`git clone https://github.com/bocoup/Cor-.git`
2. Set up the server:<br/>`cd Cor- && npm install`
3. Set up the pcap module (*Don't do this on Windows*):<br/>`npm rebuild`

## Running the client

Follow the steps above in **Developing**, then

1. Run the server:<br/>`cd Cor-/server && node server.js`
2. Go to the client directory:<br/>`cd ../client`
3. Run the HTTP server of your choice, for instance
    * `http-server -p 8000` - [node http-server](http://search.npmjs.org/#/http-server)
    * `python -m SimpleHTTPServer` - [python SimpleHTTPServer](http://effbot.org/librarybook/simplehttpserver.htm)
4. Go to [http://localhost:8000/](http://localhost:8000) in a web browser

## Errata

This should all work, but this is still very much a work in progress. If you have any questions, please try to find me (ajpiano) in #bocoup-cor on [freenode](http://irc.freenode.net). 

✨🍄 toad_modules 🍄✨
=======================

Scans a directory recursively for node_modules directories and reports how much
disk space each one is using.

![screencast of usage](https://github.com/hnrysmth/toad_modules/raw/master/demo.gif)

Installation
------------

```
npm install -g toad_modules
```

Usage
-----

```
toad_modules ~/Documents
```

I'm Feeling Lucky
-----------------

This little one-liner will quietly delete every node_modules directory anywhere
within your current working directory. It's a dangerous, destructive operation,
so please consult your horoscope before copypasting this into your terminal.

```
toad_modules | grep -v TOTAL | awk '{ print $2; }' | xargs rm -r
```

It won't ask you if you're sure first. It will begin deleting almost immediately.
But you seem like you know what you're doing, so go for it 👍

Contributing
------------

Contributors are subject to version 1.4 of the [Contributor Covenant].

License
-------

toad_modules is released under the [MIT License].

[Contributor Covenant]: https://www.contributor-covenant.org/version/1/4/code-of-conduct.html
[MIT License]: http://www.opensource.org/licenses/MIT

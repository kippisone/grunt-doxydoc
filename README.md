# grunt-doxydoc

> Create sourcecode documentation from Javascript and LESS/CSS files

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-doxydoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-doxydoc');
```

## The "doxydoc" task

### Overview
In your project's Gruntfile, add a section named `doxydoc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  doxydoc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.template
Type: `String`

Sets a custom template path. Uses the lagoon tempalte as default

### Usage Examples


```js
grunt.initConfig({
  doxydoc: {
    dist: {
        options: {

        },
        src: ['src/**/*.js', 'less/**/*.less'],
        dest: 'docs/index.html'
    }
});
```


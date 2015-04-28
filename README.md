# ng-while-holding

ng-while-holding is an AngularJS directive to evaluate an expression when an element is clicked and holded.

## Installation

Via [npm](http://www.npmjs.com/):
```sh
npm install ng-while-holding --save
```

Via [Bower](http://bower.io/):
```sh
bower install ng-while-holding
```


## Usage

Add the `ngWhileHolding` module as a dependency to your AngularJS app:
```javascript
var app = angular.module('myApp', ['ngWhileHolding']);
```

Add the directive `while-holding` to an HTML element:
```html
<button while-holding="doFancyThings()">
    Click and hold me
</button>
```

Use the `whilde-holding-debounce` attribute if you want to change the tick length. Default: 200ms
```html
<button while-holding="doFancyThings()" while-holding-debounce="50">
    I do it faster
</button>
```
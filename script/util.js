//// The main utility code to support
//// or extend the basic functionality of Object
//// would go here. 
(function () {
    "use strict";
    Object.defineProperty(Array.prototype, "sortBy", {
        enumerable: false,
        writable: true,
        value: function () {
            return this.sort(comparatro.apply(this, arguments));
        }
    });

    function comparatro(field, reverse, primer) {
        primer = function (a) { return a.toUpperCase() };
        field = arguments[0];
        reverse = arguments[1];

        var key = primer ?
               function (x) { return primer(x[field]) } :
               function (x) { return x[field] };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})();
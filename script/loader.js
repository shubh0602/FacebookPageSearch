var fbSearch = fbSearch || {};
(function (fbSearch) {
    "use strict";
    var fbSearch = fbSearch || {};

    var loader = function () {
        this.$el = document.getElementsByTagName("html")[0];
    };

    loader.prototype.show = function () {
        this.$el.classList.add("loading");
    };

    loader.prototype.hide = function () {
        this.$el.classList.remove("loading");
    };

    fbSearch.Loader = new loader();

    return fbSearch;

})(fbSearch);

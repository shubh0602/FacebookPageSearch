//// The main utility code to support
//// or extend the basic functionality of Object
//// would go here. 
var fbSearch = fbSearch || {};
(function (fbSearch) {
    "use strict";
    Object.defineProperty(Array.prototype, "sortBy", {
        enumerable: false,
        writable: true,
        value: function () {
            return this.sort(comparatro.apply(this, arguments));
        }
    });

    function comparatro(field, reverse, primer) {
        primer = function (a) {
            return a.toUpperCase()
        };
        field = arguments[0];
        reverse = arguments[1];

        var key = primer ?
            function (x) {
                return primer(x[field])
            } :
            function (x) {
                return x[field]
            };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    };

    // Callback to handle when request fails
    function transferFailed(evt) {
        fbSearch.Loader.hide();
        // do something when request fails
    };

    // Callback to handle when request is cancelled by user
    function transferCanceled(evt) {
        fbSearch.Loader.hide();
        // do something when request fails
    };

    // custom ajax call to trigger Ajax call
    function ajax(url, callback, type, async) {
        async = async || true;
        type = type || "GET";

        var xmlhttp;
        if (window.XMLHttpRequest) {
            // IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // IE7-
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.addEventListener("error", transferFailed);
        xmlhttp.addEventListener("abort", transferCanceled);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {

                if (xmlhttp.status == 200) {
                    if (xmlhttp.responseText) {
                        callback(JSON.parse(xmlhttp.responseText));
                    } else {
                        console.log('no records found');
                    }
                } else {
                    alert('Error occured. Please try again')
                }
            }
        };
        /*xmlhttp.onerror = function (err) {
            debugger;
            console.log(err.target.status);
            fbSearch.Loader.hide();
        };*/
        xmlhttp.open(type, url, async);
        xmlhttp.send();
    };
    
    fbSearch.ajaxRequest = ajax;
    
})(fbSearch);

//Created by Shiyang Fei on 6/12/2015
(function (ng) {
    'use strict';

    var app = ng.module('ngLoadScript', []);

    app.directive('script', function() {
        return {
            restrict: 'E',
            scope: false,
            link: function(scope, elem, attr) {
                if (attr.type=='text/javascript-lazy') {
                    var code = elem.text();
                    var f = new Function(code);
                    f();
                }
            }
        };
    });
}(angular));

function loadJsFile(filename, filetype) {
    if (filetype == "js") {
        // if filename is a external JavaScript file
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") {
        //if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}
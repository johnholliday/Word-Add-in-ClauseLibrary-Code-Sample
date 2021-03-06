﻿// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.  
// See full license at the bottom of this file.
(function (angular) {
    'use strict';

    var app = angular.module('ui.removeClass', []);
    app.controller("removeClassController", function ($scope) {
        console.log("removeClasst controller");

    }).directive("removeClass", [function () {
        return {
            restrict: "A",
            link: function ($scope, $element, attrs) {
                if (attrs && attrs.hasOwnProperty('removeClass')) {
                    var rawObject = attrs['removeClass'];
                    var cleanObject = {};
                    // at this point a valid value for the remove-class attribute
                    // will likely be a malformed object literal as a string:
                    // "{'foo': 1}", rather than '{"foo": 1}'
                    try {
                        cleanObject = JSON.parse(rawObject);
                    } catch (error) {
                        
                        if (rawObject.indexOf("{") > -1 && rawObject.indexOf("}") > -1) {
                            var keyVals = rawObject.replace("{", "").replace("}", "").split(",");
                            for (var i = 0; i < keyVals.length; i++) {
                                var pair = keyVals[i];
                                if (!keyVals) continue;
                                var values = pair.split(":");
                                if (!values) continue;
                                var key = values[0].trim();
                                // if the key has spaces, make sure it has " ' " single quotes; otherwise, if it doesn't have spaces
                                // and has single quotes, remove the single quotes.
                                key = key.indexOf(' ') > -1 && key.indexOf("'") < 0 ? ["'", key, "'"].join('') : key.replace(/'/g, '');
                                var value = values[1].trim();
                                cleanObject[key] = value;
                            }
                        } else {
                            console.error('RemoveClass directive: You must pass in an object literal {key : value, ...}');
                        }
                    }

                    // ...moving right along...
                    for (var className in cleanObject) {
                        var condition = $scope.$eval(cleanObject[className]);
                        if (condition) {
                            $element.removeClass(className);
                        }
                    }
                }
            }
        };
    }]);

})(angular);

// ClauseLibrary, https://github.com/OfficeDev/clauselibrary 
//   
// Copyright 2015(c) Microsoft Corporation 
//   
// All rights reserved. 
//   
// MIT License: 
//   
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
// associated documentation files (the "Software"), to deal in the Software without restriction, including 
// without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the 
// following conditions: 
//   
// The above copyright notice and this permission notice shall be included in all copies or substantial 
// portions of the Software. 
//   
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT 
// SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
// USE OR OTHER DEALINGS IN THE SOFTWARE. 
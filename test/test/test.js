"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main");
var router = new main_1.default({
    routeSet: [
        'list',
        ['about', function (route) {
                console.log(route);
            }],
        [['share', 'video'], [function () {
                    console.log(6666);
                }, function () {
                    console.log(6666);
                }]]
    ]
});
router.start();
window['router'] = router;
// string
// [string]
// [string, event]
// [[string, string], [event, event]]

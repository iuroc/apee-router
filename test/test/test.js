"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main");
var router = new main_1.default();
router.setDefaultRoute('list');
router.set(['home', 'list'], function (route) {
    console.log(route);
});
router.start();
window['router'] = router;

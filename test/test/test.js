"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main");
var router = new main_1.default({
    // default: 'list'
    default: ['about', [function () { }, function () { }, function () { }]]
});
// router.setDefaultRoute('list')
router.set(['list', 'home']);
// router.setDefaultRoute('list')
router.start();
window['router'] = router;

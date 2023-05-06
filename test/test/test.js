"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main");
var router = new main_1.default();
router.set(['home', 'list', 'about', 'video', 'share']);
router.start();
window['router'] = router;
window['ApeeRouter'] = main_1.default;

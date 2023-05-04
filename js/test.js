"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apee_router_1 = require("./apee-router");
var apeeRouter = new apee_router_1.default({
    routes: ['home', 'about'],
    default: 'home'
});
apeeRouter.set(['home', 'about']);
apeeRouter.set('home');
apeeRouter.set(['list', 'home'], function (route) {
    console.log(route.dom);
});
apeeRouter.start();
console.log(apeeRouter);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apee_router_1 = require("./apee-router");
var apeeRouter = new apee_router_1.default();
apeeRouter.set(['about']);
apeeRouter.start();
console.log(apeeRouter);

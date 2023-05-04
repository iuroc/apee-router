import ApeeRouter from './apee-router'
const apeeRouter = new ApeeRouter({
    routes: ['home', 'about'],
})
apeeRouter.start()
console.log(apeeRouter)
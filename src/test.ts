import ApeeRouter from './apee-router'
const apeeRouter = new ApeeRouter({
    routes: ['home', 'about'],
    default: 'home'
})
apeeRouter.set(['home', 'about'])
apeeRouter.set('home')
apeeRouter.set(['list', 'home'], (route) => {
    console.log(route.dom)
})
apeeRouter.start()
console.log(apeeRouter)
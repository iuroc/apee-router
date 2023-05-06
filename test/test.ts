import ApeeRouter from '../src/main'

const router = new ApeeRouter({
    default: 'main',
    routeSet: []
})
router.set(['home', 'list', 'about', 'video', 'share'])
router.set('home', [(route) => { }, (route) => { }])
router.start()

window['router'] = router
window['ApeeRouter'] = ApeeRouter
import ApeeRouter from '../src/main'

const router = new ApeeRouter()
router.setDefaultRoute('list')
router.set(['home', 'list'], (route) => {
    console.log(route)
})
router.start()
window['router'] = router
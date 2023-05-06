import ApeeRouter from '../src/main'

const router = new ApeeRouter({
    routeSet: [
        'list',
        ['about', (route) => {
            console.log(route)
        }],
        [['share', 'video'], [() => {
            console.log(6666)
        }, () => {
            console.log(6666)
        }]]
    ]
})
router.start()
window['router'] = router
// string
// [string]
// [string, event]
// [[string, string], [event, event]]
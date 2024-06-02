import {Navigate} from 'react-router-dom'
import Home from '@/pages/Home'
import ListenRandom from '@/pages/ListenRandom'
import Mine from '@/pages/Mine'


// 全局路由
export const globalRouters = [
    {
        // 如果URL没有"#路由"，跳转Home页面
        path: '/',
        element: <Navigate to="/home"/>,
    },
    {
        path: '/home',
        element: <Home/>,

    },
    {
        path: '/listen',
        element: <ListenRandom/>,
    },
    {
        path: '/mine',
        element: <Mine/>,
    },
    {
        // 未匹配，跳转Login页面
        path: '*',
        element: <Navigate to="/home"/>,
    },
]

// 路由守卫
// export function PrivateRoute(props) {
//     // 判断localStorage是否有登录用户信息，如果没有则跳转登录页
//     return window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) ? (
//         props.children
//     ) : (
//         <Navigate to="/login"/>
//     )
// }
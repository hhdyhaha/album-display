// import {Button} from 'antd';
// import './App.css'
// import {getAlbumDataApi} from "@/api";
// import { Layout } from "antd";
//
// function getAlbumData() {
//     const params = {
//         singermid: '000CK5xN3yZDJt',
//         limit: 52
//     }
//     getAlbumDataApi(params).then(res => {
//         console.log(res)
//     })
// }
//
// function App() {
//     return (
//         <>
//             <div className='w-full h-1/2 bg-red-200'>
//                 haha
//             </div>
//         </>
//     )
// }
//
// export default App
import type {FC} from 'react'
import {Badge, TabBar} from 'antd-mobile'
import {
    Route,
    Routes,
    useNavigate,
    useLocation,
    MemoryRouter as Router
} from 'react-router-dom'
import {globalRouters} from '@/router'
import {
    AppOutline,
    UserOutline,
    FingerdownOutline
} from 'antd-mobile-icons'

const Bottom: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {pathname} = location

    const setRouteActive = (value: string) => {
        navigate(value)
    }

    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <AppOutline/>,
            badge: Badge.dot,
        },
        {
            key: '/listen',
            title: '听什么',
            icon: <FingerdownOutline/>,
            badge: '5',
        },
        {
            key: '/mine',
            title: '我的',
            icon: <UserOutline/>,
        },
    ]

    return (
        <TabBar safeArea className="w-full" activeKey={pathname} onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
        </TabBar>
    )
}

function App() {
    return (
        <div className="w-full h-full flex flex-col">
            <Router>
                <header className="w-full h-20 bg-amber-50 flex items-center justify-center">
                    <div>
                        今天来听歌
                    </div>
                </header>
                <main className="flex-grow">
                    <Routes>
                        {Array.isArray(globalRouters) ? // 确认globalRouters是数组才执行映射
                            globalRouters.map((route) => (
                                <Route key={route.path} path={route.path} element={route.element}/>
                            )) : null}
                    </Routes>
                </main>
                <footer className="w-full h-20 text-center flex items-center justify-center p-0">
                    <Bottom/>
                </footer>
            </Router>
        </div>
    )
}


export default App;

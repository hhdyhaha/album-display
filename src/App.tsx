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
            key: '/vae',
            title: 'Vae+',
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

function Header() {
    const location = useLocation()
    const {pathname} = location
    const getTitle = (pathname:string) => {
        switch (pathname) {
            case '/home':
                return '今天来听音乐'
            case '/listen':
                return '听点儿什么'
            case '/mine':
                return '我的'
            default:
                return '今天来听音乐'
        }
    }
    return (
        <header className="w-full h-20 bg-amber-50 flex items-center justify-center">
            <div>
                {getTitle(pathname)}
            </div>
        </header>
    )
}

function App() {
    return (
        <div className="w-full h-full flex flex-col">
            <Router>
                <Header/>
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

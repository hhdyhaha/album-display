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
import React from 'react';

const App: React.FC = () => (
    <>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <header className="w-full h-20 bg-amber-50 flex items-center justify-center">
                    <div>
                        今天来听歌
                    </div>
                </header>
                <main className="w-full flex-grow  bg-red-200 flex items-center justify-center">
                    <p>应该是专辑展示内容吧</p>
                </main>
                <footer className="w-full h-20 text-center flex items-center justify-center">
                    <div>
                        这是一个底部
                    </div>
                </footer>
            </div>
    </>

);

export default App;

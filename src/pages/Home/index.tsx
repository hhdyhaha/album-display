import React, { useEffect, useState } from 'react';
import {Space, Swiper, Image, Toast} from 'antd-mobile'
import {getAlbumDataApi, getImageUrlApi} from "@/api";
import {useImmer} from 'use-immer'

function ImageData() {
    const [albumlist, setAlbumlist] = useImmer([])
    const [albumlistTotal, setAlbumlistTotal] = useImmer(0)
    // 使用useEffect来处理副作用，如数据获取
    useEffect(() => {
        getAlbumData();
    }, []); // 空依赖数组意味着这个effect只在组件挂载后运行一次
    // 获取专辑数据
    async function getAlbumData() {
        const params = {
            singermid: '000CK5xN3yZDJt',
            limit: 52
        }
        await getAlbumDataApi(params).then(res => {
            if (res.status !== 200) {
                const data = res.data.response.singer.data
                // 专辑列表
                setAlbumlist(data.albumlist.map((item: any) =>
                    <div key={item.albumMid}>
                        const pmid = item.pmid
                        getImageUrl(pmid)
                    </div>
                ))
                // 专辑总数
                setAlbumlistTotal(data.total)
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '获取数据失败',
                    position: 'center'
                })

            }
        })
    }

    // 获取专辑图片
    async function getImageUrl(id:string) {
        const params = {
            id
        }
        await getImageUrlApi(params).then(res => {
            console.log('res',res)
            // if (res.status !== 200) {
            //     const data = res.data.response.data
            //     console.log(data)
            // } else {
            //     Toast.show({
            //         icon: 'fail',
            //         content: '获取数据失败',
            //         position: 'center'
            //     })
            // }
        })
    }


}

const demoSrc = "https://puui.qpic.cn/vpic_cover/h3345zrkd0f/h3345zrkd0f_hz.jpg/1280"

function HomePage() {
    return (
        <div className="w-full h-full">
            <main className="w-full h-full flex-grow flex items-center justify-center">
                <Space className="w-full" direction='vertical' block>
                    <Swiper
                        style={{'--height': '50dvh'}}
                        slideSize={60}
                        trackOffset={20}
                        stuckAtBoundary={false}
                        total={20}
                        indicator={false}
                        defaultIndex={2}
                        autoplay={true}
                    >
                        {index => (
                            <Swiper.Item key={index}>
                                <div
                                    className="h-full bg-red-200 flex items-center justify-center m-1"
                                >
                                    <Image
                                        src={demoSrc}
                                        width={64}
                                        height={64}
                                        fit='cover'
                                        style={{borderRadius: 32}}
                                    />
                                </div>
                            </Swiper.Item>
                        )}
                    </Swiper>
                </Space>
            </main>
        </div>
    );
}

export default HomePage;
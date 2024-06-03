import React, {useEffect, useState} from 'react';
import {Space, Swiper, Image, Toast} from 'antd-mobile'
import {getAlbumDataApi, getImageUrlApi} from "@/api";


function ImageData() {
    const [albumlist, updateAlbumlist] = useState([])
    const [albumlistTotal, setAlbumlistTotal] = useState(0)
    // 使用useEffect来处理副作用，如数据获取
    useEffect(() => {
        getAlbumData();
    }, []); // 空依赖数组意味着这个effect只在组件挂载后运行一次
    // 获取专辑数据
    async function getAlbumData() {
        const params = {
            singermid: '000CK5xN3yZDJt',
            limit: 30
        }
        await getAlbumDataApi(params).then(res => {
            if (res.status === 200) {
                const data = res.data.response.singer.data
                // 专辑总数
                setAlbumlistTotal(data.total)
                // 专辑列表
                data.albumList.map(async (item) => {
                        const pmid = item.pmid
                        const imageUrl = await getImageUrl(pmid)
                        console.log('imageUrl', imageUrl)
                        // 更新专辑列表状态
                        updateAlbumlist(prev => [...prev, {...item, imageUrl}])
                    }
                )
                console.log('albumlist', albumlist)

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
    async function getImageUrl(id: string) {
        const params = {
            id
        }
        const res = await getImageUrlApi(params)
        if (res.status === 200) {
            const data = res.data.response.data
            const imageUrl = data.imageUrl
            // console.log('imageUrl',imageUrl)
            return imageUrl
        } else {
            Toast.show({
                icon: 'fail',
                content: '获取数据失败',
                position: 'center'
            })
        }


    }

    return (
        <div>
            {albumlist.map((item, index) => (
                <Image
                    key={index}
                    src={item.imageUrl}
                    width={64}
                    height={64}
                    fit='cover'
                    style={{borderRadius: 32}}
                />
            ))}
        </div>
    )
}


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
                                    <ImageData/>
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
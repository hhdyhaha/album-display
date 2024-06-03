import { useEffect, useState } from 'react';
import {Space, Swiper, Image, Toast } from 'antd-mobile';
import { getAlbumDataApi, getImageUrlApi } from "@/api";

function ImageData({ album }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (album.pmid) {
            fetchImageUrl(album.pmid);
        }
    }, [album]);

    const fetchImageUrl = async (pmid:string) => {
        const params = { id: pmid };
        try {
            const res = await getImageUrlApi(params);
            if (res.status === 200) {
                const data = res.data.response.data;
                setImageUrl(data.imageUrl);
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '获取图片失败',
                    position: 'center',
                });
            }
        } catch (error) {
            Toast.show({
                icon: 'fail',
                content: '获取图片失败',
                position: 'center',
            });
        }
    };

    return (
        <Image
            src={imageUrl}
            width={64}
            height={64}
            fit='cover'
            style={{ borderRadius: 32 }}
        />
    );
}


function HomePage() {
    const [albumlist, setAlbumlist] = useState([]);
    // const [albumlistTotal, setAlbumlistTotal] = useState(0);

    useEffect(() => {
        getAlbumData();
    }, []);

    const getAlbumData = async () => {
        const params = {
            singermid: '000CK5xN3yZDJt',
            limit: 30,
        };

        try {
            const res = await getAlbumDataApi(params);
            if (res.status === 200) {
                const data = res.data.response.singer.data;
                // setAlbumlistTotal(data.total);
                setAlbumlist(data.albumList);
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '获取数据失败',
                    position: 'center',
                });
            }
        } catch (error) {
            Toast.show({
                icon: 'fail',
                content: '获取数据失败',
                position: 'center',
            });
        }
    };

    return (
        <div className="w-full h-full">
            <main className="w-full h-full flex-grow flex items-center justify-center">
                <Space className="w-full" direction='vertical' block>
                    <Swiper
                        style={{ '--height': '50dvh' }}
                        slideSize={60}
                        trackOffset={20}
                        stuckAtBoundary={false}
                        total={albumlist.length}
                        indicator={false}
                        defaultIndex={2}
                        autoplay={true}
                    >
                        {albumlist.map((album, index) => (
                            <Swiper.Item key={index}>
                                <div className="h-full bg-red-200 flex items-center justify-center m-1">
                                    <ImageData album={album} />
                                </div>
                            </Swiper.Item>
                        ))}
                    </Swiper>
                </Space>
            </main>
        </div>
    );
}

export default HomePage;

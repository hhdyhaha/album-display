import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Space, Swiper, Image, Toast} from 'antd-mobile';
import {getAlbumDataApi, getAlbumInfoApi} from "@/api";
import {getImageUrl} from '@/utils/util'

interface AlbumType {
    pmid: string;
    albumMid: string
}

function ImageData({album}: { album: AlbumType }) {
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (album.pmid) {
            const imgUrl = getImageUrl(album.pmid);
            imgUrl.then((res) => {
                setImageUrl(res);
            });
        }
    }, [album]);

    // 获取专辑里歌曲信息
    function getAlbumInfo(albummid: string) {
        const params = {
            albummid,
        };
        getAlbumInfoApi(params).then((res) => {
            if (res.status === 200) {
                const data = res.data.response.data;
                if (data.list) {
                    const albumSongList = data.list;
                    navigate('/albumDetail', {state: {albumSongsList: albumSongList}});
                }
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '获取数据失败',
                    position: 'center',
                });
            }
        });
    }

    const clickImg = () => {
        getAlbumInfo(album.albumMid)
    }
    return (
        <div
            className="h-full flex flex-col items-center justify-center m-1"
        >
            {/* 使用伪元素来创建虚化效果 */}
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(2px)', // 虚化效果
                    zIndex: 1, // 确保伪元素在最上层
                }}
            />
            {/* 其他内容保持不变 */}
            <Image
                src={imageUrl}
                width={64}
                height={64}
                fit='cover'
                style={{
                    borderRadius: 32, marginBottom: 10, zIndex: 2
                }}
                onClick={clickImg}
            />

            {/* 使用 p 标签包裹文本，并添加样式 */}
            <p style={{
                color: 'black', // 确保文本颜色与背景形成对比
                position: 'relative', // 相对于父元素定位
                zIndex: 3, // 确保文本在图片和模糊背景之上
            }}>
                {album.albumName}
            </p>

        </div>
    );
}


function HomePage() {
    const [albumlist, setAlbumlist] = useState([]);

    useEffect(() => {
        getAlbumData();
    }, []);
    // 获取专辑数据
    const getAlbumData = async () => {
        const params = {
            singermid: '000CK5xN3yZDJt',
            limit: 51,
        };

        try {
            const res = await getAlbumDataApi(params);
            if (res.status === 200) {
                const data = res.data.response.singer.data;
                setAlbumlist(data.albumList.reverse());
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
                {albumlist.length > 0 ? (

                    <Space className="w-full" direction='vertical' block>
                        <Swiper
                            style={{'--height': '50dvh'}}
                            slideSize={60}
                            trackOffset={20}
                            stuckAtBoundary={false}
                            total={albumlist.length}
                            indicator={false}
                            defaultIndex={5}
                            autoplay={true}
                        >
                            {albumlist.map((album: any, index: number) => (
                                <Swiper.Item key={index}>
                                    <ImageData album={album}/>
                                </Swiper.Item>
                            ))}
                        </Swiper>
                    </Space>
                ) : (
                    <div>Loading...</div> // 或者其他加载指示器
                )}
            </main>
        </div>
    );
}

export default HomePage;

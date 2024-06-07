import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Image, List, Toast} from 'antd-mobile'
import {getImageUrl} from '@/utils/util'

function AlbumDetailPage() {
    // 接收传递的参数
    const location = useLocation();
    const {albumSongsList} = location.state || {};
    const [imageUrlList, setImageUrlList] = useState([]);
    useEffect(() => {
        if (albumSongsList.length > 0) {
            // 假设处理获取图片ID等逻辑，这里简化处理
            getImgUrl()
        }
    }, [albumSongsList]);

    // 获取歌曲图片
    function getImgUrl() {
        albumSongsList.forEach((item, index) => {
            if (item.albummid) {
                const imgUrl = getImageUrl(item.albummid);
                imgUrl.then((res) => {
                    setImageUrlList((prevState) => [...prevState, res])
                });
            }
        })
    }

    // 定义处理点击事件的函数，根据需要实现具体逻辑
    const handleClickSong = (song) => {
        console.log(song,'song')
        // 跳转链接
        window.location.href = `https://i.y.qq.com/v8/playsong.html?songmid=${song.songmid}`;
        // 在这里添加点击歌曲后的处理逻辑
        // Toast.show({
        //     content: '支持正版🙏🙏，暂无播放链接！！感谢理解🫡',
        //     position: 'center',
        // });
    };
    return (
        <List mode='card' header='专辑歌曲列表'>
            {albumSongsList && albumSongsList.map((item, index: number) => (
                <List.Item key={index} arrow={false} onClick={() => handleClickSong(item)}>
                    <div className="h-full flex items-center justify-start m-1">
                        <Image
                            src={imageUrlList[index]}
                            width={30}
                            height={30}
                            fit='cover'
                            style={{borderRadius: 32 ,marginRight: 10}}
                        />    {item.songname}
                    </div>

                </List.Item>
            ))}
        </List>
    )
}

export default AlbumDetailPage
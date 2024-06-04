import { useLocation } from 'react-router-dom';
import { List } from 'antd-mobile'

function AlbumDetailPage(){
    // 接收传递的参数
    const location = useLocation();
    console.log(location.state);
    const { albumSongsList } = location.state || {};
    console.log(albumSongsList, 'albumSongsList')
    // 定义处理点击事件的函数，根据需要实现具体逻辑
    const handleClickSong = (song) => {
        console.log(`Clicked on song: ${song}`);
        // 在这里添加点击歌曲后的处理逻辑
    };
    return (
        <List mode='card' header='专辑歌曲列表'>
            {albumSongsList && albumSongsList.map((item,index:number) => (
                <List.Item key={index} arrow={false} onClick={()=>handleClickSong(item)}>
                    {item.songname}
                </List.Item>
            ))}
        </List>
    )
}

export default AlbumDetailPage
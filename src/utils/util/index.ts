import {getImageUrlApi} from "@/api";
import {Toast} from 'antd-mobile';

// 获取图片
const getImageUrl = async (pmid: string) => {
    const params = {id: pmid};
    try {
        const res = await getImageUrlApi(params);
        if (res.status === 200) {
            const data = res.data.response.data;
            return data.imageUrl;
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

// 导出fetchImageUrl
export {getImageUrl};
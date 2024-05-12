import axiosInstance from '@/utils/http'

// 获取专辑api
export const getAlbumDataApi = (params: object) => {
    return axiosInstance({
        url: '/getSingerAlbum',
        method: 'get',
        params,
        timeout: 10000
    })
}
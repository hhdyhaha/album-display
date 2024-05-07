import axiosInstance from '@/utils/http'

// 获取专辑api
export const getAlbumDataApi = (params: object) => {
    return axiosInstance({
        url: '/',
        method: 'post',
        data: params,
        timeout: 10000
    })
}
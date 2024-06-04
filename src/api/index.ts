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

// 获取专辑或者歌曲图片 getImageUrl
export const getImageUrlApi = (params: object) => {
    return axiosInstance({
        url: '/getImageUrl',
        method: 'get',
        params,
        timeout: 10000
    })
}

// 获取专辑里歌曲信息 getAlbumInfo
export const getAlbumInfoApi = (params: object) => {
    return axiosInstance({
        url: '/getAlbumInfo',
        method: 'get',
        params,
        timeout: 10000
    })
}
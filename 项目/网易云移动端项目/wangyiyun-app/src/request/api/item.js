import service from "..";

//通过id获取歌单详情
export function getMusicDetail(id) {
  return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`
  })
}

//获取歌单所有歌曲
export function getItemList(id) {
  return service({
    method: 'get',
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}

//获取歌词
export function getMusicLyric(id) {
  return service({
    method: 'get',
    url: `/lyric?id=${id}`
  })
}
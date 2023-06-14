import echarts from 'echarts'
import nameMap from '@/plugins/name.js'

const install = function(Vue) {
  // object对象的方法,ES5提供的:defineProperties 直接在一个对象上定义新的属性或修改现有属性，并返回该对象
  // 挂载在prototype上可以用this调用,在Vue.prototype上挂载一个属性
  Object.defineProperties(Vue.prototype, {
    // 给这个属性起一个名字叫$charts
    $charts: {
      // 这个属性提供get方法
      get() {
        return {
          chinaMap(id,data) {
            const myChart = echarts.init(document.getElementById(id))

            const option = {
              // 提示信息
              tooltip: {
                triggerOn:'click',// 触发方式
                enterable:true,// 是否允许触发
                formatter(data){
                  return '<a href="/#/city/'+ data.name +'" style="color:#fff"><div><p>'+ data.seriesName + '&nbsp&nbsp:'+ data.name +'省</p><p>确诊:'+ data.value +'</p></div></a>'
                }
              },
              visualMap:[{//颜色映射
                orient:'vertical',// 默认竖直 水平:horizontal
                type:'piecewise', // 分段型
                pieces:[  // 配置颜色区间 
                  {min:0,max:100,color:'#fff'},
                  {min:100,max:500,color:'#FDFDCF'},
                  {min:500,max:3000,color:'#FE9E83'},
                  {min:3000,max:6000,color:'#E55A4E'},
                  {min:6000,max:100000,color:'#ff0000'}
                ]
              }],
              series: [{
                name: '省',
                type: 'map', // 配置图表类型
                map: 'china',
                roam: false, // 是否允许自动缩放
                zoom: 1.2, // 地图缩放比例
                // aspectScale: 0.75,
                label: { // 配置字体
                  normal: {
                    show: true, // 显示文字
                    textStyle: {
                      fontSize: 8
                      // color: 'rgba(0,0,0,0.4)'
                    }
                  }
                },
                itemStyle: { // 配置地图样式样式
                  normal: {
                    areaColor: 'rgba(0,255,236,0.5)', // 区域颜色
                    borderColor: 'rgba(0,0,0,0.2)' // 边框颜色
                  },
                  emphasis: {
                    areaColor: 'rgba(255,180,0,0.8)', // 阴影区域颜色
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20, // 模糊程度
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
                  }
                },
                // data:[
                //   {name:'内蒙古',value:10,itemStyle:{normal:{areaColor:'#f00'}}}
                // ]
                data:data
              }]
            }
            myChart.setOption(option)
          },
          worldMap(id,data){
            const myChart = echarts.init(document.getElementById(id))

            const option = {
              // 提示信息
              tooltip: {
                triggerOn:'click',// 触发方式
                enterable:true,// 是否允许触发
                formatter(data){
                  return ('<div><p>'+ data.name +'</p><p>现存确诊:'+ data.value +'</p></div>')
                }
              },
              visualMap:[{//颜色映射
                orient:'vertical',// 默认竖直 水平:horizontal
                type:'piecewise', // 分段型
                pieces:[  // 配置颜色区间 
                  { min: 0, max: 0, color: '#FFFFFF' },
                    { min: 1, max: 1000, color: '#FDFDCF' },
                    { min: 1000, max: 10000, color: '#FE9E83' },
                    { min: 10000, max: 500000, color: '#E55A4E' },
                    { min: 500000, max: 10000000000, color: '#4F070D' }
                ]
              }],
              series: [{
                name: '世界地图',
                type: 'map', // 配置图表类型
                map: 'world', // 通过这个渲染地图
                roam: false, // 是否允许自动缩放
                zoom: 1.2, // 地图缩放比例
                // aspectScale: 0.75,
                label: { // 配置字体
                  normal: {
                    show: false, // 显示文字
                    textStyle: {
                      fontSize: 8
                      // color: 'rgba(0,0,0,0.4)'
                    }
                  }
                },
                nameMap:nameMap,
                itemStyle: { // 配置地图样式样式
                  normal: {
                    areaColor: 'rgba(0,255,236,0.5)', // 区域颜色
                    borderColor: 'rgba(0,0,0,0.2)' // 边框颜色
                  },
                  emphasis: {
                    areaColor: 'rgba(255,180,0,0.8)', // 阴影区域颜色
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20, // 模糊程度
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
                  }
                },
                data:data
              }],
            }
            myChart.setOption(option)
          },
          provinceMap(id, cityName, data) {
            // console.log(data);
            var myEcharts = echarts.init(document.getElementById(id))
            var option = {
              tooltip: {
                formatter(data) {
                  return (
                    '<div><p>' +
                    data.name +
                    '</p><p>确诊:' +
                    data.value +
                    '</p></div>'
                  )
                },
              },
              visualMap: [
                {
                  // 映射-颜色值
                  orient: 'vertical', // 分段方向:horizontal水平
                  type: 'piecewise', // 分段
                  pieces: [
                    // 配置颜色区间
                    { min: 0, max: 0, color: '#FFFFFF' },
                    { min: 1, max: 10, color: '#FDFDCF' },
                    { min: 10, max: 100, color: '#FE9E83' },
                    { min: 100, max: 500, color: '#E55A4E' },
                    { min: 500, max: 10000, color: '#4F070D' },
                  ],
                },
              ],
              series: [
                {
                  name: '市',
                  type: 'map', // 配置图表类型
                  map: cityName, // 必须写中文
                  roam: false, // 是否允许自动缩放
                  zoom: 1.2, // 地图缩放比例
                  label: {
                    // 配置字体
                    normal: {
                      show: true,
                      textStyle: {
                        fontSize: 8,
                      },
                    },
                  },
                  itemStyle: {
                    // 配置地图样式
                    normal: {
                      areaColor: 'rgba(0,255,236,0)',
                      borderColor: 'rgba(0,0,0,0.2)',
                    },
                    emphasis: {
                      // 选中的区域颜色及阴影效果等
                      areaColor: 'rgba(255,180,0,0.8)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0,
                    },
                  },
                  data,
                },
              ],
            }
            myEcharts.setOption(option)
          },
        }
      }
    }
  })
}

export default install

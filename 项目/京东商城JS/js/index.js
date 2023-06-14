window.onload = function () {

  // 头部开始
  // 实现模糊查询

  //获取输入框
  let keyword = document.querySelector('.keyword');

  //获取搜索下拉列表
  let searchList = document.querySelector('.search-list');

  // 定义数组存储搜索的内容
  let searchArr = ['小米手机', '华为手机', '苹果手机', '小米电视', '小米平板', '苹果12', '苹果13', '苹果手表']

  function search() {
    //先清空下拉框内容
    searchList.innerHTML = '';
    for (let i = 0; i < searchArr.length; i++) {
      if (searchArr[i].indexOf(keyword.value) != -1) {
        searchList.innerHTML += '<p class="lp">' + searchArr[i] + '</p>';
        searchList.style.display = 'block';
      }
    }

    let lp = searchList.querySelectorAll('.lp');
    for (let i = 0; i < lp.length; i++) {
      lp[i].onmouseover = function () {
        lp[i].style.backgroundColor = '#ccc';
      }
      lp[i].onmouseout = function () {
        lp[i].style.backgroundColor = '';
      }

    }
  }

  //给输入框绑定内容改变事件
  keyword.oninput = function () {
    search()
  }

  // 鼠标点击
  keyword.onclick = function () {
    search()
  }

  // 按下s键光标自动聚焦
  onkeyup = (e) => {
    if (e.keyCode === 83) {
      keyword.focus();
    }
  }
  // document.addEventListener('keyup', function (e) {
  //   if (e.keyCode === 83) {
  //     keyword.focus();
  //   }
  // })

  //鼠标失焦
  keyword.onblur = function () {
    searchList.style.display = 'none';
  }

  //搜索键
  let SeBo = document.querySelector('.search-form button span');

  SeBo.onclick = () => {
    //在原窗口后面添加www.baidu.com
    // window.open('www.baidu.com', 'topFram')

    //跳转到百度
    // window.location.assign('http://www.baidu.com');
    //window对象忽略
    location.assign('file:///C:/Users/LWJ/Desktop/all/Web/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98/%E4%BA%AC%E4%B8%9C%E5%95%86%E5%9F%8EJS/detail.html');

    // location.href = 'http://www.baidu.com'
    // location = 'http://www.baidu.com'
  }
  // 头部结束





  // 轮播图开始
  let img = document.querySelector('.img');
  let prev = document.querySelector('.prev');
  let next = document.querySelector('.next');
  let slide = document.querySelector('.slide')
  let lis = document.querySelectorAll('.banner-btn li')

  let imgArr = ['1.webp', '2.jpg', '3.jpg', '4.jpg', '5.webp', '6.webp', '7.jpg', '8.jpg']

  let count = 0;

  //定义函数用来切换图片的路径
  function cutImg() {
    img.src = './images/' + imgArr[count];
    for (let i = 0; i < lis.length; i++) {
      lis[i].className = '';
    }
    lis[count].className = 'active'
  }

  //定时器，每隔3秒
  let timer = setInterval(function () {
    count++;
    if (count > imgArr.length - 1) {
      count = 0;
    }
    cutImg()
  }, 3000);

  //按左边切换上一张图片
  prev.onclick = () => {
    count--;
    if (count < 0) {
      count = imgArr.length - 1;
    }
    cutImg();
  }

  //按右边切换下一张图片
  next.onclick = () => {
    count++;
    if (count > imgArr.length - 1) {
      count = 0;
    }
    cutImg()
  }

  //鼠标划入定时器停止工作
  slide.onmouseover = () => {
    clearInterval(timer);
  }

  //鼠标划出定时器启动工作
  slide.onmouseout = () => {
    timer = setInterval(function () {
      count++;
      if (count > imgArr.length - 1) {
        count = 0;
      }
      cutImg()
    }, 2000);
  }

  //给li绑定点击时间
  for (let i = 0; i < lis.length; i++) {

    lis[i].onclick = () => {
      count = i;
      cutImg();
    }
  }
  // 轮播图结束

  //实现楼层滚动，颜色变色效果
  let items = document.querySelectorAll('.content .item');  //获取所有的div
  let elevaterA = document.querySelectorAll('.elevater a');





  // 主体开始
  //实现楼层的定位实现

  let header = document.querySelector('.header');
  let banner = document.querySelector('.banner');
  let elevater = document.querySelector('.elevater')

  //获取到header的高度
  let headerHeight = header.offsetHeight; //包括height、padding、border，不包括margin
  //获取到banner的高度
  let bannerHeight = banner.offsetHeight;

  let elevaterArr = []
  let base = headerHeight + bannerHeight;
  for (let i = 0; i < items.length; i++) {
    base += items[i].offsetHeight;
    elevaterArr.push(base)
  }

  //吸顶效果
  let sear = document.querySelector('.search')
  let searM = document.querySelector('.search-m')
  let searForm = document.querySelector('.search-form')
  let searLogo = document.querySelector('.search-logo')

  function ClearColor() {
    for (let i = 0; i < elevaterA.length; i++) {
      elevaterA[i].style.color = ''
    }
  }

  onscroll = () => {
    //获取到滚动条垂直方向滚动了多少
    // let top = document.documentElement.scrollTop || document.body.scrollTop
    let top = window.scrollY;

    //当滚动条滚动到一定程度时，将楼层的定位换成固定定位
    if (top >= headerHeight + bannerHeight) {
      elevater.className = 'elevater elevater-fix'
      sear.className = 'search search-fix'
      searM.style.height = '50px'
      searForm.style.top = '8px'
      searLogo.style.display = 'block'
    } else {
      elevater.className = 'elevater'
      sear.className = 'search'
      searM.style.height = '60px'
      searForm.style.top = '25px'
      searLogo.style.display = 'none'
    }

    if (top < headerHeight + bannerHeight) {
      ClearColor()
    } else if (top >= headerHeight + bannerHeight && top <= elevaterArr[0]) {
      ClearColor()
      elevaterA[0].style.color = 'red'
    } else if (top >= elevaterArr[0] && top <= elevaterArr[1]) {
      ClearColor()
      elevaterA[1].style.color = 'red'
    } else if (top >= elevaterArr[1] && top <= elevaterArr[2]) {
      ClearColor()
      elevaterA[2].style.color = 'red'
    } else if (top >= elevaterArr[2] && top <= elevaterArr[3]) {
      ClearColor()
      elevaterA[3].style.color = 'red'
    }
  }

  //倒计时
  let spans = document.querySelectorAll('.timmer span')

  // 设置目标日期和时间
  var countDownDate = new Date("Mar 17, 2023 22:00:00").getTime();

  // 每秒更新倒计时
  var x = setInterval(function () {

    // 获取当前日期和时间
    var now = new Date().getTime();

    // 计算目标日期和当前日期之间的时间差
    var distance = countDownDate - now;

    // 将时间差转换为天数、小时数、分钟数和秒数
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 将结果输出到页面上
    spans[0].innerHTML = hours
    spans[1].innerHTML = minutes
    spans[2].innerHTML = seconds

    // 如果倒计时结束，清除计时器
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "倒计时已结束";
    }
  }, 1000);



  // 主体结束





}




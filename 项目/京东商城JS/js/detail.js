// window.onload = function () {
//   console.log(this);
// }

// window.addEventListener('load', function () {
//   console.log(this);
// })

onload = () => {

  let prev = document.querySelector('.prev')
  let next = document.querySelector('.next')
  let ul = document.querySelector('.spec-items ul')
  let lis = document.querySelectorAll('.spec-items ul li')
  let img = document.querySelector('.img')

  prev.onclick = () => {
    ul.style.left = '0px'
    prev.style.background = 'url(./images/disabled-prev.png)'
  }

  next.onclick = () => {
    ul.style.left = '-116px'
    prev.style.background = ''
  }

  for (let i = 0; i < lis.length; i++) {
    lis[i].onmouseover = () => {
      for (let i = 0; i < lis.length; i++) {

        lis[i].className = ''
      }
      lis[i].className = 'img-hover'
      img.src = lis[i].children[0].src
    }
  }

  let mainImg = document.querySelector('.main-img')
  let zoomPup = document.querySelector('.zoom-pup')
  let zoomDiv = document.querySelector('.zoom-div')

  mainImg.onmouseover = () => {
    zoomPup.style.display = 'block'
    zoomDiv.style.display = 'block'
  }
  mainImg.onmouseout = () => {
    zoomPup.style.display = 'none'
    zoomDiv.style.display = 'none'
  }














}

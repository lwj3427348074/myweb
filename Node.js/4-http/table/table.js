onload = () => {
  //获取所以的td
  let tds = document.querySelectorAll('td');

  tds.forEach(item => {
    item.onclick = function () {
      this.style.background = '#222'
    }
  })
}
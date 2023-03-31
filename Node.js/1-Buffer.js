//Buffer的创建方式

// 1.alloc
//创建一个10字节的Buffer
//alloc是分配的意思，是Buffer里的方法
let buf = Buffer.alloc(10);
console.log(buf);

//内存空间其实是可以复用的，alloc会对每一个二进制位都清0，allocUnsafe并不会对旧的数据进行清空
//用allocUnsafe创建的Buffer速度比alloc要快一些

//2.allocUnsafe
//用allocUnsafe方法所创建的Buffer其中可能会包含旧的内存数据
let buf_2 = Buffer.allocUnsafe(100)
console.log(buf_2);

//3.from
//hello中每个字母都会转换为这个字符在Unicode在码表中对应的数字，数字会转换成二进制存储到Buffer中
let buf_3 = Buffer.from('hello')
console.log(buf_3);
//转换数组也是一样
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_4);



//======================================
console.log("===========================");



//Buffer与字符串的转换
console.log(buf_4.toString());

//[]
let bufStr = Buffer.from('hello')
console.log(bufStr);
console.log(bufStr[0]);
console.log(bufStr[0].toString(2));
bufStr[0] = 95
console.log(bufStr[0].toString());

//溢出
//它会舍弃高位的数字
bufStr[0] = 361
console.log(bufStr); //0001 0110 1001 => 0110 1001

//中文
let bufStr_2 = Buffer.from('你好')
//中文字符占3个字节
console.log(bufStr_2);
// console.log('iframe.js');
// var height = document.height;
// var iframe2 = document.createElement('iframe');
// iframe2.height = 0;
// iframe2.src = 'http://127.0.0.1:4000/demos/iframe%E8%B7%A8%E5%9F%9F/height.html?height=' + document.height + '&v' + Math.random();
// document.body.appendChild(iframe2);
// setInterval(function() {
//     if (document.height != height) {
//         iframe2.src = 'http://127.0.0.1:4000/demos/iframe%E8%B7%A8%E5%9F%9F/height.html?height=' + document.height + '&v' + Math.random();
//         height = document.height;
//     }
// }, 100)
var height = document.height;
var iframe2 = document.createElement('iframe');
iframe2.height = 0;
iframe2.src = "http://127.0.0.1:4000/demos/iframe%E8%B7%A8%E5%9F%9F/height.html";
document.body.appendChild(iframe2);
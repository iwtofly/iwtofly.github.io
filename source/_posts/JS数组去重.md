---
title: JS数组去重
date: 2017-02-25 16:44:54
tags: 前端
---

** 注意 ** ：需要注意包含NaN类型数据的去重

使用Array.prototype.indexOf(), indexOf使用的是严格等 '==='
<!-- more -->
### 思路1 => arr.filter()
```javascript
function unique(arr) {
    return arr.filter(function(item, index) {
        return arr.indexOf(item) === index;
    })
}
```

### 思路2 => arr.forEach()
```javascript
function unique(arr) {
    var ret = [];
    arr.forEach(function(item) {
        if (ret.indexOf(item) === -1) {
            ret.push(item);
        }
    });
    return ret;
}
```

### 思路3 => es2015新增方法includes 解决NaN
```javascript
function unique(arr) {
    var ret = [];
    arr.forEach(function(item) {
        if (!ret.includes(item)) {
            ret.push(item);
        }
    });
    return ret;
}
```
### 思路4 => 借助set，map等ES6新增类型


https://www.toobug.net/article/array_unique_in_javascript.html


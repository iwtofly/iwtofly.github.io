---
title: 日常CSS备忘
date: 2017-08-16 19:38:25
tags: [css, 前端]
---

由于经常使用框架配套组件库，CSS技巧会生疏，今天转正面试被问到transiton都感觉很尴尬，因此在此梳理记录。

### 1. 内容超过一定宽度时设置...
```css
{
    width: 27em;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
}
```
<!-- more -->
### 2. CSS3的transition过渡属性
有人说transition、transform、animation分别对应于过渡、变换、动画。

transition的作用是平滑的改变CSS的值，transition有以下几个属性：
> 1. __transition-property__:指定过渡的性质，比如transition-property:backgrond   
> 2. __transition-duration__:过渡持续时间  
> 3. __transition-delay__: 延迟过渡时延  
> 4. __transition-timing-function__: 指定过渡类型,ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier   

example:
```css
.mydiv{
    width: 100px;
    height: 100px;
    background: blue;
    transition: all 2s 0.5s ease;
    -webkit-transition: all 2s 0.5s ease;
    -moz-transition: all 2s 0.5s ease;
    -o-transition: all 2s 0.5s ease;
}
.mydiv:hover{
    width: 300px;
    background: pink;
}
```
all为width和background均参与变换，最终效果为，鼠标hover之后延迟0.5s颜色渐变、宽度渐变。  
参与transition的属性有非常多，除了以上两种还有margin、color、border等的。[transform:rotate(360deg); ]
### 3. CSS3-transform 变换
transform用于调整scale、rotate、translate等等。
例如在垂直水平居中时常用 
```css
transform: translate(-50%, -50%);
```
此外transform经常和transition一起应用，营造比较丰富的动画。  
__transform作用于block元素！！__  
example:
```css
.trans-div {
    display: block;
    line-height: 100px;
    width: 100px;
    background: #beceeb;
    margin:30px auto;
    text-align:center;
    -webkit-transition:all 2s ease-in-out;
    -moz-transition:all 2s ease-in-out;
    -o-transition:all 2s ease-in-out;
    transition:all 2s ease-in-out;
}
.trans-div:hover {
    -webkit-transform:rotate(720deg) scale(2,2);
    -moz-transform:rotate(720deg) scale(2,2);
    -o-transform:rotate(720deg) scale(2,2);
    transform:rotate(720deg) scale(2,2);
}
```
```html
<a class="trans-div">hover me</a>
```
__效果__：由内向外旋转同时放大。
### 4. CSS3-animation 动画
animation需要配合keyframes使用，定义动画的关键帧。之后用animation规定使用动画的 frame名称、持续时间、ease等效果。
```css
div {
    width:100px;
    height:100px;
    background:red;
    position:relative;
    animation:mymove 5s infinite;
    -webkit-animation:mymove 5s infinite; /*Safari and Chrome*/
}
@keyframes mymove
{
    from {left:0px;}
    to {left:200px;}
}

@-webkit-keyframes mymove /*Safari and Chrome*/
{
    from {left:0px;}
    to {left:200px;}
}
```
也可以分开定义animation的各个属性，分别为：
> animation-name 名称  
> animation-duration 持续时间 
> animation-timing-function 动画的速度曲线  
> animation-delay  延时  
> animation-iteration-count  应该播放的次数（infinite是无限循环）  
> animation-direction 动画方向





var forms = document.getElementsByTagName('form');
var inputs = document.getElementsByTagName('input');

var form1 = forms[0];
var form2 =forms[1];
var tip1 = {
    eleven: '* 手机号码应为11位纯数字',
    wellDone: '* 干得漂亮！',
    kiding: '* 一堆数字什么鬼？请输入一个合法的手机号好嘛'
}
var tip2 = {
    repeat: '* 有重复单词但是不相邻',
    repeatAnd:'* 出现相邻且重复单词！',
    wellDone:'* 没有重复单词'
}
// 绑定submit事件
jsUtil.addHandler(form1, 'submit', handleTelNum);
jsUtil.addHandler(form2, 'submit', handleString);

function handleString(event) {
    event = jsUtil.getEvent();
    jsUtil.preventDefault(event);

    testString(inputs[1].value);
}

function handleTelNum(event) {
    event = jsUtil.getEvent();
    jsUtil.preventDefault(event);

    testTelNum(inputs[0].value);
}
function testTelNum(num) {
    var temp = /^\d{11}$/.test(num);
    if (!temp) {
        // console.log('手机号码应为11位纯数字');
        showTip(1, tip1.eleven);
    } else {
        var reg = /^1(3[0-9]|47|5[^4]|7[0-8]|8[0,2,3,5-9])\d{8}$/;
        console.log(reg.test(num));
        if (reg.test(num)) {
            // console.log('干得漂亮！')
            showTip(1, tip1.wellDone, 'wellDone');
        } else {
            // console.log('一堆数字什么鬼？请输入一个合法的手机号好嘛');
            showTip(1, tip1.kiding);
        }
    }    
}
// 字符串检测
function testString(str) {
    // match匹配符合条件的字符串，返回数组。缺点是数字等被省去了
    var arr = str.match(/[a-zA-Z]+/g);
    var ret = {};
    var position = 0;
    // position如果最后为0，表示没有重复。为1表示重复且相邻
    var close = false; // 相邻参数
    if (str) {
        arr.forEach(function(item, index){
            if(ret[item] != undefined) {
                position = Math.abs(index - ret[item]);
                if (position === 1) {
                    close = true;
                }
            } else {
                ret[item] = index;
            }
        })
    }
    if (position === 0) {
        showTip(2, tip2.wellDone, 'wellDone');
    } else {
        close ? showTip(2, tip2.repeatAnd) : showTip(2, tip2.repeat);
    }
}

function showTip(group, tip, type) {
    var node = document.getElementById('tip' + group);
    console.log('tip' + group);
    node.innerHTML = tip;
    if (type === 'wellDone') {
        node.style.color = '#1def82';
    } else {
        node.style.color = 'red';
    }
}

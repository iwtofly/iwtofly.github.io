var jsUtil = {
    // 事件绑定
    addHandler: function(elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, handler);
        } else {
            elem['on' + type] = handler;
        }
    },
    // 移除事件绑定
    removeHandler: function(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.attachEvent('on' + type, handler);
        } else {
            elem['on' + type] = null;
        }
    },
    // 获取事件
    getEvent: function(event) {
        return event || window.event;
    },
    // 获取事件目标
    getTarget: function(event) {
        return event.target || event.srcElment;
    },
    // 阻止默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropgation) {
            event.stopPropgation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 对象的深度拷贝
    // 缺点：只能拷贝扁平，不能拷贝函数，Date等
    deepClone1: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // 深度拷贝升级版，可拷贝函数
    deepClone2: function(obj) {
        var objClone;
        if (obj.constructor == Object) {
            objClone = new obj.constructor();
        } else {
            objClone = new obj.constructor(obj.valueOf());
        }

        for (var key in obj) {
            if (objClone[key] != obj[key]) {
                if (typeof(objClone[key]) == 'object') {
                    objClone[key] = clone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
        objClone.toString = obj.toString;
        objClone.valueOf = Obj.valueOf;
        return objClone;
    }

}
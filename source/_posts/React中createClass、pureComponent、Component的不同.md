---
title: React中createClass、PureComponent、Component的不同
date: 2017-03-07 17:36:02
tags: [Reactjs, 前端]
---
16年6月开始使用React，至今写法上发生了很大的变化，不过也可能是一开始接触的太low了。我使用过的创建react组件的方式大致有三种形式。
> * var Name = React.createClass
> * class Name extends Component
> * class Name extends PureComponent
> * 友情提示：后两种需要babel转码

那么，前两种方式有哪些区别呢？
首先，从createClass到class extends的改变是基于ES6的语法糖——class, 很类似于php等语言中的语法。本质上来讲，他们之间的差别不大，但是掌握他们的不同可以让我们更好的选择适合的方案。
<!-- more -->
我们简单来看一下两种方法下构成的代码：
### createClass方式
```javascript
import React, {PureComponent} from 'react';

const Example = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    mixins: [SomeMixin], // ES6不支持
    getDefaultProps() {
        return {
            title: 'I am title'
        };
    },
    getInitialState() {
        return {
            name: 'world'
        }
    },

    handleClick() {
        console.log('clicked!');
    },
    render() {
        return(
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.handleClick}></button>
                hello, {this.state.name}
            </div>
        )
    }
});

export default Example;
```
### class extends方式
```javascript
import React from 'react';

class Example extends React.Component {
    constructor(props) {
        super(props);
        // super之后才能使用this
        this.state = {
            name: 'world'
        }
        // 重要！！
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('clicked!');
    }

    render() {
        const {name} = this.state;
        return(
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.handleClick}></button>
                hello, {name}
            </div>
        )
    }
};

// 验证类型 => 对应  propTypes: {}
Example.propsTypes = {
    title: React.PropTypes.string.isRequired,
}
// 设置默认属性值 => 对应 getDefaultProps() {}
Example.defaultProps = {
    title: 'I am title'

};
export default Example;
```

### 1. 语法区别
敲黑板，** 注意逗号 **，切忌自嗨。
class extends的语法形式引入了** constructor **,方便我们调用** super() **函数来为Component传递属性。还可以传递context上下文，实现依赖注入，** 这部分，下次再写 **。
### 2. state初始化
在createClass中，我们创建了一个getInitialState返回创建的state对象。
在class extends方式中，我们在constructor中调用了super()之后，访问this，创建this.state，初始化声明状态。
### 3. this的区别（重要）
createClass时，React会自动帮助我们处理** this **指向。
但是，在class extends的方式中，对button进行事件绑定时，需要注意，此时this默认并没有绑定到React实例上，因此需要做相应的处理：
```javascript
<button onClick={this.handleClick.bind(this)}></button>
```
或者如上例所示，在constructor中中调用了super()之后，改变this.handleClick执行的上下文。

那么PureComponent与直接使用Component又有什么不同呢？
## PureComponent与Component的不同点
在没有使用Redux的情况下，我们需要进行优化减少不必要的render时，经常需要手写shouldComponentUpdate，复杂的情况下要进行一系列深比较等。当然，也可以配合Immutable.js实现。
而PureComponent的方式创建组件时，react会帮助我们进行一次** '浅比较'' **，一定程度上来减少不必要的render。这里，我给浅比较加上了一个引号。

我的测试代码如下，father.js为父组件，sub.js为子组件

father.js
```javascript
import React, {PureComponent, Component} from 'react';
import Sub from './sub.js';

// export default class Father extends PureComponent {

export default class Father extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [],
            test: undefined
        }
    }

    componentDidMount() {
        console.log("father componentDidMount");
    }

    handleClick() {
        this.setState({items: this.state.items.concat(['new-item'])});
        // this.setState(prevState => ({
        //     items: prevState.items.concat(['new-item'])
        // }))
    }
    handleClickFather() {
        this.setState({
            test: '123'
        })
    }

    render() {
        console.log('Father --render');
        return(
            <div>
            It is the father!
                <button onClick={this.handleClickFather.bind(this)}>father Button</button>
                <button onClick={this.handleClick.bind(this)}>sub Button</button>
                <Sub items={this.state.items}/>
            </div>
        )
    }
}
```
sub.js
```javascript
import React, {PureComponent, Component} from 'react';

// export default class Sub extends PureComponent {
export default class Sub extends Component {
    constructor(props, context) {
        super(props, context);
        console.log('context in constructor',context);

        this.state = {
            title: this.context.title
        }
    }
    componentDidMount(){
        console.log("sub componentDidMount");
    }
    render() {
        console.log('sub  --render');
        return(
            <div>it is my sub, the title get from apptestpage is ---- {this.state.title}</div>
        )
    }
}

Sub.contextTypes = {
    title: React.PropTypes.string
}
```
可以看出，father.js调用了sub.js,我们在father.js中设定了两个button，第一个'father button'绑定事件将会更改father组件中的state——test，这个test并未作为参数传入sub。另一个button，sub button绑定的事件将会改变items,并且sub组件接收该props。
father.js与sub.js均使用** class Sub extends Component **时，点击两个按钮，发现控制台均打印：
```
Father --render
sub  --render
```
也就是说，test的改变，引起了sub不必要的一次render。

之后，再使用** class Sub extends Component **创建组件，点击father button，控制台打印：
```
Father --render
```
点击sub button,控制台打印
```
Father --render
sub  --render
```
此时，才是我们想要的结果。

** 但是 **，使用PureComponent，需要注意的是，我此时使用的方法是数组的concat，concat有一个特点是会新创建一个数组对象，假如使用push方法，就会出现sub.js不进行render的情况。也就是说，PureComponent比较的是简单类型的值，或者对象的地址，这些内容都有一个特点，应该是存在栈当中的（恩，才疏学浅，我是这么骗自己的。如果错了，不要当真）。
因此，在大多数情况下，我们还是需要手写shouldComponentUpdate滴。恩，当然，还可以移步redux。

好了，不喜欢写文档的我，写到这里我已经用尽洪荒之力了。

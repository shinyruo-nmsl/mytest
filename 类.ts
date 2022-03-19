// 类介绍
class Greeter {
    private greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return 'hello' + this.greeting
    }
}

let greeter = new Greeter('world')


// 编译成js后的结果
// 这里注意到类中属性编译成js后代表实例属性
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return 'hello' + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world');

// 类的继承
class Bnimal {
    name: string;
    constructor(theName: string) { this.name = theName }
    move(distance: number = 0) {
        console.log(`${this.name}`)
    }
}

class Snake extends Bnimal {
    constructor(name: string) { super(name) }
    move(distance: number) {
        super.move(distance)
        console.log('sisisi')
    }
    // 倘若添加了额外的成员，就不能兼容其父类或者其他派生类
    // sing() {
    //     console.log('hh')
    // }
}

class Wolf extends Bnimal { }

let sam: Bnimal = new Snake('qq')
sam.move()

// 以下的例子说明变量好像对于子类父类的类型判断上是兼容的？
// 正确的解释应该是不同的类的如果结构上相同，那么他们就是兼容的，否则不是
// 倘若我们在Snake类中添加了额外的成员，那么下面的重新赋值操作就会报错
let tom: Snake = new Snake('jj')
tom = new Bnimal('dd')
tom = new Wolf('ff')


// public/private/protected
// 默认情况下成员都是public

// TS使用的是结构类型的系统
// 当我们比较两种不同类型时，如果所有成员类型时兼容的，那么我们就认为它们是兼容的
// 如下所示
class JOJO {
    name: string
}
class QOQO {
    name: string
}
let jojo = new JOJO
jojo = new QOQO

// 但是在比较带有private/protected成员时，情况就不同了
// 如果一个类型中包涵一个private成员，另一个不仅也要包涵，而且必须是在同一处声明的
// 如下所示
class Cnimal {
    private name: string
}
class Pig extends Cnimal { }
class Tiger {
    private name: string
}
let pig = new Pig()
// pig = new Tiger()  这里会引发一个错误

// 理解protected
// protected vs private
// protected 可以在派生类中访问，但private只能在类本身进行访问
class Dnimal {
    private name: string
}

// 以下会引发错误，原因即为name为私有属性，除非你在子类中重新定义
// class Lion extends Dnimal{
//     constructor() {
//         super()
//         console.log(this.name) // 引发错误的代码，私有属性不能在其子类中访问
//     }
// }


// 如果使用protected,那么便没有问题，如下所示
class Enimal {
    protected name: string
}
class Lion extends Enimal {
    constructor() {
        super()
        console.log(this.name)
    }
}

//构造函数也可以被标记为protected，这意味着这个类不能实例化，但是可以被继承
class Fnimal {
    protected name: string
    protected constructor(theName: string) {
        this.name = theName
    }
}

class Sheep extends Fnimal {
    private weight: number
    constructor(name: string, weight: number) {
        super(name)
        this.weight = weight
    }
}

let sheep = new Sheep('xyy', 50)
// let fnimal = new Fnimal('ff') 不能在外部访问，引发错误


// readonly修饰符
// 只读属性必须在声明时或者在构造函数里面被初始化
// 利用只读/pubilc/private/protected等修饰构造函数的参数，简化实例成员的声明
class Octopus {
    readonly numberOfLegs: number = 8
    constructor(readonly name: string) { }
}
let octopus = new Octopus('gd')
// octopus.name = 'sds' 这一行将会引发错误，因为是只读属性

// 抽象类
// 抽象类作为其他派生类的基类使用，一般不会被直接实例化
// 不同于接口，抽象类可以包含成员的实现细节
abstract class Gnimal {
    constructor(public name: string) { }
    abstract makeSound(): void; // 抽象类中的抽象方法不包含具体实现，但必须在派生类中实现
    move(): void {
        console.log('hello world')
    }
}

class Bull extends Gnimal {
    constructor(name: string) {
        super(name)
    }
    makeSound(): void {
        console.log('mumumu')
    }
}

let bull = new Bull('mk')
bull.makeSound()
bull.move()

// 进阶技巧

// 构造函数创造实例的两种方式
class Hnimmal {
    static standardGreeting = 'hello, there'
    greeting: string
    greet() {
        if (this.greeting) return this.greeting
        return Hnimmal.standardGreeting
    }
}
// 第一种：直接声明Hnimmal类型的变量
let hinmal: Hnimmal = new Hnimmal()
// 第二种： 声明一个保存Hnimal类或其构造函数的变量
let hinmalMaker: typeof Hnimmal = Hnimmal // typeof即返回Hnimmal的标识符类型
let iinmal = new hinmalMaker()

// 把类当做接口使用
class Jnimal {
    x: number
    constructor(xx: number) {
        this.x = xx
    }
    fn(): void {
        console.log('hell')
    }
}

interface Mouse extends Jnimal {
    y: number;
    gn(): string
}
let mouse: Mouse = { x: 2, y: 2, fn: () => { }, gn: () => 'sq' }

// 前面的学习中也提到了，TS的兼容性是基于结构的
// 如下所示
interface Named {
    name: string
}
class Person {
    name: string;
    height: number
}
let p: Named
p = new Person

// 比较两个函数
let fnx = (a: number) => 0
let fny = (a: number, b: number) => 0
// fnx = fny 这一行会发生错误，原因是函数从参数可以缺失，这很常见，但是不能添加
fny = fnx

let gnx = () => ({ name: 'A' })
let gny = () => ({ name: 'A', age: 14 })
gnx = gny
// gny = gnx 这一行会发生错误，这和属性类型一致

// 枚举类型
// 不同枚举类型之间是不兼容的
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
// status = Color.Green;  // Error

// 类
// 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。 
// 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
class Qnimal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let aa: Qnimal;
let ss: Size;

aa = ss;  // OK
ss = aa;  // OK

// 私有成员和受保护的成员
// 两者都必须继承自同一个父类才行，所以以下会出现错误
class Blackman {
    private color: string
}
class Whiteman {
    private color :string
}
let black:Blackman
let white:Whiteman
// black = white 出现错误的代码

// 泛型
// 只要知道ts是基于结构性的系统便很容易判断下面的代码
//以下不会出错
interface Empty<T> {}
let emo: Empty<number>
let emp: Empty<string>
emo = emp

//以下会出错
interface Fmpty<T> {
    data: T
}
let fmo: Fmpty<number>
let fmp: Fmpty<string>
// fmo = fmp  出错的代码



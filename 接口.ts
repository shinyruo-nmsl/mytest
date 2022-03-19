interface LavelVal {
    label: string
}
function printLabel(labelObj: LavelVal): void {
    console.log(labelObj.label)
}

let myObj = {
    size: 10,
    label: 'Size'
}

printLabel(myObj)

// 可选属性
interface SquareConfig {
    color?: string;
    width?: number
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 } // 这里直接类型推断了
    if (config.color) newSquare.color = config.color
    if (config.width) newSquare.area = Math.pow(config.width, 2)
    return newSquare
}

let mySquare = createSquare({ color: 'balck' })
// 下一行代码会报错,原因是属性对不上
// let yourSquare = createSquare({width:200, colour:'red'})
// 解决办法
// 断言
let yourSquare = createSquare({ width: 200, colour: 'red' } as SquareConfig) //相信我
// 跳过检查
let myConfig = { width: 200, colour: 'red' }
let hisSquare = createSquare(myConfig)
// 给接口添加任意数量的其他属性
interface SquareConfig {
    color?: string;
    width?: number
    [propName: string]: any
}
let herSquare = createSquare({ width: 200, colour: 'red' })



// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

// let p1: Point = { x: 10, y: 20, z: 30 } 这里会报错，对比传参会发现一个现象，赋值的时候不能与接口不一致
let p1: Point = { x: 10, y: 10 }
// p1.x = 5 这里会报错

let ro: ReadonlyArray<number> = [1, 2, 3]
// ro[0] = 13 这里是只读数组，不能修改
// let  a:number[] = ro 这里readonly不能分配给可变类型
let a: number[] = ro as number[] //可以通过断言重写

// readonly vs const 属性用readonly， 变量用const

// 接口也可以描述函数类型
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = (sour: string, sub: string) => true

// 描述可索引类型
interface StringArray {
    [index: number]: string
}
let myArray: StringArray
myArray = ['Bob', 'Fred']

// TS支持字符串和数字两种索引类型，并且可以同时支持
// 但同时支持时，数字索引的返回值必须是字符串索引返回值的子类型
class Animal {
    name: string
}
class Dog extends Animal {
    breed: string
}
// 以下是错误示例
// interface Mistake {
//     [x: number]: Animal;
//     [x: string]: Dog
// }

// 正确示例
interface Mistake {
    [x: number]: Animal; // 这里也可以是Dog
    [x: string]: Animal
}

// 字符串索引签名能够很好的描述dictionary模式
interface NumberDictionary {
    [index: string]: number; // 也可以添加readonly使得返回值只读
    length: number
    // name:string 这会引发错误
}

// 类类型的接口
// 作用：强制一个类去符合某种契约
// 只对公共的部分起作用，不会检查私有成员
interface CloackInterface {
    // new (hour:number, minute:number); //这里会引发以错误
    // 错误的根源在于TS不会对类的静态部分进行检查，constructor属于静态部分
    test: string
    currrentTime: Date;
    setTime(d: Date): void // 描述一个方法，在类里实现它
}
class Clock implements CloackInterface {
    // static test: string  //这里同样也会引发静态类型不检查的错误
    test: string
    currrentTime: Date;
    setTime(dd: Date): void {
        this.currrentTime = dd
    }
    constructor(h: number, m: number) { }
}
// 针对接口无法对静态类型提供检查，那么如何约束构造函数呢
interface ClockConstructor {
    new(hour: number, minute: number): Interface
}
interface Interface {
    tick();
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): Interface {
    // 因为这里要求传入的ctor必须是一个ClockConstructor
    // 所以约束了构造函数的类型
    return new ctor(hour, minute)
}
class DigitalClock implements Interface {
    constructor(h: number, m: number) { }
    tick() {
        console.log('shoot')
    }
}
let digital = createClock(DigitalClock, 12, 13)

//接口的继承(接口可以实现多继承)
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number
}
interface Squa extends Shape, PenStroke {
    sideLength: number
}

let sqa: Squa
// let sqa = <Squa> {} 这种方式也行，但是暂时不理解
sqa.color = 'blue'
sqa.sideLength = 10
sqa.penWidth = 20

//用接口实现混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void
}

function getCounter(): Counter {
    let counter = <Counter>function (s: number) { return } //这里还是不太理解
    counter.interval = 123;
    counter.reset = function () { }
    return counter
}
let c = getCounter()
c(10)
c.reset()
c.interval = 5

// 接口来继承类
class Control {
    private state: any
}
interface SelectControl extends Control {
    select(): void
}

class Button extends Control implements SelectControl {
    select(): void {

    }
}
// class image implements SelectControl {}
// 上面会出现错误，原因即如果某个接口继承了一个类，那么能实现这个接口的类必须是这个类或其子类


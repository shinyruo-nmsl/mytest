// 泛型的好处
function identity(arg: number): number {
    return arg
}
// 倘若传入的类型不确定，可以用any来代替
function identity2(arg: any): any {
    return arg
}
// 但是如果使用any就会丢失一部分信息：传入的类型与返回的类型应该是相同的
// 泛型登场了
// 泛型给identity3添加了变量T，以确保传入的类型与返回的类型相同
function identity3<T>(arg: T): T {
    return arg
}
let output = identity3<string>('my')
// let output = identity3('my') 这里也可以使用类型推论

// 使用泛型变量
function loggingIdentity<T>(arg: T): T {
    // console.log(arg.length) 这里会引发一个错误，因为T不一定有length属性
    return arg
}
// 但可以向下面这样使用
function loggingIdentity2<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}

//泛型类型和泛型接口

function animal<T>(a: T): T {
    return a
}
// 泛型类型变量
let horse: <T> (arg: T) => T = animal

// 泛型接口
interface IdentityFn {
    <T>(arg: T): T;
}

function bnimal<T>(a: T): T {
    return a
}

let duck: IdentityFn = bnimal

// 明确泛型接口类型的写法
interface IdentityFntype<T> {
    (a: T): T;
}

let bird: IdentityFntype<number> = bnimal

// 泛型类
class Knimal<T> {
    val: T;
    add: (x: T, y: T) => T
}
let ant = new Knimal<number>()
ant.val = 12
ant.add = function (x: number, y: number) { return x + y }
// 使用泛型类同样需要注意，泛型同样只对实例部分进行约束，对静态部分则不能约束

// 泛型约束

// 接着上面具有length属性的例子，更通用的方式如下
interface Lengthwise {
    length: number;
}
function logId<T extends Lengthwise>(a: T): T {
    console.log(a.length)
    return a
}

//在泛型约束中使用类类型
function create<T>(c: { new(): T; }): T {
    return new c()
}

// 使用原型属性推断并约束构造函数以类实例的关系
class BeeKeeper {
    hasMask: Boolean
}
class ZooKeeper {
    nametag: string
}
class Lnimal {
    numLegs: number
}
class Bee extends Lnimal {
    keeper: BeeKeeper
}
class Cow extends Lnimal {
    keeper: ZooKeeper
}

function createInstance<A extends Lnimal>(c: { new(): A }): A {
    return new c()
}

createInstance(Bee).keeper.hasMask
createInstance(Cow).keeper.nametag

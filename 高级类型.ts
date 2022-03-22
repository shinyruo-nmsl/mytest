// 交叉类型（混入类型）
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{}
    for (let id in first) {
        result[id] = first[id] as any
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id] as any
        }
    }
    return result
}
class Qerson {
    constructor(public name: string) { }
}

interface Logg {
    log(): void
}

class Consolelog implements Logg {
    log(): void {

    }
}

let jim = extend(new Qerson('jim'), new Consolelog)
let dick = jim.name
jim.log()

// 联合类型
// 联合类型表示一个值可以是几种类型之一,我们用竖线（ |）分隔每个类型.
// 所以 number | string | boolean表示一个值可以是 number， string，或 boolean。

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
    fly();
    layEggs()
}
interface Fish {
    swim();
    layEggs()
}

function getSmallPet(): Fish | Bird {
    let sth: Fish | Bird
    sth = {
        fly() { },
        layEggs() { }
    }
    return sth
}
let pet = getSmallPet()
pet.layEggs()
// pet.swim() 这一行代码会引发错误，因为我们不确定它是否含有swim


// 类型保护

// 用户自定义的类型保护,返回值是一个谓词
function isFish(pet: Fish | Bird): pet is Fish {
    // 配合断言
    return (pet as Fish).swim !== undefined
}

// typeof 保护
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// instacneof 保护
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(public numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(public value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder(): Padder {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    console.log(padder.numSpaces) // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    console.log(padder.value); // 类型细化为'StringPadder'
}

// 可以为null的类型
let s = 'foo'
s = null // 使用--strictNullChecks标记会引发错误，下面可以解决这个错误
let sn: string | null = 'bat'

function broken(name: string | null): string {
    function postfix(epithet: string) {
        //使用--strictNullChecks标记会引发错误
        return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    }
    name = name || "Bob";
    return postfix("great");
}

function fixed(name: string | null): string {
    function postfix(epithet: string) {
        // 解决办法
        return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
}

// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}

// 类型别名也可以是泛型
type Container<T> = { val: T }
// 也可以在类型别名的属性里引用自己,以二叉树为例
type Tree<T> = {
    val: T,
    left: Tree<T>,
    right: Tree<T>
}
// 与交叉类型的联合使用
type LinkedList<T> = T & { next: LinkedList<T> }
interface Person {
    name: string;
}

let people: LinkedList<Person>;
let sss = people.name;
sss = people.next.name;
sss = people.next.next.name;
sss = people.next.next.next.name;

// 接口vs类型别名
// 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。
// 因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。
//另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

//字符串字面量类型
// 字符串字面量类型允许你指定字符串必须的固定值。 
// 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。
// 通过结合使用这些特性，你可以实现类似枚举类型的字符串。

// 字符串字面量类型还可以用于区分函数重载：
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element | any {
    // ... code goes here ...
}

// 数字字面量类型
type oneSix = 1 | 2 | 3 | 4 | 5 | 6

// 枚举成员类型 之前已述

// 可辨识联合
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Thape = Square | Rectangle | Circle;

// 多态的this类型
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v = new ScientificCalculator(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();


// 索引类型

// 从对象中选出属性的子集
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}
interface Rerson {
    name:string,
    age:number
}
let person:Rerson = {
    name: 'jim',
    age:28
}
let strOrNum:(string | number) [] = pluck(person, ['name', 'age'])

// keyof T:索引类型查询操作符。对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合
let personProps: keyof Person //等价于 'name' | 'age'

// T[K]:索引访问操作符，只要确保 K extends keyof T即可正确使用，更加具有多态的特性
function getProperty<T, K extends keyof T>(o:T, name:K):T[K] {
    return o[name]
}
let mName: string = getProperty(person, 'name');
let myAge: number = getProperty(person, 'age');

// 索引类型和字符串索引签名
interface myMap<T> {
    [key:string]:T
}
let keys:keyof myMap<number> // string
let vlas:myMap<number>['foo'] // number 这里没看懂

// 映射类型 这一块完全不懂
type myKeys = 'op1' | 'op2'
type myFlags = {[k in myKeys]: boolean}
// 上面的等同于如下的硬编码
type Flags = {
    option1: boolean;
    option2: boolean;
}

// 预定义的有条件的类型
/**
 * TypeScript 2.8在lib.d.ts里增加了一些预定义的有条件类型：

Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。
 */
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
type T04 = NonNullable<string | number | undefined>;  // string | number
type T10 = ReturnType<() => string>;  // string
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T20 = InstanceType<typeof C>;  // C




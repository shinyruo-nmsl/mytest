//完整的书写一个函数类型
//函数类型只包含两部分：参数类型和返回值类型
//z作为外部变量，我们称函数'捕获'了该变量
//被捕获的变量不是函数的组成部分，我们可以称其为隐藏状态
let z: number
let myAdd: (x: number, y: number) => number =
    function (x: number, y: number): number { return x + y + z }

// 类型推断
let yourAdd: (x: number, y: number) => number =
    function (x, y): number { return x + y }

// 函数的参数

// 可选参数
// TS要求传入的参数的个数必须和期望的参数的个数是一致的
// 作为替代，我们可以使用？实现可选参数的功能，并要求可选参数跟在必须参数的后面
function bulidnNmae(firstName: string, lastName?: string): string {
    if (lastName) return firstName + '' + lastName
    return firstName
}
let instance1 = bulidnNmae('jim')
let instance2 = bulidnNmae('hu', 'jim')

// 默认参数
function culidnNmae(firstName: string = 'hu', lastName: string): string {
    return firstName + '' + lastName
}
let result1 = culidnNmae(undefined, 'jim') // 返回'hujim'
let result2 = culidnNmae('zz', 'jim') // 返回'zzjim'


// 剩余参数
function duildNmae(firstName: string, ...restNmaes: string[]) {
    return firstName + restNmaes.join(' ')
}

// this
// 对this的类型进行约束
interface Card {
    suit: string;
    card: number
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;//这里标识返回值是一个函数，该返回函数返回Card类型
}

let deck: Deck = {
    suits: ['a', 'b', 'c'],
    cards: Array(52),
    createCardPicker(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

//this参数在回调函数里
interface UIElment {
    // 设置this的类型为void代表回调函数的this不能是其他类型，即当做普通函数来调用
    addClickListener(onClick: (this: void, e: Event) => void): void
}

class Handler {
    info: string;
    onClick(this: Handler, e: Event) {
        this.info = e.type
    }
}

let uiElement: UIElment

// uiElement.addClickListener(new Handler().onClick) 这里由于this类型不兼容会引发错误
// 但是如果将onClick的this改为void，那么便不能使用this.info
// 使用箭头函数可以解决这个问题，因为箭头函数不会捕获this，所以总是可以把它传给期望this:void的函数
// 如下所示
class Jander {
    info: string;
    onClick = (e: Event) => {
        this.info = e.type
    }
}
uiElement.addClickListener(new Jander().onClick)

// 函数的重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds']
function pickCard(x: { suit: string; card: number }[]): number
function pickCard(x: number): { suit: string; card: number }
function pickCard(x): any {
    if (typeof x == 'object') {
        let pickedCard = Math.floor(Math.random() * x.length)
        return pickedCard
    }
    else if (typeof x == 'number') {
        let pickedSuit = Math.floor(x / 13)
        return { suit: suits[pickedSuit], card: x % 13 }
    }
}
let myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }]
let pickedCard1 = myDeck[pickCard(myDeck)]
let pickedCard2 = pickCard(15)
// 为了让编译器选择正确的检查类型，他会检查重载列表，尝试使用第一个重载定义
// 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
// function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。





// boolean/number/string/enum/数组/any/tuple/void/null/undefined/never/object
let isDone: boolean = false
let binary: number = 0b0100
let myName: string = `jim`
let intro: string = `my name is ${myName}`
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
let tuple: [string, number] = ['jim', 28]
enum Color { Red, Green, Blue }
let red: Color = Color.Red
console.log(red) // 显示0
let colorName = Color[2]
console.log(colorName) // 显示Blue

let noSure: any = 4
noSure.toFixed() // 正常
noSure = 'hello'
let prettySure: Object = 4
// prettySure.toFixed() 出错 Object类型的变量只允许你给它复制，但不能调用方法

let list3: any = [1, true, 'jim']
list3[0] = false

// Void与any相反，标识没有任何类型
function warmUser(): void { }
// 你只能给它赋值null或undefined
let unusavle: void = undefined || null

// null、undefined和never是所有类型的子类型
let u: undefined = undefined
binary = u

function err(message: string): never {
    throw new Error(message)
}
function loop(): never {
    while (true) {

    }
}

declare function create(o: object | null): void
create({ prop: 0 })




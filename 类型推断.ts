// 以下面的例子为开始
let x = [0, 1, null]
x = [1, null, 1]
// 这个例子告诉我们，类型推断会判断出类型为所有已有类型的并集，并与数字无关


// 以下的例子会将animals推断为（Dove | Chick)[]
class Pnimal {
    name: string
}
class Dove extends Pnimal {
    body: string
}
class Chick extends Pnimal {
}
let animals: Pnimal[] = [new Dove(), new Chick()]

// 来看我们之前的一个例子，因为结构类型不同，下面的例子会出错
// let dove:Dove = new Dove
// dove = new Pnimal()
// 但是如下就是正确的,说明类型推断只能从较少的结构去推断较多的结构，反之不行
let dove: Pnimal = new Dove
dove = new Chick





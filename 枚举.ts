//使用枚举我们可以定义一些有名字的常量
//TS支持基于数字或字符串的枚举
//在TypeScript中，枚举或枚举类型是具有一组恒定值的恒定长度的数据结构。
//这些常量值中的每一个都称为枚举的成员。在设置只能是一定数量的可能值的属性或值时，枚举很有用

//基于数字类型
enum CardinalDirection {
    North = 1,
    East,
    South,
    West,
};

//在js中，会被编译成下面的代码
/*
 "use strict";
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection[CardinalDirection["North"] = 1] = "North";
    CardinalDirection[CardinalDirection["East"] = 2] = "East";
    CardinalDirection[CardinalDirection["South"] = 3] = "South";
    CardinalDirection[CardinalDirection["West"] = 4] = "West";
})(CardinalDirection || (CardinalDirection = {}));
 */

//实际打印出来是这样
/*
{
  "1": "North",
  "2": "East",
  "3": "South",
  "4": "West",
  "North": 1,
  "East": 2,
  "South": 3,
  "West": 4
}
*/

//基于字符串类型
enum CardinalDirection {
    North = 'N',
    East = 'E',
    South = 'S',
    West = 'W',
};

//在js中，会被编译成下面的代码
/*
"use strict";
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection["North"] = "N";
    CardinalDirection["East"] = "E";
    CardinalDirection["South"] = "S";
    CardinalDirection["West"] = "W";
})(CardinalDirection || (CardinalDirection = {}));
*/

//在ts中使用枚举类型
enum Direction {
    North,
    East,
    South,
    West
};

let direction: Direction = Direction.North
direction = 1
// direction = false 这一条会引发错误，不能赋值给布尔类型

//注意以下的情况会出现错误
/*
let directions:Direction = {
    North:Direction.North,
    East:Direction.East,
    South:Direction.South,
    West:Direction.West
  };
*/
//正确的情况如下
let directions: typeof Direction = {
    North: Direction.North,
    East: Direction.East,
    South: Direction.South,
    West: Direction.West,
};
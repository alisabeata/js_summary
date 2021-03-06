// examples and questions

// — числа под главной диагональю матрицы
const arr = [
  [1,2,3,4],
  [5,6,7,8],
  [9,0,0,2],
  [3,4,5,8],
]

arr.forEach((cur, ind) => {
  cur.forEach((num, i) => {
  	if (i < ind) console.log(num)
  })
})

// or 

for (let i = 1; i < arr.length; i++) {
  for (let j = 0; j < i; j++) {
  	console.log(arr[ i ][ j ]);
  }
}


// - map и parseInt

[2, 2, 2, 2].map(parseInt);
// >>> [2, NaN, NaN, 2]

// объяснение
// 2 не существует в 2-й, 3-й системе счисления
// Если перед отриц значение, то это воспр как конвертация в 10-ую систему
[2, 2, 2, 2].map((cur, ind) => {
  return parseInt(cur, ind); 
});



// - bind

// возвращает функцию-обёртку с переданным контекстом
// самописный байнд (демонстрация механики)
function bind (callback, context) {
  return function () {
    return callback.apply(context, arguments); // arguments для передачи всех аргументов / return для возвр знач исполненой функции
  }
}


// - new
// если функция вызывается через new ( new fn ), то
// - созд новый объект с установкой this
// - функция возвращает этот this
// - устанавливается прототип


// - __proto__ и Prototype
// если св-ва нет в самом объекте, то оно ищется в __proto__ объекта (по цепочке - цепочка прототипов)
// __proto__ не исп напрямую в коде (не везде доступно, в целом плохой подход)
// Prototype это св-во функций
// Значением prototype может быть только объект
// св-во с  prototype можно указать на любом объекте, но смысл имеет если назначено функции-конструктору
// без вызова new ничего не делает, единственное назначение указывать __proto__ для новых объектов

// __proto__ тсп только для чтения

var obj = {a: 5, b: {c: 10}};
obj.__proto__ = {a: 10, b: {c: 20}};

console.log(obj) // >> {a: 5, b: {c: 10}}

delete obj.a
console.log(obj.a) // >> 10 (ищет в прототипе)

delete obj.a
console.log(obj.a) // >> 10 повторный delete так же ищет в прототипе (на прототип не действует)

delete obj.b
console.log(obj)   // >> {}
console.log(obj.b.c) // >> 20 (ищет в прототипе)

delete obj.b.c
console.log(obj.b.c) // >> undefined    потому что удалено собственное св-во объекта b


// - область видимости
// - лексическое окружение
// - скоуп
// всё это про область видимости самой функции

// - [[Scope]]
// - Внешнее лексическое окружение
// это св-во, которое ссылается на родительский скоуп (что и есть внешнее лексическое окружение)



// for...in и for...of
// оба производят обход объектов, разница в том как они это делают
// для for...in обход перечисляемых свойств объекта осуществляется в произвольном порядке
// для for...of обход происходит в соответствии с тем, какой порядок определен в итерируемом объекте
// for ... of и спред опратор преобразуют массив в итеррируемый (возвр после каждой итерации метод next() см. 33_iterators.js) автоматически


// - от чего зависит каким будет this в функции?
// от способа вызова, как вызвана
// если как обычная функция, то this - глобальный объект (window, global)
// если как метод объекта, то сам объект



// (!) функции-declaration всплывают
function foo() {
  function f() { return 10 }
  return f()
  function f() { return 7 }
}

foo() // >>> 7


// что выведет консоль
function fn() {
  console.log(this);
}
a.call(null); // >> window (null не меняет контекст)

function ffn(x) { return x * 2 }
var ffn
console.log(ffn) // >> function ffn(x) { return x * 2 }


// изменение св-в объектов при присвоении
var b = {};
var c;

b.b = 1;
c = b;  // b и c указывает на одну ячейка памяти
c.b = 2;

console.log(b.b) // >> 2
console.log(c.b) // >> 2


// вывести значение объекта (все способы)
function ff() { console.log(this.x) }
var obj = {x: 'val'};

ff.call(obj)
ff.apply(obj)
ff.bind(obj)()


// получить объект {width: 10, height: 20}
var arr = [
  {name: 'width', value: 10},
  {name: 'height', value: 20},
];

function toObject(arr) {
  var obj = {};
  
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i].name] = arr[i].value;
  }
  
  return obj;
}


// что выведет консоль
let s = 'foo';
const F = a => { // у функц своя область видимости, параметр просто копируется
  a = 'buzz';
}
F(s);
console.log(s); // >> foo


//
const o = { s: 'foo' };
const G = obj => {
  obj.s = 'buzz';
};
G(o);
console.log(o.s); // >> buzz


// максимальное число в массиве
const nums = [3, 7, -10, 0, 9, 11];

console.log(Math.max(...nums));

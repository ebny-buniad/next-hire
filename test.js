const numbers = [1, 2, 4, 5, 2, 2, 3, 7, 6];
let dup = [];
let num = []
numbers.map((number) => {
    if(!dup.includes(number)){
        dup.push(number)
    }else{
        num.push(number)
    }
})

console.log(dup)
console.log(num)
console.log('I love spicy!');

var arg = process.argv[2];
var total = 0

for(var i = 6; i < arg; i = i + 6){
    total = total + i;
}

var totalElements = arg/6;  
var sum = (totalElements * ( 6 + totalElements*6)) / 2; 

console.log(sum)
console.log(total);

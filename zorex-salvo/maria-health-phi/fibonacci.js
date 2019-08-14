const count = 10;
let prev = 0;
let next = 1;
let current;

for (var i = 0; i < count; i++) {
  if (prev % 3 === 0) {
    console.log('Maria');
  } else if (prev % 5 === 0) {
    console.log('Health');
  } else if (prev % 5 === 0 && prev % 3 === 0) {
    console.log('Maria Health');
  } else {
    console.log(prev);
  }
  current = prev + next;
  prev = next;
  next = current;
}

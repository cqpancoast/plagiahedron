let a = 5;
let b = 5;
let c = a+b;

console.log(c);

//any is like opting out of type checking for a variable
let myV: any = 'this is a string'

//Built-in types are built in to typescript
//number, string, boolean, void, null, and undefined
let num: number = 5;
let name: string = 'Sam';
let tf: boolean = true;

//User-defined types
//enum, class, interface, array, tuple

class Car {
  //fields
  model: String;
  doors: Number;
  isElectric: Boolean;

  constructor(model: String, doors: Number, isElectric: Boolean) {
    this.model = model;
    this.doors = doors;
    this.isElectric = isElectric;
  }

  displayMake(): void {
    console.log('This car is ${this.model}, has ${this.doors} doors and is ${isElectric} electric');
  }
}

//like java, use new for new object of a class
const Prius = new Car('Prius', 4, true);
Prius.displayMake();

const Car = {
  model: 'Prius',
  make: 'Toyota',
  display() => { console.log('hi'); }
}

//making interfaces
//interface fields use commas not semicolons
interface ICar {
  model: String,
  make: String,
  display(): void
}

const Car: ICar = {
  model: 'Prius',
  make: 'Toyota',
  display() => {console.log('hi');}
}
//Here, we’ve declared an interface called ICar ,
// and created an object Car. Car is now binding to the ICar interface,
// ensuring that the Car object defines all the properties which are in the interface.

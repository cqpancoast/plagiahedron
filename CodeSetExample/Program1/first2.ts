class Car {
  //fields
  model: String;
  doors: Number;
  isElectric: Boolean;

  constructor(m: String, d: Number, e: Boolean) {
    this.model = m;
    this.doors = d;
    this.isElectric = e;
  }

  displayMake(): void {
    console.log('This car is ${this.model}, has ${this.doors} doors and is ${isElectric} electric');
  }
}

//this is a different comment than the other doc
const Toyota = new Car('Toyota', 4, true);
Toyota.displayMake();

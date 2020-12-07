const msg1 = {title: undefined, message: undefined, id: undefined};
const msg2 = {title: undefined, message: undefined, id: undefined};
const msg3 = {title: undefined, message: undefined, id: undefined};
//if we wanted to add a property to these objects, we would have to update each individually

//classes can make that easier!
export class Message {
  title;
  message;
  id;
}

const msg4 = new Message();
const msg5 = new Message();

//old version of javascript
function Message1(title, message, id) {
  this.message = message;
  this.title = title;
  this.id = id;
}

const msg6 = new Message1('hi', 'world', 'ten');

//same class, now with types and a constructor
export class Message2 {
  title: string;
  message: string;
  isSent: boolean;

  constructor(title:string, message:string) {
    this.message = message;
    this.title = title;
    this.isSent = false; //always false upon construction
  }
}

const msg7 = new Message2('hello', ' how are you ');

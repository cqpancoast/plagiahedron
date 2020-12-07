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
function Message1(t, m, id) {
  this.message = me;
  this.t = t;
  this.id = id;
}

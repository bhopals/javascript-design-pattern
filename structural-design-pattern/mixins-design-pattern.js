let myMixins = {
 
    moveUp: function(){
      console.log( "move up" );
    },
   
    moveDown: function(){
      console.log( "move down" );
    },
   
    stop: function(){
      console.log( "stop! in the name of love!" );
    }
   
  };
  
  
  // A skeleton carAnimator constructor
  function CarAnimator(){
    this.moveLeft = function(){
      console.log( "move left" );
    };
  }
   
  // A skeleton personAnimator constructor
  function PersonAnimator(){
    this.moveRandomly = function(){ /*..*/ };
  }
   
  // Extend both constructors with our Mixin
  Object.assign(CarAnimator.prototype, myMixins );
  Object.assign(PersonAnimator.prototype, myMixins );
   
  // Create a new instance of carAnimator
  var myAnimator = new CarAnimator();
  myAnimator.moveLeft();
  myAnimator.moveDown();
  myAnimator.stop();
   
  // Outputs:
  // move left
  // move down
  // stop! in the name of love!



  ///OR

  class Car {
    constructor(doors, engine, color){
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
    print(){
        console.log(`This car is of ${this.color} color and has ${this.doors} doors with ${this.engine}`)
    }
}


let carMixins = {
    revEngine() {
        console.log(`The ${this.engine} is doing Vroom Vroom`);
    }
}
const civic = new Car(4, "V6", "Black");
console.log(civic);

//The Object.assign() method is used to copy the values of all enumerable own properties from one or more 
//source objects to a target object. It will return the target object
Object.assign(Car.prototype, carMixins);
console.log(civic.revEngine()); // The V6 is doing Vroom Vroom
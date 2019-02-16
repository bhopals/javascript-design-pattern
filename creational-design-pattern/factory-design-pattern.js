class BallFactory {
    constructor() {
      this.createBall = function(type) {
        let ball;
        if (type === 'football' || type === 'soccer') ball = new Football();
        else if (type === 'basketball') ball = new Basketball();
        ball.roll = function() {
          return `The ${this._type} is rolling.`;
        };
  
        return ball;
      };
    }
  }
  
  class Football {
    constructor() {
      this._type = 'football';
      this.kick = function() {
        return 'You kicked the football.';
      };
    }
  }
  
  class Basketball {
    constructor() {
      this._type = 'basketball';
      this.bounce = function() {
        return 'You bounced the basketball.';
      };
    }
  }
  
  // creating objects
  const factory = new BallFactory();
  
  const myFootball = factory.createBall('football');
  const myBasketball = factory.createBall('basketball');
  
  console.log(myFootball.roll()); // The football is rolling.
  console.log(myBasketball.roll()); // The basketball is rolling.
  console.log(myFootball.kick()); // You kicked the football.
  console.log(myBasketball.bounce()); // You bounced the basketball.



  //OR

  
class Car {
 constructor(doors, engine, color){
        this.color = color;
        this.doors = doors;
        this.engine = engine;
    }
}

class carFactory {
    createCar(type){
        switch(type){
            case 'civic':
                return new Car(4, "Civic", "Grey");
            case 'honda':
                return new Car(5, "Honda", "Black");
            default :
                return new Car(6, "Audi", "White");
        }
    }
}

const factoryObject = new carFactory();
let honda = factoryObject.createCar('honda');
let civic = factoryObject.createCar('civic');
let other = factoryObject.createCar('other');

console.log(honda); //Car {color: "Black", doors: 5, engine: "Honda"}
console.log(civic); //Car {color: "Grey", doors: 4, engine: "Civic"}
console.log(other); // Car {color: "White", doors: 6, engine: "Audi"}




## JavaScript Design Pattern ##


### An Overview of JavaScript Design Patterns ###

#### Design Pattern #### 
A general, reusable solution to a commonly occuring problem within a given context in Software Design. In other words, simply a way to resolve a common problem in code.


**Design Pattern Types**

    -   Creational  --> Create new things

    -   Structural  --> Structure your code

    -   Behavioural --> Use for behaviours in code


#### Function as first-class citizens #### 

It means when the function can be treated like a *variable*, meaning they can be passed as arguements to ther functions
as well or can be assigned as a value to a variable OR even returns as a function that means function is a first-class citizen.

```
//1. Assign a function to a variable
    let aNumber = () => {
        return 4*5;
    };
    console.log(aNumber);

//2. Pass a function as an Argumen
    function sayHello() {
        return "Hello, ";
    }
    function greeting(helloMessage, name) {
        console.log(helloMessage() + name);
    }
    // Pass `sayHello` as an argument to `greeting` function
    greeting(sayHello, "JavaScript!");

//3. Return a function
    function sayHello() {
        return function() {
            console.log("Hello!");
        }
    }

```

A function that returns a function is called a **Higher-Order Function**.



#### Callback ####
In a simplest term, a callback is a function that is called inside of another function. In other words,
whenever you pass a function in the arguments and run it inside this function, you are doing the callback pattern.

```
const calc = () => {
    return 4*8;
}

const printCalc = (callback) => {
    console.log(callback());
}

printCalc(calc);

```


### 1. Creational Design Patterns ###

As the name suggests, these patterns are for handling object creational mechanisms. A Creational Pattern basically solves a problem by controlling the creation process of an object.

We will discuss the following patterns in details — **Constructor Pattern, Factory Pattern, Prototype Pattern** and **Singleton Pattern**

**1. Prototype/Class Design Pattern**
This pattern is an object-based creational design pattern. In this, we use a sort of a “skeleton” of an existing object to create or instantiate new objects.

In short, this pattern allows us to define a blueprint for a specific type of item and then reuse it.

```
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

```
By using above class we can create as many prototype as we want.

```
const civic = new Car(4,"V6","Grey");
const lancer = new Car(6,"V2","Black");
```

Also, we can copy the proto to create another class by using Object.create method with additional properties.
```
const myCar = Object.create(Car, { owner: { value: 'John' } });
console.log(myCar.__proto__ === Car); // true
```


**2. Constructor Design Pattern**
This is a class-based creational design pattern. Constructors are special functions that can be used to instantiate new objects with methods and properties defined by that function.

```
 class Hero {
    constructor(name, specialAbility) {
      // setting property values
      this._name = name;
      this._specialAbility = specialAbility;
  
      // declaring a method on the object
      this.getDetails = function() {
        return `${this._name} can ${this._specialAbility}`;
      };
    }
  }

  class SuperHero extends Hero {
      constructor(name, specialAbility, rating){
          super(name, specialAbility);
          this.rating = rating;
      }

      // declaring a method on the object
     getMoreDetails () {
        return this.getDetails()+ ` and rating is ${this.rating}`;
      };

  }
  
  // creating new instances of Hero
  const IronMan = new Hero('Iron Man', 'fly');
  //console.log(IronMan.getDetails()); // Iron Man can fly


   // creating new instances of SupeHero
   const superHero = new SuperHero('Iron Man', 'fly', '9.0');
   console.log(superHero.getMoreDetails()); // Iron Man can fly and rating is 9.0

```


**3. Singleton Design Pattern**
This pattern simply preventing our class from simply creating more than one instance of the blueprint we deinfed.
In other words, the same way we used in above patterns, but only allowing a single instance of the class to be created.

It works like this — if no instance of the singleton class exists then a new instance is created and returned but if an instance already exists then the reference to the existing instance is returned.

```
class Car {

    constructor(doors, engine, color){
        if(!Car.instance){
            this.color = color;
            this.doors = doors;
            this.engine = engine;
            Car.instance = this;
        } else {
            return Car.instance;
        }
    }
  }

let civic = new Car(4, "V6", "Black"); // Car {color: "Black", doors: 4, engine: "V6"}
let cx5   = new Car(6, "V8",  "Grey"); // Car {color: "Black", doors: 4, engine: "V6"}

console.log("civic:",civic);
console.log("cx5:",cx5);
```

**4. Factory Design Pattern**
Factory Pattern is another class-based creational pattern. In this, we provide a generic interface that delegates the responsibility of object instantiation to its subclasses.


```
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

```


**5. Abstract Factory Design Pattern**

Creates an instance of several families of classes without detailing concrete classes.
The aim of this pattern is to  encapsulate a group of individual factories with a common goal. It separates the details of implementation of a set of objects from their general usage.

In other words, Factory of factory. A level up of the Factory desing pattern.

```
class Car {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}

class CarFactory {
    createCar(type) {
        switch(type) {
            case 'civic':
                return new Car(4, 'V6', 'grey')
            case 'honda':
                return new Car(2, 'V4', 'red')
        }
    }
}

class Suv {
    constructor(doors, engine, color) {
        this.doors = doors;
        this.engine = engine;
        this.color = color;
    }
}

class SuvFactory {
    createSuv(type) {
        switch(type) {
            case 'cx5':
                return new Car(4, 'V8', 'grey')
            case 'sante fe':
                return new Car(2, 'V4', 'red')
        }
    }
}

const carFactory = new CarFactory();
const suvFactory = new SuvFactory();

const autoManufacturer = (type, model) => {
    switch(type) {
        case 'car':
            return carFactory.createCar(model);
        case 'suv':
            return suvFactory.createSuv(model);
    }
}

const cx5 = autoManufacturer('suv', 'cx5');

console.log(cx5); //Car {doors: 4, engine: "V8", color: "grey"}

```

### 2. Structural Design Patterns ###

These patterns are concerned with class and object composition. They help structure or restructure one or more parts without affecting the entire system. In other words, they help obtain new functionalities without tampering with the existing ones.

We will discuss the following patterns in details — **Adapter Pattern, Composite Pattern, Decorator Pattern, Facade Pattern, Flyweight Pattern** and **Proxy Pattern**


**1. Module Desing Pattern**
The Module pattern was originally defined as a way to provide both private and public encapsulation for classes in conventional software engineering.

```
    var myObjectLiteral = {
    
        variableKey: variableValue,
    
        functionKey: function () {
        // ...
        }
    };

```

**2. Mixins Design Pattern**
Mixins are a great way to mix functions and instances after they have been created. In other words,
 you could use mixins to add interesting functions to the car class we created earlier.

 Mixins allow objects to borrow (or inherit) functionality from them with a minimal amount of complexity. As the pattern works well with JavaScripts object prototypes, it gives us a fairly flexible way to share functionality from not just one Mixin, but effectively many through multiple inheritance.

 ```
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


 ```


**3. Facade Design Pattern**
This is a structural design pattern that is widely used in the JavaScript libraries. It is used to provide a unified and simpler public facing interface for ease of use that shields away from the complexities of its consisting subsystems or subclasses.

The use of this pattern is very common in libraries like jQuery. ($(document).ready(..))
```
var module = (function() {
 
    var _private = {
        i: 5,
        get: function() {
            console.log( "current value:" + this.i);
        },
        set: function( val ) {
            this.i = val;
        },
        run: function() {
            console.log( "running" );
        },
        jump: function(){
            console.log( "jumping" );
        }
    };
 
    return {
 
        facade: function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());
 
 
// Outputs: "current value: 10" and "running"
module.facade( {run: true, val: 10} );
```



**4. Flyweight Design Pattern**


**2. Composite Design Pattern**


**3. Decorator Design Pattern**


**4. Facade Design Pattern**


**5. Flyweight Design Pattern**


**6. Proxy Design Pattern**





### 3. Behavioral Design Patterns ###

These patterns are concerned with improving communication between dissimilar objects.

We will discuss the following patterns in details — **Chain of Responsibility Pattern, Command Pattern, Iterator Pattern, Mediator Pattern, Observer Pattern, State Pattern, Strategy Pattern** and **Template Pattern**.



**1. Chain of Responsibility Design Pattern**



**2. Command Design Pattern**



**3. Iterator Design Pattern**



**4. Mediator Design Pattern**



**5. Observer Design Pattern**



**6. State Design Pattern**



**7. Strategy Design Pattern**



**8. Template Design Pattern**

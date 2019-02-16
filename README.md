

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

**3. Factory Design Pattern**

### 2. Structural Design Patterns ###

These patterns are concerned with class and object composition. They help structure or restructure one or more parts without affecting the entire system. In other words, they help obtain new functionalities without tampering with the existing ones.

We will discuss the following patterns in details — **Adapter Pattern, Composite Pattern, Decorator Pattern, Facade Pattern, Flyweight Pattern** and **Proxy Pattern**




### 3. Behavioral Design Patterns ###

These patterns are concerned with improving communication between dissimilar objects.

We will discuss the following patterns in details — **Chain of Responsibility Pattern, Command Pattern, Iterator Pattern, Mediator Pattern, Observer Pattern, State Pattern, Strategy Pattern** and **Template Pattern**.
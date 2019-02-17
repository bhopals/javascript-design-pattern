

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

This is a structural design pattern focused on efficient data sharing through fine-grained objects. It is used for efficiency and memory conservation purposes.
This pattern can be used for any kind of caching purposes. In fact, modern browsers use a variant of flyweight pattern to prevent loading same images twice.
```
// flyweight class
class Icecream {
    constructor(flavour, price) {
      this.flavour = flavour;
      this.price = price;
    }
  }
  
  // factory for flyweight objects
  class IcecreamFactory {
    constructor() {
      this._icecreams = [];
    }
  
    createIcecream(flavour, price) {
      let icecream = this.getIcecream(flavour);
      if (icecream) {
        return icecream;
      } else {
        const newIcecream = new Icecream(flavour, price);
        this._icecreams.push(newIcecream);
        return newIcecream;
      }
    }
  
    getIcecream(flavour) {
      return this._icecreams.find(icecream => icecream.flavour === flavour);
    }
  }
  
  // usage
  const factory = new IcecreamFactory();
  
  const chocoVanilla = factory.createIcecream('chocolate and vanilla', 15);
  const vanillaChoco = factory.createIcecream('chocolate and vanilla', 15);
  
  // reference to the same object
  console.log(chocoVanilla === vanillaChoco); // true
```


**5. Decorator Design Pattern**

This is also a structural design pattern that focuses on the ability to add behaviour or functionalities to existing classes dynamically. It is another viable alternative to sub-classing.

The decorator type behaviour is very easy to implement in JavaScript because JavaScript allows us to add methods and properties to object dynamically. The simplest approach would be to just add a property to an object but it will not be efficiently reusable.

```
class Book {
  constructor(title, author, price) {
    this._title = title;
    this._author = author;
    this.price = price;
  }

  getDetails() {
    return `${this._title} by ${this._author}`;
  }
}

// decorator 1
function giftWrap(book) {
  book.isGiftWrapped = true;
  book.unwrap = function() {
    return `Unwrapped ${book.getDetails()}`;
  };

  return book;
}

// decorator 2
function hardbindBook(book) {
  book.isHardbound = true;
  book.price += 5;
  return book;
}

// usage
const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));

console.log(alchemist.isGiftWrapped); // true
console.log(alchemist.unwrap()); // 'Unwrapped The Alchemist by Paulo Coelho'

const inferno = hardbindBook(new Book('Inferno', 'Dan Brown', 15));

console.log(inferno.isHardbound); // true
console.log(inferno.price); // 20
```

This pattern has been widely used in many Javascript Frameworks such as Angular ( @Componenet Annotation) 


**6. Model-View-Controller (MVC) Pattern**
MVC is an architectural design pattern that encourages improved application organization through a separation of concerns. It enforces the isolation of business data (Models) from user interfaces (Views), with a third component (Controllers) traditionally managing logic and user-input. 

MODEL ---->    CONTROLLER

 ^
 |
 |

VIEW  ---->    CONTROLLER


** View has the access of both MODEL and CONTROLLER 
example : Angular, React

**7. Model-View-Presenter (MVP) Pattern**
Model-view-presenter (MVP) is a derivative of the MVC design pattern which focuses on improving presentation logic. 

MODEL <------> PRESENTER  <------>  VIEW

** View does not have the direct access to the Model Object
Example : Backbone, Android


**MVP or MVC?**
MVP is generally used most often in enterprise-level applications where it's necessary to reuse as much presentation logic as possible. Applications with very complex views and a great deal of user interaction may find that MVC doesn't quite fit the bill here as solving this problem may mean heavily relying on multiple controllers. In MVP, all of this complex logic can be encapsulated in a presenter, which can simplify maintenance greatly.

As MVP views are defined through an interface and the interface is technically the only point of contact between the system and the view (other than a presenter), this pattern also allows developers to write presentation logic without needing to wait for designers to produce layouts and graphics for the application.


**8. Model-View-ViewModel (MVVM) Pattern**
MVVM (Model View ViewModel) is an architectural pattern based on MVC and MVP, which attempts to more clearly separate the development of user-interfaces (UI) from that of the business logic and behavior in an application

Sometimes also referred as MVVC model (Model-View View Controller)


MODEL <------> ViewModel (stateful component)  <------>  View (stateless visual)

Example : React (Stateful and Stateless component), Angular





### 3. Behavioral Design Patterns ###

These patterns are concerned with improving communication between dissimilar objects.

We will discuss the following patterns in details — **Chain of Responsibility Pattern, Command Pattern, Iterator Pattern, Mediator Pattern, Observer Pattern, State Pattern, Strategy Pattern** and **Template Pattern**.



**1. Observer Design Pattern**
It is a crucial behavioural design pattern that defines one-to-many dependencies between objects so that when one object (publisher) changes its state, all the other dependent objects (subscribers) are notified and updated automatically. This is also called PubSub (Publisher/Subscribers) or Event Dispatcher/Listeners Pattern. The Publisher is sometimes called Subject and the Subscribers are sometimes called Observers.


```
class Subject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => observer !== obs);
  }

  fire(change) {
    this._observers.forEach(observer => {
      observer.update(change);
    });
  }
}

class Observer {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }

  update(change) {
    let state = this.state;
    switch (change) {
      case 'INC':
        this.state = ++state;
        break;
      case 'DEC':
        this.state = --state;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

// usage
const sub = new Subject();

const obs1 = new Observer(1);
const obs2 = new Observer(19);

sub.subscribe(obs1);
sub.subscribe(obs2);

sub.fire('INC');

console.log(obs1.state); // 2
console.log(obs2.state); // 20
```

Example  - MeteorJs

Another example is JQUERY
```
// Equivalent to subscribe(topicName, callback)
$( document ).on( "topicName", function () {
    //..perform some behaviour
});
```




**2. State Design Pattern**
It is a behavioural design pattern that allows an object to alter its behaviour based on changes to its internal state. The object returned by a State pattern class seems to change its class. It provides state-specific logic to a limited set of objects in which each object type represents a particular state.

Example : Angular, React, or any State Management Library 

**3. Chain of Responsibility Design Pattern**
This is a behavioural design pattern that provides a chain of loosely coupled objects. Each of these objects can choose to act on or handle the request of the client.

A good example of the chain of responsibility pattern is the event bubbling in DOM in which an event propagates through a series of nested DOM elements, one of which may have an “event listener” attached to listen and act on the event.

```
class CumulativeSum {
  constructor(intialValue = 0) {
    this.sum = intialValue;
  }

  add(value) {
    this.sum += value;
    return this;
  }
}

// usage
const sum1 = new CumulativeSum();
console.log(sum1.add(10).add(2).add(50).sum); // 62


const sum2 = new CumulativeSum(10);
console.log(sum2.add(10).add(20).add(5).sum); // 45
```

Another basic example is shopping website. Once user click on **Add to cart**, then **Checkout Page** followed by **Payment**, and then **Order Confirmation**.

So here one action result in the input for next action which are tightly chained.

This is a common pattern that can be seen in jQuery as well where almost any method call on a jQuery object returns a jQuery object so that method calls can be chained together.


**4. Iterator Design Pattern**
The Iterator is a design pattern where iterators (objects that allow us to traverse through all the elements of a collection) access the elements of an aggregate object sequentially without needing to expose its underlying form.

In the case of jQuery's jQuery.fn.each() iterator, we are actually able to use the underlying code behind jQuery.each() to iterate through a collection, without needing to see or understand the code working behind the scenes providing this capability.

```
$.each( ["john","dave","rick","julian"], function( index, value ) {
  console.log( index + ": " + value);
});
 
$( "li" ).each( function ( index ) {
  console.log( index + ": " + $( this ).text());
});

```

If we see the underlying implementation of **Each** in JQuery

```
each: function( object, callback, args ) {
  var name, i = 0,
    length = object.length,
    isObj = length === undefined || jQuery.isFunction( object );
 
  if ( args ) {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.apply( object[ name ], args ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.apply( object[ i++ ], args ) === false ) {
          break;
        }
      }
    }
 
  // A special, fast, case for the most common use of each
  } else {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
          break;
        }
      }
    }
  }
 
  return object;
};
```


**5. Strategy Design Pattern**
It is a behavioural design pattern that allows encapsulation of alternative algorithms for a particular task. It defines a family of algorithms and encapsulates them in such a way that they are interchangeable at runtime without client interference or knowledge.


In the example below, we create a class Commute for encapsulating all the possible strategies for commuting to work. Then, we define three strategies namely Bus, PersonalCar and Taxi. Using this pattern we can swap the implementation to use for the travel method of the Commute object at runtime.

```
/ encapsulation
class Commute {
  travel(transport) {
    return transport.travelTime();
  }
}

class Vehicle {
  travelTime() {
    return this._timeTaken;
  }
}

// strategy 1
class Bus extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 10;
  }
}

// strategy 2
class Taxi extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 5;
  }
}

// strategy 3
class PersonalCar extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 3;
  }
}

// usage
const commute = new Commute();

console.log(commute.travel(new Taxi())); // 5
console.log(commute.travel(new Bus())); // 10
```



**6. Memento Design Pattern**
A temporary state of your data retaining the info while being converted from one format to another.

Mostly while serialization or deserialization of the object.
(Object to XML/JSOn  OR JSON/XML to Object )


**7. Mediator Design Pattern**
It is a behavioural design pattern that encapsulates how a set of object interact with each other. It provides the central authority over a group of objects by promoting loose coupling by keeping objects from referring to each other explicitly.

This is also known as Publish/Subscribe or Event Aggregation

```
class TrafficTower {
  constructor() {
    this._airplanes = [];
  }

  register(airplane) {
    this._airplanes.push(airplane);
    airplane.register(this);
  }

  requestCoordinates(airplane) {
    return this._airplanes.filter(plane => airplane !== plane).map(plane => plane.coordinates);
  }
}

class Airplane {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.trafficTower = null;
  }

  register(trafficTower) {
    this.trafficTower = trafficTower;
  }

  requestCoordinates() {
    if (this.trafficTower) return this.trafficTower.requestCoordinates(this);
    return null;
  }
}

// usage
const tower = new TrafficTower();

const airplanes = [new Airplane(10), new Airplane(20), new Airplane(30)];
airplanes.forEach(airplane => {
  tower.register(airplane);
});

console.log(airplanes.map(airplane => airplane.requestCoordinates())) 
```


**8. Command Design Pattern**
This is a behavioural design pattern that aims to encapsulate actions or operations as objects. This pattern allows loose coupling of systems and classes by separating the objects that request an operation or invoke a method from the ones that execute or process the actual implementation.

```
class SpecialMath {
  constructor(num) {
    this._num = num;
  }

  square() {
    return this._num ** 2;
  }

  cube() {
    return this._num ** 3;
  }

  squareRoot() {
    return Math.sqrt(this._num);
  }
}


class Command {
  constructor(subject) {
    this._subject = subject;
    this.commandsExecuted = [];
  }
  execute(command) {
    this.commandsExecuted.push(command);
    return this._subject[command]();
  }
}

// usage
const x = new Command(new SpecialMath(5));
x.execute('square');
x.execute('cube');

console.log(x.commandsExecuted); // ['square', 'cube']
```
Example - Redux (Action and Reducer)
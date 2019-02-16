class Database {
    constructor(data) {
      if (Database.exists) {
        return Database.instance;
      }
      this._data = data;
      Database.instance = this;
      Database.exists = true;
      return this;
    }
  
    getData() {
      return this._data;
    }
  
    setData(data) {
      this._data = data;
    }
  }
  
  // usage
  const mongo = new Database('mongo');
  console.log(mongo.getData()); // mongo
  
  const mysql = new Database('mysql');
  console.log(mysql.getData()); // mongo



  //OR

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
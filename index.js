// seeders

var wishList = [{
    id: 856,
    price: 229990,
    name: "SAMSUNG GALAXY A51 128GB"
  },
  {
    id: 365,
    price: 869990,
    name: "HP PAVILION GAMING 15-DK1022LA"
  },
  {
    id: 432,
    price: 149990,
    name: "ASPIRADORA ROBOT"
  }
];

var suggested = {
  id: 937,
  price: 269990,
  name: "LED AOC 50\" 50U6295 4K"
};

// Inventory

var stock = [{
    id: 856,
    stock: 1,
  },
  {
    id: 365,
    stock: 4,
  },
  {
    id: 432,
    stock: 6
  },
  {
    id: 937,
    stock: 2
  }
];

// prices

var prices = [{
    id: 856,
    price: 229990,
  },
  {
    id: 365,
    price: 869990,
  },
  {
    id: 432,
    price: 149990,
  },
  {
    id: 937,
    price: 269990,
  }
]


////////////////////////////
// main:

class Car {
  constructor(items = []) {
    this.items = items;
  }

  addCar(item) {
    this.items.push(item);                              // Se agrega el nuevo item al carro.
    this.items = orderPrice(this.items);                // Se envia el arreglo de items a funcion para ordenar por precio
    return this.items;
  }

  static checkout(car) {
  	var total = 0;
    var noStock = [];
  	car.forEach((productCar, index) => {
    	stock.forEach( (product, index) => {
      	if(productCar.id == product.id && productCar.quantity > product.stock) {               // Condicion para obtener items con falta de stock
        	noStock = noStock.concat(car.splice(index, 1));                                      // Se quita item con stock insuficiente del carro y se guarda en arreglo 'noStock'
        }
      });
    });
    car.forEach(element => {
    	if(element.price < 150000) {                                                             // Condicion para obtener items con precio menor a 150000
      	element.price = element.price * 0.97;                                                  // Se actualiza el precio a valor correspondiente al 97% que es el total menos el 3% de descuento
        element.priceTotal = element.price * element.quantity;                                 // Se agrega propiedad precio total a objeto de cada item con descuento dentro del carro
        total = total + element.priceTotal;                                                    // Se suma precio total de items con descuento a precio total final.
      } else {
      	element.priceTotal = element.price * element.quantity;                                 // Se agrega propiedad precio total a objeto de cada item dentro del carro
        total = total + element.priceTotal;                                                    // Se suma precio total de items SIN descuento a precio total final.
      }
    });
    
    total = total + Math.round(total * 0.19);                                                  // Se agrega el 19% del impuesto del precio total al precio total y se realiza aproximacion.
    
   console.log("Los Siguientes productos no poseen el stock suficiente");
   console.log(noStock);                                                                       // Se muestra por consola productos con stock insuficiente
   console.log("Gracias por comprar y ser parte de la experiencia, el monto a pagar es: " + total);                    // Se muestra por consola mensaje de y total de compra
  }
}

function main() {
	var items = [];
  wishList.forEach( element => {                       // Se agregan cantidades a wishList
  	if(element.id == 365) {
    	element.quantity = 4;
      items.push(element);
    }
    else if(element.id == 856) {
    	element.quantity = 5;
      items.push(element);
    }
    else if(element.id == 432) {
    	element.quantity = 7;
      items.push(element);
    }
  });
  items = orderPrice(items);
	car = new Car(items);                               // Se instancia la clase
  suggested.quantity = 1;                             // Se agrega cantidad al item sugerido
  car = car.addCar(suggested);                        // Se agrega item sugerido al carrito de compras
  console.log(car);                                   // Se muestra por consola carro de compras ordenado por precio
  Car.checkout(car);                                  // Se llama a funcion checkout enviando el objeto de Carro 'car' para generar los calculos
}

function orderPrice(items) {                          // Funcion para ordenar por precio de menor a mayor
	items.sort( (a, b) => a.price - b.price);
  return items;
}

window.onload = main();
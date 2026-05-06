const args = process.argv.slice(2);

//argumentos
const [method, url, title, price, category] = args;
const route = url?.split("/")[0];
const article = url?.split("/")[1];

//console.log(method, url, title, price, category);

class Product {
    constructor (title, price, category){
        this.title = title;
        this.price = price;
        this.category = category;
    }
}

switch(method){
    case "GET":
        //si no me consulta por una articulo en especifico le devuelvo todos los productos
        if (route === "products" && !article){
            await fetch('https://fakestoreapi.com/products', {
                method: "GET"
            }
            )
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error));
        }
        //valido si el usuario me está consultando por un producto específico
        else if (route === "products" && !isNaN(article)){   //Con la función isNan verifico si el segundo argumento es un número   
            await fetch(`https://fakestoreapi.com/products/${article}`, {
                method: "GET"
            }
            )
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error));
        }
        else {
            console.error("Argumento faltante o no válido.");
            return;
        }

    break;

    case "POST":

            //Primero valido si todos los argumentos que necesito estan completos y son validos, sino informo un error.
            if(route!= "products" || !title || !price || !category){
                console.error("Argumentos faltantes o no válidos.");
                return;
            }
            
            const new_product = new Product(title, price, category);

            await fetch("https://fakestoreapi.com/products",{
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(new_product)
                }
            )
            .then(response => response.json())
            .then(data => console.log(data));
    break;

    case "DELETE":

            //Primero valido si todos los argumentos que necesito estan completos y son validos, sino informo un error.
            if(route!= "products" || isNaN(article)){
                console.error("Argumentos faltantes o no válidos.");
                return;
            }
            
            await fetch(`https://fakestoreapi.com/products/${article}`,{
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => console.log(data));
    break;
    default:
            console.error("La operación no es válida.");
            return;
    break;
}

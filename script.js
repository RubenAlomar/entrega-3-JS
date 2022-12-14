
class Pizza {
    constructor(id, nombre, ingredientes, precio){  
        this.id = id;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
    }
};


const Pizzas = [
    new Pizza(1, 'Especial', ['salsa','jamon','mozzarella','huevos','pimientos rojos'],'1500'),
    new Pizza(2, 'Fugazzeta', ['salsa','aceitunas','cebolla','queso'],'1300'),
    new Pizza(3, 'Calabresa', ['salsa','calabresa','mozzarella','orégano'],'1500'),
    new Pizza(4, 'Muzzarella', ['salsa','jamón','aceitunas','mozzarella'],'1200'),
    new Pizza(5, 'Rucula', ['salsa', 'parmesano','rucula','aceitunas'],'1450'),
    new Pizza(6, 'Carioca', ['salsa','anana','cerezas','queso','azucar negro'],'1350')
];


const inputNumber = document.getElementById("number");
const button = document.getElementById("consult-button");
const cardContainer = document.querySelector(".card-container");


const pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];

const saveLocalStorage = pizz => {
    localStorage.setItem('pizzas', JSON.stringify(pizz));
};


const showPizza = () => {
    const valor = inputNumber.value.trim();
    const pizza = Pizzas.filter((e) => e.id == valor);
    
    if(!valor.length) {
        alert("Por favor ingrese un valor");
        return
    } else if (!pizza.length) {
        showError(inputNumber,"No ingresó una pizza disponible");
        inputNumber.value = "";
        renderPizza("");
        saveLocalStorage([]);
        return
    } else {
        showSuccess(inputNumber);
    };
    
    inputNumber.value = "";
    renderPizza(pizza);
    saveLocalStorage(pizza);
};


const showError = (input,message) => {
    const pizzasContainer = input.parentElement;
    const error = pizzasContainer.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const pizzasContainer = input.parentElement;
    const error = pizzasContainer.querySelector("small");
    error.textContent = "";
};

const renderPizza = (pizza) => {
    if (pizza.length) {
        const nombre = pizza.map((e) => e.nombre);
        const ingredientes = pizza.map((e) => e.ingredientes);
        const precio = pizza.map((e) => e.precio);

        cardContainer.innerHTML = `
        <h2 class="pizza-nombre">${nombre}</h2>
        <img class="pizza-imagen" src="./imagenes/${nombre.toString().toLowerCase()}.jpg" alt="pizza">
        <div class="pizza-info">
        <ul class="pizza-ingredientes"><strong>Ingredientes:</strong> ${renderIngredientes(ingredientes)}</ul>
        <p class="pizza-precio"><strong>Precio:</strong> $${precio},00</p>
        </div>`
    } else if (pizza === "") {
        cardContainer.innerHTML = `
        <img class="pizza-imagen-err" src="./imagenes/not.jpg" alt="pizza">`
    };
};

const renderIngredientes = (ingredientes) => {
    return ingredientes[0].map((i) => `<li>- ${i}</li>`).join("");
};

const init = () => {
    renderPizza(pizzas);
    button.addEventListener("click", showPizza);
};

init();
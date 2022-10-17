const verProductos = document.querySelector(".ver-productos");
const bolsa = document.querySelector(".bolsa");
let listaDeCompras= JSON.parse(localStorage.getItem("listaCompra")) ?? [];
crearLista();

verProductos.addEventListener("click", () => {
  if (bolsa.classList.contains("hide")) {
    bolsa.classList.remove("hide");
    verProductos.classList.add("mover-derecha-des");
  }else {
    bolsa.classList.add("hide");
    verProductos.classList.remove("mover-derecha-des");
  }
})


addEventListener ("click", (parametro) => {
  if (parametro.target.classList.contains("btn")) {
    const nuevaImagen = parametro.target.parentElement.firstElementChild.outerHTML;
    const nuevoNombre = parametro.target.parentElement.childNodes[3].textContent;
    const nuevoPrecio = parametro.target.parentElement.childNodes[5].textContent;
    const contador = 1;
    
    comprobarLista(nuevaImagen, nuevoNombre, nuevoPrecio, contador)
  }
  if (parametro.target.classList.contains("btn-sum1")){
    sumar1(parametro.target.getAttribute("id"));
  }else if (parametro.target.classList.contains("btn-rest1")){
    restar1(parametro.target.getAttribute("id"));
  }else if (parametro.target.classList.contains("btn-trash")){
    borrar(parametro.target.getAttribute("id"));
  }
  crearLista();
  localStorage.setItem("listaCompra", JSON.stringify(listaDeCompras));
})

function crearLista() {
  const elements = listaDeCompras.map((cart) => {
    let price1;
    price1 = Number(cart.priceProduct.replace("$" , ""))*cart.amountCart;

    return  `
    <div class="contenedor-product">
      <div class="product-in-cart">
      ${cart.imageProduct}
      </div>
        <div class="title-list">
          <h3>${cart.nameProduct}</h3>
          <p><span>${cart.priceProduct}</span><span>$${price1}</span></p>
          <p class="stock">${cart.stock}</p>
        </div>
        <div class="btn-lista">
          <img id="${cart.nameProduct}" class="btn-sum1" src="./iconos/plus-small.svg">
          <p>${cart.amountCart}</p>
          <img id="${cart.nameProduct}" class="btn-rest1" src="./iconos/minus-small.svg">
        </div>
        <div class="remo"><img id="${cart.nameProduct}" class="btn-trash" src="./iconos/trash.svg"></div>
    </div> 
  ` 
})
  bolsa.innerHTML = elements;

  let total = 0
  listaDeCompras.forEach((element) => total += Number(element.priceProduct.replace("$",""))*element.amountCart);    
  const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a Pagar: ${total} $`;
    bolsa.append(totalBuying);
 

  
}





function comprobarLista (...a) {
  let boolean = true;
  if(listaDeCompras.length > 0) {
    for (let i of listaDeCompras) {
      if (i.nameProduct === a[1] && i.amountCart < i.stock) {
        i.amountCart++;
        boolean = false;
      }if (i.nameProduct===a[1]) {
        boolean = false
      }
    }
  }
  let stock = 10
  if (boolean) {
    listaDeCompras.push({imageProduct:a[0],nameProduct:a[1],priceProduct:a[2],amountCart:a[3],stock });
  }
}



function sumar1(e) {
  const sum = listaDeCompras.findIndex((cart1)=> cart1.nameProduct === e);
    if (listaDeCompras[sum].amountCart < listaDeCompras[sum].stock ){
      listaDeCompras[sum].amountCart++;
  }
  //listaDeCompras[sum].amountCart++;
}

function restar1(e) {
  const rest = listaDeCompras.findIndex((cart1)=> cart1.nameProduct === e);
  if (listaDeCompras[rest].amountCart > 1) {
    listaDeCompras[rest].amountCart--;
  }
}

function borrar (e) {
  const newArray = listaDeCompras.filter((cart1)=> cart1.nameProduct !== e);
  listaDeCompras = [...newArray];
}











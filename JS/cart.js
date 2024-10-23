const cart = document.querySelector('#cart')
const AddCart = 'AddToCart'
let maap = {}

window.onload = () => {
    const param = new URLSearchParams(window.location.search)
    const ProductsUrl = param.get('product')
    BringData(ProductsUrl)
}

const IncrQuantity = (element, obj) => {
    //local storage quantity of product, enter obj in local storage
    //change quantity element innerText
    //also change in maap, but not so much necesssary
    console.log(obj)
    if (maap[obj.id] == obj.stock) alert('Product Stock Limit Reached')
    let a = JSON.parse(localStorage.getItem(AddCart)) ?? [];
    a.push(obj)
    localStorage.setItem(AddCart, JSON.stringify(a))
    maap[obj.id]++;
    element.innerText = `Quantity: ${maap[obj.id]}`;
}

const DecrQuantity = (element, obj, dv) => {

    let a = JSON.parse(localStorage.getItem(AddCart)) ?? [];
    for (let i = 0; i < a.length; i++) {
        if (a[i].id == obj.id) {
            a.splice(i, 1);
            i--;
            break;
        }
    }
    localStorage.setItem(AddCart, JSON.stringify(a))
    maap[obj.id]--;
    if (maap[obj.id] == 0) dv.remove()
    element.innerText = `Quantity: ${maap[obj.id]}`;
}

async function BringData(ProductsUrl) {
    let data = await fetch(ProductsUrl);
    data = await data.json();
    ShowCart(data.products)
}
const RemoveFromCart = (id, dv) => {
    dv.remove();
    let a = JSON.parse(localStorage.getItem(AddCart)) ?? [];
    a = a.filter((item) => {
        return item.id != id;
    })
    localStorage.setItem(AddCart, JSON.stringify(a));
}
const SendToProductPage = (obj) => {
    window.location.href = `product.html?item=${JSON.stringify(obj)}`
}
function AddToCartDom(obj, frequency) {
    const echPrd = document.createElement('div');
    echPrd.setAttribute('class', 'child')
    const title = document.createElement('span')
    const img = document.createElement('img');
    img.src = `${obj.images[0]}`
    img.addEventListener('click', () => SendToProductPage(obj))
    title.innerText = obj.title;
    const p = document.createElement('p')
    p.innerText = `${obj.price} $`
    const butMin = document.createElement('button');
    butMin.innerText = '-';
    butMin.addEventListener('click', () => DecrQuantity(quantity, obj, echPrd))//------------------pending
    const quantity = document.createElement('p')
    quantity.innerText = `Quantity: ${frequency}`;
    const butPls = document.createElement('button');
    butPls.innerText = '+';
    butPls.addEventListener('click', () => IncrQuantity(quantity, obj))///----------------pending
    const remove = document.createElement('button')
    remove.addEventListener('click', () => RemoveFromCart(obj.id, echPrd));
    remove.innerText = 'remove'
    remove.setAttribute('class', 'remove')
    echPrd.append(img, title, p, butMin, quantity, butPls, remove);
    cart.append(echPrd)
}

function ForCartAddDom(objId, frequency, products) {
    products.forEach((item) => {//here we can improve search complexity to optimize 
        if (item.id == objId)
            AddToCartDom(item, frequency);
    })
}

function ShowCart(products) {
    console.log(products)
    let a = JSON.parse(localStorage.getItem(AddCart)) ?? [];
    a.forEach((item) => {
        if (maap[item.id])
            maap[item.id]++;
        else maap[item.id] = 1;
    })
    for (let i in maap) {
        ForCartAddDom(i, maap[i], products);
    }
}
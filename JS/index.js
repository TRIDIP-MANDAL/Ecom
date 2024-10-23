const ProductsUrl = '../JSON/products.json';
const AddCart = 'AddToCart';
const div = document.querySelector('#container')
function ShowCart() {
    window.location.href = `cart.html?product=${ProductsUrl}`
}

function SendToNextPageForEachProduct(obj) {
    window.location.href = `product.html?item=${encodeURIComponent(JSON.stringify(obj))}`
}

function AddToDom(data) {
    const innerDv = document.createElement('div');
    innerDv.setAttribute('class', 'child')
    const img = document.createElement('img');
   // img.addEventListener('click', () => SendToNextPageForEachProduct(data))
    innerDv.addEventListener('click', () => SendToNextPageForEachProduct(data))
    img.src = `${data.images[0]}`
    const detail = document.createElement('button');
    const price = document.createElement('p')
    price.innerText = `${data.price} $`;
    detail.innerText = "details";
    detail.setAttribute('class', 'detail')
    const buy = document.createElement('button')
    buy.setAttribute('id', `buy${data.id}`)
    buy.addEventListener('click', (e) => {
        let arr = JSON.parse(localStorage.getItem(AddCart)) ?? []
        arr.push(data);
        localStorage.setItem(AddCart, JSON.stringify(arr))
        // arr = [];
         e.stopPropagation()
    })
    buy.innerText = 'Add to Cart'
    buy.setAttribute('class', 'buy')
    const h6 = document.createElement('h6');
    h6.innerText = data.title;
    innerDv.append(img, h6, price, detail, buy)
    div.append(innerDv);

}

function LoadProd(arr, j) {
    //method 1
    //    for(let i=j;i<arr.length && i < (j+6);i++){
    //     AddToDom(arr[i]);
    //    }
    //method 2
    arr.slice(j, j + 6).forEach((item) => {
        AddToDom(item)
    })

    //method 3
    //   let cnt=0;
    // arr.every((item)=>{//every is same like forEach
    //     if(++cnt==6) return false;
    //     AddToDom(item)
    //     return true;
    // })

    if (j + 6 < arr.length) {
        const btn = document.createElement('button')
        btn.innerText = "Load More"
        div.append(btn)
        btn.addEventListener('click', () => {
            btn.remove();
            LoadProd(arr, j + 6);
        })
    }
}
async function BringData() {
    let data = await fetch(ProductsUrl);
    data = await data.json();
    let arr = data.products


    document.querySelector('#Search').addEventListener('keyup', (e) => {
        let z = e.target.value;
        console.log(z)
        arr = arr.filter((item) => {
            return item.title.substring(0, z.length).toLocaleLowerCase() == z.toLocaleLowerCase();
        })
        console.log(arr)
        document.querySelectorAll('div.child').forEach((item) => {//Removed from DOM
            item.remove();
        })
        LoadProd(arr, 0)
    })
    LoadProd(arr, 0);
}
window.onload = BringData;

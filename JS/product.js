function SetValues(data) {
    const img = document.querySelector('img');
    console.log(data)
    img.src = data.images[0]
    const title = document.querySelector('h3')
    title.innerText = `Title: ${data.title}`
    const Rating = document.querySelector('h6')
    Rating.innerText = `Rating:${data.rating} *`
    const Price = document.querySelector('h2')
    Price.innerText = `Price: ${data.price} $`
    const details = document.querySelector('p')
    details.innerText = `Description: ${data.description}`

}
window.onload = () => {
    const param = new URLSearchParams(window.location.search)
    const data = JSON.parse(decodeURIComponent(param.get('item')))//decode ur

    console.log(data)
    SetValues(data)

}
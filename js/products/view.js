export const elements = {
    productsContainer: document.querySelector(`#products-container`)
}

export function renderProductsHTML(arrayProducts){

    arrayProducts.forEach((item)=>{
        let productHTML = 
        `<div class="card-item__wrapper">
            <div class="card-item" data-id="${item.id}">
                <div class="card-item__img-wrapper">
                    <img class="card-item__img" src="img/${item.imgSrc}" alt="">
                </div>
                <h3 class="card-item__title">${item.name}</h3>
                <div class="card-item__info">
                    <p class="card-item__info-set">${item.itemsInBox} шт.</p>
                    <div class="card-item__parameters">
                        <div class="card-item__currents">
                            <div class="card-item__control control-minus" data-action="minus">-</div>
                            <div class="card-item__current" data-counter="">1</div>
                            <div class="card-item__control control-plus" data-action="plus">+</div>
                        </div>  
                        <div class="card-item__ch-cs">
                            <p class="card-item__ch-cs-weight">${item.weight}г.</p>
                            <p class="card-item__ch-cs-price">${item.price} ₽</p>
                        </div>
                    </div>
                    <button class="card-item__btn" data-action="add-to-cart">+ в корзину</button>
                </div>
            </div>
        </div>`

        elements.productsContainer.insertAdjacentHTML(`beforeend`, productHTML)
    })
}

export function updateCouter(product, cardProduct){
    let counter = cardProduct.querySelector(`[data-counter]`)
    counter.textContent = product.counter
}


export const elements = {
    cartProductsContainer: document.querySelector(`.cart__cards`),
    emptyBadge: document.querySelector(`[data-cart-empty]`),
    orderForm: document.querySelector(`.cart__form`),
    totalPrice: document.querySelector(`[data-cart-price]`)
    
}

export function renderCart(cart){

    let cartHTML = ``

    cart.forEach((item)=>{
        let cartItemHTML = 
        `<div class="card-cart" data-id="${item.id}">
            <div class="card-cart__img-wrapper">
                <img class="card-cart__img" src="img/${item.imgSrc}" alt="img">
            </div>
            <div class="card-cart__info">
                <p class="card-cart__name">${item.name}</p>
                <div class="card-cart__ch-cs">
                    <span class="card-cart__set">${item.itemsInBox} шт.</span> /
                    <span class="card-cart__weight">${item.weight}г.</span>
                </div>
                <div class="card-cart__parameters">
                    <div class="card-cart__currents">
                        <div class="card-cart__control control-minus" data-action="minus">-</div>
                        <div class="card-cart__current" data-counter="">${item.counter}</div>
                        <div class="card-cart__control control-plus" data-action="plus">+</div>
                    </div>  
                    <div class="card-cart__price">${item.price} ₽</div>                                  
                </div>
            </div>
        </div>`

        cartHTML = cartHTML + cartItemHTML
        elements.cartProductsContainer.innerHTML = cartHTML
    })
}

function toggleViewCart(){
if(elements.cartProductsContainer.children.length === 0){
    elements.emptyBadge.classList.remove(`none`)
    elements.orderForm.classList.add(`none`)
}
else{
    elements.emptyBadge.classList.add(`none`)
    elements.orderForm.classList.remove(`none`)
}
}

export function recalculationPrice(cart){

    let totalPrice = 0

    cart.forEach((item)=>{
        totalPrice = totalPrice + (item.price * item.counter)
    })
        
    elements.totalPrice.textContent = `${new Intl.NumberFormat().format(totalPrice)} ₽`

    toggleViewCart()
}

export function updateCounter(product, cardProduct){

    let counter = cardProduct.querySelector(`[data-counter]`)

    counter.textContent = product.counter

    product.counter === 0 ? cardProduct.remove() : null
}

export function printResultOfPhoneVerif(response, input){
    if(response === false){
        input.classList.add(`input--error`)
    }
    else{
        input.value = ``
        input.classList.remove(`input--error`)
    }
}

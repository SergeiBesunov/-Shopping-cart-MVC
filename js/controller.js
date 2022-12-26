import ProductModel from './products/model.js'
import CartModel from './cart/model.js'

import * as productView from './products/view.js'
import * as cartView from './cart/view.js'

let productModel = new ProductModel()
let cartModel = new CartModel()

getDataAndRenderHTML()


async function getDataAndRenderHTML(){
    await productModel.getDataJSON()
    productView.renderProductsHTML(productModel.products)

    cartView.renderCart(cartModel.cart)
    cartView.recalculationPrice(cartModel.cart)
}


productView.elements.productsContainer.addEventListener(`click`,(event)=>{
    event.preventDefault()
    let {target} = event
    let action = target.dataset.action

    if(action === `minus` || action === `plus`){
        const cardProduct = target.closest(`.card-item`)
        const productId = +cardProduct.dataset.id
        let product = productModel.updateCouter(productId, action)

        productView.updateCouter(product, cardProduct)
    }

    if(action === `add-to-cart`){
        const cardProduct = target.closest(`.card-item`)
        const productId = +cardProduct.dataset.id
        let product = productModel.returnProductForCart(productId)
    
        cartModel.addProductToCart(product)
        cartView.renderCart(cartModel.cart)
        cartView.recalculationPrice(cartModel.cart)
        productModel.resetCounter(productId)
        productView.updateCouter(product, cardProduct)
    }
})


cartView.elements.cartProductsContainer.addEventListener(`click`,(event)=>{
    event.preventDefault()
    let {target} = event
    let action = target.dataset.action
    
    if(action === `plus` || action === `minus`){
        const cardCartProduct = target.closest(`.card-cart`)
        const productId = +cardCartProduct.dataset.id
        let product = cartModel.updateCounter(productId, action)
        
        cartView.updateCounter(product, cardCartProduct)
        cartView.recalculationPrice(cartModel.cart)
    }
})


cartView.elements.orderForm.addEventListener(`submit`,(event)=>{
    event.preventDefault()
    let {target} = event

    const phoneInput = target.phone
    const phoneValue = phoneInput.value

    let phoneVerifResponse = cartModel.phoneValidation(phoneValue)
    cartView.printResultOfPhoneVerif(phoneVerifResponse, phoneInput)
    let dataToSend = cartModel.generateFormData(phoneValue, phoneVerifResponse)
    
    alert(dataToSend)
})

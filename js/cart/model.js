export default class Model{
    constructor(){
        this.cart = []
        this.getCartFromLocalStorage()
    }

    getCartFromLocalStorage(){
        let data = localStorage.getItem(`dataCart`)

        data ? this.cart = JSON.parse(data) : null       
    }

    addProductToCart(product){
        let newProduct = JSON.parse(JSON.stringify(product))
        
        let checkProduct = this.cart.find((item)=> item.id === newProduct.id)

        checkProduct ? checkProduct.counter = checkProduct.counter + newProduct.counter : this.cart.push(newProduct)

        this.saveCartLocalStorage()
    }

    updateCounter(id, action){
        let product = this.cart.find((item)=> item.id === id)

        if(action === `plus`){
            ++product.counter
        }
        if(action === `minus` && product.counter > 0){
            --product.counter
        }
        if(action === `minus` && product.counter === 0){
            let index =  this.cart.findIndex((item)=> item.id === id)
            this.cart.splice(index, 1)
        }
        this.saveCartLocalStorage()
        return product
    }

    saveCartLocalStorage(){
        localStorage.setItem(`dataCart`, JSON.stringify(this.cart))
    }

    
    phoneValidation(value){
        let check = true

        let array = value.split(``)
            array.forEach((item)=>{
            if(Number(item) != item || item == ` `){
                check = false
            }
            })
        
        if(value.length != 11){
            check = false
        }
    
        if(!value.startsWith(`8`)){
            check = false
        }
        
    
        console.log(`Телефон ${check}`)
        return check
    }

    generateFormData(phone, response){

        if(response === true){
            let dataToSend = []
            let totalPrice = 0
            
            this.cart.forEach((item)=>{
                let obj = {
                    name: item.name,
                    counter:item.counter,
                    totalPrice: item.counter * item.price,
                    totalWeight: item.counter * item.weight,
                }
                dataToSend.push(obj)
    
                totalPrice = totalPrice + (item.price * item.counter)
            })
    
            let additionalData = {
                phone: phone,
                totalPrice: totalPrice,
            }
    
            dataToSend.unshift(additionalData)
    
            dataToSend = JSON.stringify(dataToSend)
    
            return dataToSend
        }
        else{
            return `номер телефона введен некорректно`
        }
    }
}
export default class Model{
    constructor(){
        this.products = []
    }

    async getDataJSON(){
        let response =  await fetch(`./js/products.json`)
        this.products = await response.json()

        for(let i = 1; i <= this.products.length; i++){
            this.products[i-1].id = i
            this.products[i-1].counter = 1
        }
    }

    updateCouter(id, action){
        let product = this.products.find((item)=> item.id === id)

        action === `plus` ? ++product.counter : null

        action === `minus` && product.counter > 1 ? --product.counter : null

        return product
    }

    returnProductForCart(id){
        let product = this.products.find((item)=> item.id === id)
        return product
    }

    resetCounter(id){
        let product = this.products.find((item)=> item.id === id)
        product.counter = 1
    }
}









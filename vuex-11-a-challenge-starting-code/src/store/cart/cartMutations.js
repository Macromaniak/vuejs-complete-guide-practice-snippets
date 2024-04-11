const cartMutations = {
    addItemtoCart(state, payload) {
        if(payload.item) {
            let newItem = payload.item;
            newItem.qty = 1;
            let existing = state.cart.items.find( item => item.id == payload.item.id)
            if(existing)
            {
                let index = state.cart.items.findIndex( item => item.id == existing.id);
                if(index != -1)
                state.cart.items[index].qty++;
            }
            else
            state.cart.items.push(newItem);

            state.cart.qty++;
            state.cart.total+= payload.item.price;
        }

    },
    removeItemFromCart(state, payload) {
        if(payload.itemId) {
            let newList = state.cart.items.filter(function(item){
                return item.id != payload.itemId;
            });
            let removedItemIndex = state.cart.items.findIndex(function(item){
                return item.id == payload.itemId;
            });
            let removedItemPrice = state.cart.items[removedItemIndex].price * state.cart.items[removedItemIndex].qty;
            let removedItemQty = state.cart.items[removedItemIndex].qty;
            state.cart.items = newList;
            state.cart.qty-= removedItemQty;
            state.cart.total = state.cart.total - removedItemPrice;
        }
    }
}

export default cartMutations;
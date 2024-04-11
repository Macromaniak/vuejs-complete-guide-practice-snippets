const cartGetters = {
  getCartItems(state) {
    return state.cart.items;
  },
  getCartTotal(state) {
    let total = 0;
    state.cart.items.forEach(function (item) {
      total += item.price;
    });
    return total.toFixed(2);
  },
  getTotalCartAmount(state) {
    return state.cart.total.toFixed(2);
  },
  getCartTotalQty(state) {
    return state.cart.qty;
  },
};

export default cartGetters;
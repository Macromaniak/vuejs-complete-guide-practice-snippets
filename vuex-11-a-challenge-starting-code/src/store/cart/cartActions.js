const cartActions = {
  addItem(context, payload) {
    context.commit('addItemtoCart', payload);
  },
  removeItem(context, payload) {
    context.commit('removeItemFromCart', payload);
  },
};
 export default cartActions;
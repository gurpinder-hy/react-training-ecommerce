import {
    CLEAR_CART,
    UPDATE_CART_ITEM,
    UPDATE_CART_ITEM_QUANTITY,
    LOGIN,
    LOGOUT,
    SIGN_UP
} from './cart.actions';

export const cartReducer = (state = { items: [], user: null, users: [] }, action) => {
    switch (action.type) {
        case CLEAR_CART:
            return { ...state, items: [] };
        case UPDATE_CART_ITEM:
            const item = action.item;
            if (item && item.quantity > 0) {
                const index = state.items.findIndex(it => it.product.id === item.product.id);
                const newItems = [...state.items];
                if (index !== -1) {
                    newItems[index] = { ...item };
                    return { ...state, items: newItems };
                } else {
                    newItems.push({ ...item });
                }
                return { ...state, items: newItems };
            } else {
                const items = state.items.filter(it => it.product.id !== item.product.id);
                return { ...state, items };
            }

        case UPDATE_CART_ITEM_QUANTITY:
            const quantity = action.quantity;
            const product = action.product;

            if (quantity === 0) {
                const items = state.items.filter(it => it.product.id !== product.id);
                return { ...state, items };
            } else {
                const index = state.items.findIndex(it => it.product.id === product.id);
                if (index !== -1) {
                    const newItems = [...state.items];
                    const item = { ...state.items[index], quantity };
                    newItems[index] = { ...item };
                    return { ...state, items: newItems };
                }
            }
            return state;
        case LOGOUT:
            return { ...state, user: null };
        case SIGN_UP:
            const signUpUser = action.user;
            const newUsers = []
            newUsers.push(signUpUser)
            return { ...state, user: signUpUser, users: newUsers };
        case LOGIN:
            const login_user = action.user;
            const index = state.users.findIndex(it => it.email === login_user.email);
            if (index > -1) {
                if (state.users[index].password == login_user.password) {
                    return { ...state, user: state.users[index] };
                } else {
                    return { ...state }
                }
            } else {
                return { ...state }
            }
        default:
            return state;
    }
};
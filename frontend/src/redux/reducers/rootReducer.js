import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import homePageReducer from "./homePageReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import promoReducer from "./promoReducer";
import feedReducer from "./feedReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  homePageReducer: homePageReducer,
  promoReducer: promoReducer,
  feedReducer: feedReducer,
  orderReducer: orderReducer,
});

export default rootReducer;

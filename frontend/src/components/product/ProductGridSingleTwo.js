import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice, promoPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  // const discountedPrice = promoPrice(product, promo);
  const finalProductPrice = +(product.price * currency.currencyRate);
  // const finalDiscountedPrice = +(
  //   discountedPrice * currency.currencyRate
  // );

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
        >
          <div className="product-img">
            <img
                className=""
                src={process.env.PUBLIC_URL + product.image}
                alt=""
              />

            <div className="product-action-2">
              <button
                  onClick={() => addToCart(product, addToast)}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "В корзине" : "Добавить в корзину"
                  }
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </button>

              <button onClick={() => setModalShow(true)} title="Быстрый просмотр">
                <i className="fa fa-eye"></i>
              </button>

            </div>
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <h4>
                {product.title}
              </h4>
              <div className="price-2">
                <span>{finalProductPrice} р.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        // discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        // finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object
};

export default ProductGridSingleTwo;

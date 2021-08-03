import React, {Fragment, useState} from "react";

import {useToasts} from "react-toast-notifications";


import {connect} from "react-redux"

import {addToCart} from "../../redux/actions/cartActions";

import {getFormattedPrice} from "../../helpers/phone"

const HomeTestBouquet = ({item, addToCart}) => {

  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [quantityCount, setQuantityCount] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState("");





  const {addToast} = useToasts();



  return (
    <Fragment>

      <div className="product-content-2 d-flex justify-content-between">
                  <div className="pt-4">
                    <h4>{`${item.title} за ${getFormattedPrice(item.price)}р.`}</h4>
                  </div>
                  <div className='slider-content-3 mt-15 text-right'>
                    <div className="slider-btn btn-hover"
                      // onClick={() => console.log(subscription, quantityCount, selectedProductColor, selectedProductSize)}>
                         onClick={() =>
                           addToCart(
                             {
                               id: item.code + '-' + item.id,
                               title: item.title,
                               code: item.code,
                               image: item.image,
                               price: item.price,
                               variation: [
                                 {
                                   size: [
                                     {
                                       name: "M"
                                     }
                                   ]
                                 }
                               ]
                             },
                             addToast,
                             quantityCount,
                             selectedProductColor,
                             selectedProductSize
                           )
                         }
                    >
                      <a
                        className="animated p-3"
                        style={{zIndex: '2'}}
                      >{item.button}</a>
                    </div>
                  </div>

                </div>

    </Fragment>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(HomeTestBouquet);

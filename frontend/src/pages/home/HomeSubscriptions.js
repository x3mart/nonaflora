import React, {Fragment, useEffect, useRef, useState} from "react";

import Lightbox from 'react-image-lightbox';
import {useToasts} from "react-toast-notifications";

import {connect} from "react-redux"

import {addToCart} from "../../redux/actions/cartActions";

import {getFormattedPrice, isEmptyObject} from "../../helpers/phone"

const HomeSubscriptions = ({item, item_id, addToCart}) => {


  useEffect(() => {
    if (!isEmptyObject(item)) {
      const l = item.sets.length - 1
      setId(item.sets[l].code)
      setSize(item.sets[l].set_size)
      setSelectedProductSize(item.sets[l].set_size)
      setImage(item.sets[l].images.length > 0 ? item.sets[l].images[0].image : '')
      setPrice(item.sets[l].price)
      setCode(item.sets[l].code)
      setTitle(item.sets[l].title)
    }
  }, [])


  const [SetModal, setSetModal] = useState({
    isOpen: false,
    image: null
  })

  const [image, setImage] = useState(null)
  const [size, setSize] = useState('')
  const [price, setPrice] = useState()
  const [subscription, setSubscription] = useState({})
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [quantityCount, setQuantityCount] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [id, setId] = useState(3)
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')


  const {addToast} = useToasts();


  useEffect(() => {
    setSubscription({
      id: id,
      title: title,
      image: image,
      price: price,
      code: code,
      variation: `${size === "S" ? [{size: [{name: "S"}]}] : size === "M" ? [{size: [{name: "M"}]}] : size === "L" ? [{size: [{name: "L"}]}] : ""}`,
    })
  }, [size, price, image, title, code])

  const handleSize = (item) => {
    setId(item.code)
    setTitle(item.title)
    setCode(item.code)
    setImage(item.images.length > 0 ? item.images[0].image : '')
    setSelectedProductSize(item.set_size)
    setSize(item.set_size)
    setPrice(item.price)
    setQuantityCount(1)
  }


  return (
    <Fragment>

      {SetModal.isOpen && (
        <Lightbox
          mainSrc={SetModal.image}
          onCloseRequest={() => setSetModal({isOpen: false, image: null})}
        />
      )}

      <div>
        <div className="w-100">
          <h3>
            {item.title}
          </h3>
          <h4>
            {item.subtitle}
          </h4>
        </div>

        {item.sets.map((set, set_id) => (
          <div key={set_id} className={`four-column ${size === set.set_size ? 'row' : 'd-none'}`}>

            {set.images.length > 0 && set.images.map((image, image_id) => (
              <div key={image_id} className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
                <div className="product-wrap-2 mb-25  ">
                  <div className="product-img"><img src={image.image} alt=""/>
                    {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                    {/*  className="purple">New</span></div>*/}
                    <div className="product-action-2">

                      <button title="Quick View"
                              onClick={() => setSetModal({isOpen: true, image: image.image})}><i
                        className="fa fa-eye"/></button>

                    </div>
                  </div>

                </div>
              </div>
            ))}


          </div>
        ))}


        <div className={`product-content-2 d-flex ${item.sets.length > 1 ? 'justify-content-between' : 'justify-content-end'}`}>
          {item.sets.length > 1 &&
            <div className="title-price-wrap-2 ">
            <div className="d-none d-md-block">
              <h3>Выберите подходящий размер:</h3>
            </div>
            <div className="d-block d-md-none" style={{fontSize: 16, lineHeight: 20, fontWeight: '300'}}>
              <h5>Выберите подходящий размер:</h5>
            </div>
            <div className='slider-content-3 mt-15 d-flex'>

              {item.sets.map((set, set_id) => (
                <div key={set_id}
                     className='d-flex justify-content-center align-items-center mr-2 slider-btn btn-hover'>
                  <a
                    className={`animated ${size === set.set_size ? 'active-button' : ''}`}
                    style={{width: 50, height: 50, padding: '16px 19px', zIndex: '2'}}
                    onClick={() => handleSize(set)}>{set.set_size}</a>
                </div>

              ))}


            </div>
          </div>
          }
          <div>
            {price > 0 &&
            <div className="price-2 d-none d-md-block"><span style={{
              fontSize: 30,
              fontWeight: '100'
            }}>{getFormattedPrice(price)} р.</span>
            </div>
            }

            {price > 0 &&

            <div className="price-2 d-block d-md-none"><span style={{
              fontSize: 25,
              fontWeight: '100'
            }}>{getFormattedPrice(price)} р.</span>
            </div>
            }

            <div className='slider-content-3 mt-15 text-right'>
              <div className="slider-btn btn-hover"
                // onClick={() => console.log(subscription, quantityCount, selectedProductColor, selectedProductSize)}>
                   onClick={() =>
                     addToCart(
                       subscription,
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
        </div>


      </div>
      <hr className="my-5"/>

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

export default connect(null, mapDispatchToProps)(HomeSubscriptions);

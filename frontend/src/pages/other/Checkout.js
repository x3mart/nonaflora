import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import MetaTags from "react-meta-tags";
import {connect} from "react-redux";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {checkPromo, checkPromoDiscount, getDiscountPrice, promoNames, promoPrice} from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {getFormattedPrice, isEmptyObject} from "../../helpers/phone";
import {get_promo} from "../../redux/actions/promoActions"
import {send_order} from "../../redux/actions/orderActions"
import m1 from "../../assets/img/m1.jpg";
import {addToCart} from "../../redux/actions/cartActions";
import {useToasts} from "react-toast-notifications";

const Checkout = (props) => {
  const {location, cartItems, currency, get_promo, promo_set, send_order, order_status, addToCart} = props
  const {pathname} = location;
  let cartTotalPrice = 0;

  const [customGood, setCustomGood] = useState('')
  const [customPrice, setCustomPrice] = useState(0)
  const [customQuantity, setCustomQuantity] = useState(0)
  const [customCode, setCustomCode] = useState("")
  const [customCart, setCustomCart] = useState({})
  const [deliveryOption, setDeliveryOption] = useState(true)
  const [selectedProductColor, setSelectedProductColor] = useState("")
  const [selectedProductSize, setSelectedProductSize] = useState("")

  const [cartItemsNames, setCartItemsNames] = useState([])
  const [promoItemsNames, setPromoItemsNames] = useState([])

  const [goods, setGoods] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otherName, setOtherName] = useState('')
  const [otherPhone, setOtherPhone] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [other, setOther] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [morning, setMorning] = useState(false)
  const [lunch, setLunch] = useState(false)
  const [afternoon, setAfternoon] = useState(false)
  const [evening, setEvening] = useState(false)
  const [night, setNight] = useState(false)
  const [comment, setComment] = useState('')
  const [promo, setPromo] = useState('')
  const [promoSet, setPromoSet] = useState({})
  const [err, setErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [otherPhoneErr, setOtherPhoneErr] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const {addToast} = useToasts()
  const regPhone = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/
  const regEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm

  console.log(deliveryOption)

  const formSuccess = () => {
    setErr(false)
    handlePayment()
  }
  const formError = () => {
    setErr(true)
  }
  const handlePromo = () => {
    get_promo(promo)
  }
  const handlePayment = () => {
    setRedirect(true)
    let delivery_day = wednesday ? "Среда" : thursday ? "Четверг" : ""
    let delivery_time = morning ? "8-11" : lunch ? "11-14" : afternoon ? "14-17" : evening ? "17-20" : night ? "20-23" : ""
    send_order(goods, delivery_day, delivery_time, cartTotalPrice, name, email, phone, otherName, otherPhone, address, comment, promo)
    get_promo('')
  }

  useEffect(() => {
    let str = ''
    if (props.location.search) {
      if (props.location.search[0] === '?') {
        str = decodeURI(props.location.search.substring(1))
      }
      let arr = str.split('&')
      arr.map(item => {
        let ar = item.split("=")
        if (ar[0] === "goods") {
          setCustomGood(ar[1])
        } else if (ar[0] === "price") {
          setCustomPrice(ar[1])
        } else if (ar[0] === "quantity") {
          setCustomQuantity(ar[1])
        } else if (ar[0] === "code") {
          setCustomCode(ar[1])
        } else if (ar[0] === "delivery_option") {
          if(ar[1] === "0") {
            setDeliveryOption(false)
          } else if(ar[1] === "1") {
            setDeliveryOption(true)
          }
          console.log(ar[1])
          console.log(typeof(ar[1]))
        }
      })
    }
  }, [props.location.search])

  useEffect(() => {
    setCustomCart({
      title: customGood,
      price: customPrice,
      quantity: customQuantity,
      code: customCode
    })
  }, [customGood, customPrice, customQuantity])


  useEffect(() => {
    if (!isEmptyObject(customCart) && customCart.title && customCart.code && customCart.price && customCart.quantity) {
      addToCart(
        {
          id: 2001,
          title: customCart.title,
          code: customCart.code,
          image: m1,
          price: customCart.price,
          variation: [
            {
              size: []
            }
          ]
        },
        addToast,
        customCart.quantity,
        selectedProductColor,
        selectedProductSize
      )
      setCustomCart({})
      if(!deliveryOption) {
        window.location = "/checkout?delivery_option=0"
      } else {
        window.location = "/checkout"
      }
    }
  }, [customCart])
  useEffect(() => {
    setPhoneErr(!regPhone.test(phone))
  }, [phone])
  useEffect(() => {
    setOtherPhoneErr(!regPhone.test(otherPhone))
  }, [otherPhone])
  useEffect(() => {
    setEmailErr(!regEmail.test(email))
  }, [email])
  useEffect(() => {
    if (order_status && order_status.payment_url && redirect) {
      setRedirect(false)
      window.location = order_status.payment_url
    }
  })
  useEffect(() => {
    let arr = []
    for (let i = 0; i < cartItems.length; i++) {
      let obj = {
        name: cartItems[i].title,
        price: promoSet.discount && promoPrice(cartItems[i], promoSet) !== null ? promoPrice(cartItems[i], promoSet) : cartItems[i].price,
        quantity: cartItems[i].quantity,
        code: cartItems[i].code,
      }
      arr.push(obj)
    }
    setGoods(arr)
  }, [cartItems, promoSet])

  useEffect(() => {
    if (promo_set) {
      setPromoSet(promo_set)
      setPromo(promo_set.promo)
    }
  }, [promo_set])


  return (
    <Fragment>
      <MetaTags>
        <title>Нонночка&Флорочка | Оформление заказа</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Оформление заказа
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb/>
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {
              cartItems && cartItems.length >= 1 ? (
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="billing-info-wrap">
                        <h3>Оформление заказа</h3>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label className={err && !name ? "text-danger" : ""}>Имя</label>
                              <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label className={err && phoneErr ? "text-danger" : ""}>Телефон</label>
                              <input
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label className={err && emailErr ? "text-danger" : ""}>Email</label>
                              <input
                                className="billing-address"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Другому человеку</label>
                              <input
                                className="checkbox"
                                type="checkbox"
                                onChange={(e) => setOther(e.target.checked)}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="row"
                          style={{display: other ? "flex" : "none"}}
                        >
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Имя</label>
                              <input
                                type="text"
                                onChange={(e) => setOtherName(e.target.value)}
                                value={otherName}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label className={err && otherPhoneErr ? "text-danger" : ""}>Телефон</label>
                              <input
                                type="text"
                                onChange={(e) => setOtherPhone(e.target.value)}
                                value={otherPhone}
                              />
                            </div>
                          </div>
                        </div>

                        {deliveryOption &&
                        <Fragment>
                          <div className="additional-info-wrap">
                            <h4>Интервал и адрес доставки</h4>
                            <div className="row">
                              <div
                                className="col-lg-6"
                              >
                                <div
                                  className="billing-info mb-20"
                                  style={{display: thursday ? "none" : "block"}}
                                >
                                  <label className={err && !wednesday ? "text-danger" : ""}>По средам</label>
                                  <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={wednesday}
                                    onChange={(e) => setWednesday(e.target.checked)}
                                  />
                                </div>
                              </div>
                              <div
                                className="col-lg-6"
                              >
                                <div
                                  className="billing-info mb-20"
                                  style={{display: wednesday ? "none" : "block"}}
                                >
                                  <label className={err && !thursday ? "text-danger" : ""}>По четвергам</label>
                                  <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={thursday}
                                    onChange={(e) => setThursday(e.target.checked)}
                                  />
                                </div>
                              </div>
                            </div>

                          </div>
                          <div
                            className="row"
                            style={{display: wednesday || thursday ? "flex" : "none"}}
                          >
                            <div className="col-lg-2">
                              <div className="billing-info mb-20">
                                <label
                                  className={err && (!morning && !lunch && !afternoon && !evening && !night) ? "text-danger" : ""}>8-11</label>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  checked={morning}
                                  onChange={(e) => setMorning(e.target.checked)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="billing-info mb-20">
                                <label
                                  className={err && (!morning && !lunch && !afternoon && !evening && !night) ? "text-danger" : ""}>11-14</label>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  checked={lunch}
                                  onChange={(e) => setLunch(e.target.checked)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="billing-info mb-20">
                                <label
                                  className={err && (!morning && !lunch && !afternoon && !evening && !night) ? "text-danger" : ""}>14-17</label>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  checked={afternoon}
                                  onChange={(e) => setAfternoon(e.target.checked)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="billing-info mb-20">
                                <label
                                  className={err && (!morning && !lunch && !afternoon && !evening && !night) ? "text-danger" : ""}>17-20</label>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  checked={evening}
                                  onChange={(e) => setEvening(e.target.checked)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="billing-info mb-20">
                                <label
                                  className={err && (!morning && !lunch && !afternoon && !evening && !night) ? "text-danger" : ""}>20-23</label>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  checked={night}
                                  onChange={(e) => setNight(e.target.checked)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-20">
                            <em>
                              *Оформив и оплатив подписку до 15:00 понедельника, Вы получите букет на текущей неделе.
                              Оформив
                              и оплатив подписку после 15:00 понедельника, Вы получите букет на следующей неделе.
                            </em>
                          </div>
                        </Fragment>
                        }


                        <div className="additional-info-wrap">
                          <div className="additional-info mb-20">
                            <label className={err && !address ? "text-danger" : ""}>Адрес доставки</label>
                            <textarea
                              name="message"
                              defaultValue={""}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <em>
                              *Доставка подписки в пределах МКАД бесплатна. Доставка за пределы МКАД рассчитывается по
                              тарифам курьерской службы и оплачивается непосредственно курьеру. Если Вы заказываете только
                              товары из раздела “Дополнительные” (без подписки), доставка оплачивается отдельно по тарифам
                              курьерской службы
                            </em>
                          </div>
                        </div>
                        <div className="additional-info-wrap">
                          <h4>Дополнительная информация</h4>
                          <div className="additional-info">
                            <label>Особые пожелания</label>
                            <textarea
                              name="message"
                              value={comment}
                              defaultValue={""}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="your-order-area">
                        <h3>Ваш заказ</h3>
                        <div className="your-order-wrap gray-bg-4">
                          <div className="your-order-product-info">
                            <div className="your-order-top">
                              <ul>
                                <li>Наименование</li>
                                <li>Итого</li>
                              </ul>
                            </div>
                            <div className="your-order-middle">
                              <ul>
                                {cartItems.map((cartItem, key) => {

                                  // const discountedPrice = null;

                                  const discountedPrice = promoPrice(
                                    cartItem,
                                    promoSet
                                  );

                                  const finalProductPrice = (
                                    cartItem.price * currency.currencyRate
                                  );
                                  const finalDiscountedPrice = (
                                    discountedPrice * currency.currencyRate
                                  );

                                  discountedPrice != null
                                    ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                    : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);

                                  return (
                                    <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.title} X {cartItem.quantity}
                                  </span>{" "}
                                      <span className="order-price">
                                    {discountedPrice !== null
                                      ?
                                      getFormattedPrice((
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ))
                                      :
                                      getFormattedPrice((
                                        finalProductPrice * cartItem.quantity
                                      ))} р.
                                  </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            <div className="your-order-total">
                              <ul>
                                <li className="order-total">Итого</li>
                                <li>
                                  {getFormattedPrice(cartTotalPrice)} р.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="payment-method"></div>
                        </div>

                        <div className="your-order-wrap gray-bg-4 mt-4">
                          Промо код:
                          <div className="row mt-3">
                            <div className="col-lg-12">
                              <div className="billing-info mb-10">
                                <input
                                  className={`promo ${(checkPromo(cartItems, promoSet) && promoSet.discount > 0) || (checkPromo(cartItems, promoSet) && promoSet.accessory) || (checkPromo(cartItems, promoSet) && promoSet.present) ? 'promo-input' : ''}`}
                                  type="text"
                                  onChange={(e) => setPromo(e.target.value)}
                                  value={promo}
                                />
                              </div>
                            </div>
                          </div>

                          {promoSet.discount > 0 && checkPromo(cartItems, promoSet) ?

                            < div className="promo-input pl-2 mb-20">
                              Скидка {promoSet.discount}% на:
                              <div className="pl-2">

                                {cartItems.map(cartItem => (<div>{promoNames(cartItem, promoSet)}</div>))}

                              </div>
                            </div>
                            :
                            ''
                          }

                          {promoSet.accessory && checkPromo(cartItems, promoSet) ?

                            < div className="promo-input pl-2 mb-20">
                              Подарок:
                              <div className="pl-2">

                                {promoSet.accessory && <div>{promoSet.accessory.title}</div>}

                              </div>
                            </div>
                            :
                            ''
                          }

                          {promoSet.present && checkPromo(cartItems, promoSet) ?

                            < div className="promo-input pl-2 mb-20">
                              {promoSet.present && <div>{promoSet.present}</div>}
                            </div>
                            :
                            ''
                          }


                          <div className="mt-1">
                            <button
                              className={`btn-hover promo-button ${(checkPromo(cartItems, promoSet) && promoSet.discount > 0) || (checkPromo(cartItems, promoSet) && promoSet.accessory) || (checkPromo(cartItems, promoSet) && promoSet.present) ? 'd-none' : 'd-block'}`}

                              onClick={() => handlePromo()}
                            >
                              Использовать
                            </button>
                            <button
                              className={`btn-hover promo-button ${(checkPromo(cartItems, promoSet) && promoSet.discount > 0) || (checkPromo(cartItems, promoSet) && promoSet.accessory) || (checkPromo(cartItems, promoSet) && promoSet.present) ? 'd-block' : 'd-none'}`}
                              onClick={() => get_promo('')}
                            >
                              Сбросить
                            </button>
                          </div>
                        </div>
                        <div className="place-order mt-25 text-center">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="billing-info mb-20 d-flex flex-row-reverse text-left">
                                <label className={err && !agreement ? "text-danger" : ""}>Я согласен(-на) с <a
                                  href="/info/personal-data">Политикой конфиденциальности</a> и <a href="/info/offert">Публичной
                                  офертой</a></label>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  onChange={(e) => setAgreement(e.target.checked)}
                                />
                              </div>
                            </div>
                          </div>
                          {err && <div className="text-danger mb-3">Заполните правильно форму!</div>}
                          {deliveryOption ? <button
                            // disabled
                            className="btn-hover"
                            onClick={(name && phone && email && (thursday || wednesday) && (morning || lunch || afternoon || evening || night) && address && agreement) ?
                              () => formSuccess()
                              :
                              () => formError()
                            }
                          >Оплатить
                          </button>
                          :
                          <button
                            // disabled
                            className="btn-hover"
                            onClick={(name && phone && email && address && agreement) ?
                              () => formSuccess()
                              :
                              () => formError()
                            }
                          >Оплатить
                          </button>}
                        </div>
                      </div>
                    </div>
                  </div>
                ) :
                (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="item-empty-area text-center">
                        <div className="item-empty-area__icon mb-30">
                          <i className="pe-7s-cash"></i>
                        </div>
                        <div className="item-empty-area__text">
                          Нечего оплачивать <br/>{" "}
                          <Link to={process.env.PUBLIC_URL + "/"}>
                            На главную
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  cartItems: state.cartData,
  currency: state.currencyData,
  promo_set: state.promoReducer.promo,
  order_status: state.orderReducer.order
})

export default connect(mapStateToProps, {addToCart, send_order, get_promo})(Checkout);

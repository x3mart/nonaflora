import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewProductGrid from "../../wrappers/product/NewProductGrid";
import Lightbox from 'react-image-lightbox';

import {load_home_page} from '../../redux/actions/homePageActions'

import {connect} from "react-redux"
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";

import s1 from "../../assets/img/S-1.jpg"
import s2 from "../../assets/img/S-2.jpg"
import s3 from "../../assets/img/S-3.jpg"
import s4 from "../../assets/img/S-4.jpg"
import m1 from "../../assets/img/M-1.jpg"
import m2 from "../../assets/img/M-2.jpg"
import m3 from "../../assets/img/M-3.jpg"
import m4 from "../../assets/img/M-4.jpg"
import l1 from "../../assets/img/L-1.jpg"
import l2 from "../../assets/img/L-2.jpg"
import l3 from "../../assets/img/L-3.jpg"
import l4 from "../../assets/img/L-4.jpg"
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import {addToCart} from "../../redux/actions/cartActions";


const HomeFashionThree = ({load_home_page, home_page, addToCart}) => {

  useEffect(() => {
    load_home_page();
  }, [])

  useEffect(() => {
    if (home_page) {
      setRecomendations(home_page.recomendations)
      setFullDescription(home_page.fullDescription)
    }
  })

  const [modal, setModal] = useState({
    isOpen: false,
    image: null
  })

  const [size, setSize] = useState('L')
  const [price, setPrice] = useState(20000)
  const [recomendations, setRecomendations] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [subscription, setSubscription] = useState({})

  useEffect(() => {
    setSubscription({
      title: 'Подписка',
      size: size,
      price: price
    })
  }, [size, price])

  const handleSize = (size, price) => {
    setSize(size)
    setPrice(price)
  }

  const SetS = () => {
    return (

      <Fragment>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={s1} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: s1})}><i
                  className="fa fa-eye"></i></button>

              </div>
            </div>


          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={s2} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: s2})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={s3} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: s3})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={s4} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: s4})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
      </Fragment>

    )
  }

  const SetM = () => {
    return (

      <Fragment>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={m1} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: m1})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={m2} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: m2})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={m3} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: m3})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={m4} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: m4})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
      </Fragment>

    )
  }

  const SetL = () => {
    return (

      <Fragment>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={l1} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: l1})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={l2} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: l2})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={l3} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: l3})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6 ">
          <div className="product-wrap-2 mb-25  ">
            <div className="product-img"><img src={l4} alt=""/>
              {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
              {/*  className="purple">New</span></div>*/}
              <div className="product-action-2">

                <button title="Quick View" onClick={() => setModal({isOpen: true, image: l4})}><i className="fa fa-eye"></i></button>

              </div>
            </div>

          </div>
        </div>
      </Fragment>

    )
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >

        {modal.isOpen && (
          <Lightbox
            mainSrc={modal.image}
            onCloseRequest={() => setModal({isOpen: false, image: null})}
          />
        )}

        {/* hero slider */}
        <HeroSliderTen/>
        {/* feature icon */}
        <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60"/>
        {/* product grid */}


        {/*<div className="product-area pb-60 section-padding-1">*/}
        {/*  */}
        {/*</div>*/}

        {/*<div className="container-fluid">*/}
        {/*    <div className="section-title-2 text-center mb-60"><h2>New Arrival</h2><p>Lorem ipsum dolor sit amet conse*/}
        {/*      ctetu.</p></div>*/}
        {/*    */}
        {/*  </div>*/}

        {/*<div className="row four-column" style="max-width: 1200px; margin-left: auto; margin-right: auto;">*/}
        {/*      */}
        {/*    </div>*/}


        <div id="showcase" className='container pb-90'>
          <SectionTitleTwo
          titleText="Подписка на месяц"
          subTitleText=""
          positionClass="text-center"
          spaceClass="mb-60"
        />
          <div className="w-100">
            <h3>
              Примерный сет на 4 недели:
            </h3>
          </div>
          <div className='row four-column'>

            {size === 'S' && <SetS/>}
            {size === 'M' && <SetM/>}
            {size === 'L' && <SetL/>}

          </div>
          <div className="product-content-2 d-flex justify-content-between">
            <div className="title-price-wrap-2 ">
              <h3>Выберите подходящий размер:</h3>
              <div className='slider-content-3 mt-15 d-flex'>
                <div className='d-flex justify-content-center align-items-center mr-2 slider-btn btn-hover'><a
                  className={`animated ${size === 'S' ? 'active-button' : ''}`}
                  style={{width: 50, height: 50, padding: '16px 19px'}} onClick={() => handleSize('S', 10000)}>S</a></div>
                <div className='d-flex justify-content-center align-items-center mr-2 slider-btn btn-hover'><a
                  className={`animated ${size === 'M' ? 'active-button' : ''}`}
                  style={{width: 50, height: 50, padding: '16px 18px'}} onClick={() => handleSize('M', 15000)}>M</a></div>
                <div className='d-flex justify-content-center align-items-center mr-2 slider-btn btn-hover'><a
                  className={`animated ${size === 'L' ? 'active-button' : ''}`}
                  style={{width: 50, height: 50, padding: '16px 20px'}} onClick={() => handleSize('L', 20000)}>L</a></div>

              </div>
            </div>
            <div>
              <div className="price-2"><span style={{
                fontSize: 30,
                fontWeight: '100'
              }}>₽ {price}</span></div>
              <div className='slider-content-3 mt-15 text-right'>
                <div className="slider-btn btn-hover" onClick={() => addToCart(subscription, 'Добавлено в корзину')}><a className="animated p-3"
                                                         >КУПИТЬ ПОДПИСКУ</a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          size={size}
          recomendations={recomendations}
          productFullDesc={fullDescription}
        />

        <div className='container'>
          <NewProductGrid category="accessories" limit={4}/>
        </div>


        <div className='container pb-90'>
          <SectionTitleTwo
          titleText="Примеры наших работ"
          subTitleText=""
          positionClass="text-center"
          spaceClass="mb-60"
        />
          <div className='row justify-content-center'>

            <div className="col-xl-2 col-md-4 col-lg-2 col-sm-4 ">
              <div className="product-wrap-2 mb-25  ">
                <div className="product-img"><img src={l1} alt=""/>
                  {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                  {/*  className="purple">New</span></div>*/}
                  <div className="product-action-2">

                    <button title="Quick View" onClick={() => setModal({isOpen: true, image: l1})}><i className="fa fa-eye"></i></button>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-lg-2 col-sm-4 ">
              <div className="product-wrap-2 mb-25  ">
                <div className="product-img"><img src={l2} alt=""/>
                  {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                  {/*  className="purple">New</span></div>*/}
                  <div className="product-action-2">

                    <button title="Quick View" onClick={() => setModal({isOpen: true, image: l2})}><i className="fa fa-eye"></i></button>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-lg-2 col-sm-4 ">
              <div className="product-wrap-2 mb-25  ">
                <div className="product-img"><img src={l3} alt=""/>
                  {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                  {/*  className="purple">New</span></div>*/}
                  <div className="product-action-2">

                    <button title="Quick View" onClick={() => setModal({isOpen: true, image: l3})}><i className="fa fa-eye"></i></button>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-lg-2 col-sm-4 ">
              <div className="product-wrap-2 mb-25  ">
                <div className="product-img"><img src={l4} alt=""/>
                  {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                  {/*  className="purple">New</span></div>*/}
                  <div className="product-action-2">

                    <button title="Quick View" onClick={() => setModal({isOpen: true, image: l4})}><i className="fa fa-eye"></i></button>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-lg-2 col-sm-4 ">
              <div className="product-wrap-2 mb-25  ">
                <div className="product-img"><img src={l4} alt=""/>
                  {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                  {/*  className="purple">New</span></div>*/}
                  <div className="product-action-2">

                    <button title="Quick View" onClick={() => setModal({isOpen: true, image: l4})}><i className="fa fa-eye"></i></button>

                  </div>
                </div>

              </div>
            </div>

          </div>
          <div className='slider-content-3 mt-15 text-center'>
            <div className="slider-btn btn-hover"><a className="animated p-3"
                                                     href="/gallery">ЕЩЕ РАБОТЫ</a>
            </div>
          </div>
        </div>


        {/*<NewProductGrid category="accessories" limit={4} />*/}
        {/* blog featured */}

      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  home_page: state.homePageReducer.home_page
})

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
    },
    load_home_page
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFashionThree);

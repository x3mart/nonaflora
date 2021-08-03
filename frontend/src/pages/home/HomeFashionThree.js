import React, {Fragment, useEffect, useRef, useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import NewProductGrid from "../../wrappers/product/NewProductGrid";
import Lightbox from 'react-image-lightbox';
import {useToasts} from "react-toast-notifications";
import background from "../../assets/img/mainlast1.jpg"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {load_home_page} from '../../redux/actions/homePageActions'

import {connect} from "react-redux"
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";

// import s1 from "../../assets/img/S-1.jpg"
// import s2 from "../../assets/img/S-2.jpg"
// import s3 from "../../assets/img/S-3.jpg"
// import s4 from "../../assets/img/S-4.jpg"
// import m1 from "../../assets/img/M-1.jpg"
// import m2 from "../../assets/img/M-2.jpg"
// import m3 from "../../assets/img/M-3.jpg"
// import m4 from "../../assets/img/M-4.jpg"
// import l1 from "../../assets/img/L-1.jpg"
// import l2 from "../../assets/img/L-2.jpg"
// import l3 from "../../assets/img/L-3.jpg"
// import l4 from "../../assets/img/L-4.jpg"
import s1 from "../../assets/img/s1.jpg"
import s2 from "../../assets/img/s2.jpg"
import s3 from "../../assets/img/s3.jpg"
import s4 from "../../assets/img/s4.jpg"
import m1 from "../../assets/img/m1.jpg"
import m2 from "../../assets/img/m2.jpg"
import m3 from "../../assets/img/m3.jpg"
import m4 from "../../assets/img/m4.jpg"
import l1 from "../../assets/img/l1.jpg"
import l2 from "../../assets/img/l2.jpg"
import l3 from "../../assets/img/l3.jpg"
import l4 from "../../assets/img/l4.jpg"
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import {addToCart} from "../../redux/actions/cartActions";

import bg from "../../assets/img/Pattern_example_beige_wide_beige.png"
import {getFormattedPrice, isEmptyObject} from "../../helpers/phone"
import HomeSubscriptions from "./HomeSubscriptions";
import HomeTestBouquet from "./HomeTestBouquet";

const HomeFashionThree = ({load_home_page, home_page, addToCart}) => {

  useEffect(() => {
    load_home_page();
  }, [])

  useEffect(() => {
    if (!isEmptyObject(home_page)) {
      setRecomendations(home_page.recomendations)
      setFullDescription(home_page.fullDescription)
      setSliderData(home_page.titleblock)
      setSubscriptions(home_page.showcase.subscriptions)
      setTestBouquet(home_page.test_boquets)
      setIsLoaded(true)
    }
  })

  const scroll = () => showcase.current.scrollIntoView({behavior: "smooth"})
  // const scroll = () => {window.scrollTo(0, showcase.current.scrollHeight)}


  useEffect(() => {
    if (!isEmptyObject(home_page)) {
      let arr = []
      home_page.gallery.images.map(item => {
        return arr.push(item.image)
      })
      let tmb = []
      home_page.gallery.images.map(item => {
        return tmb.push(item.tmb)
      })
      setImages(arr)
      setThumbs(tmb)
    }
  }, [])


  const [modal, setModal] = useState({
    isOpen: false,
    key: null
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const [images, setImages] = useState([])
  const [thumbs, setThumbs] = useState([])
  const [recomendations, setRecomendations] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [quantityCount, setQuantityCount] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [id, setId] = useState(3)
  const [sliderData, setSliderData] = useState({})
  const [subscriptions, setSubscriptions] = useState([])
  const [testBouquet, setTestBouquet] = useState([])


  const {addToast} = useToasts();

  const showcase = useRef(null);

  const responsive = {
    superLargeDesktop: {

      breakpoint: {max: 4000, min: 3000},
      items: 7
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 5
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 4
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1
    }
  };

  const pictures =  thumbs ?
      thumbs.map((item, key) => {
        return (
          <div className="col-xl-2 col-md-4 col-lg-2 col-sm-4 " key={key}>
            <div className="product-wrap-2 mb-25  ">
              <div className="product-img"><img src={item} alt=""/>
                {/*<div className="product-img-badges"><span className="pink">-10%</span><span*/}
                {/*  className="purple">New</span></div>*/}
                <div className="product-action-2">

                  <button title="Quick View" onClick={() => setModal({isOpen: true, key: key})}><i
                    className="fa fa-eye"/></button>

                </div>
              </div>

            </div>
          </div>
        )
      })
      :
      ''


  return (
    <Fragment>
      <MetaTags>
        <title>Нонночка&Флорочка | Главная</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >

        {modal.isOpen && (
          <Lightbox
            mainSrc={images[modal.key]}
            nextSrc={images[(modal.key + 1) % images.length]}
            prevSrc={images[(modal.key + images.length - 1) % images.length]}
            onCloseRequest={() => setModal({isOpen: false, key: null})}
            onMovePrevRequest={() =>
              setModal({
                ...modal,
                key: (modal.key + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              setModal({
                ...modal,
                key: (modal.key + 1) % images.length
              })
            }
          />
        )}

        {/* hero slider */}
        {/*<HeroSliderTen*/}
        {/*/>*/}

        {isLoaded &&

        <Fragment>

          <div
            className="single-slider-2 slider-height-2 d-flex align-items-center bg-img"
            // style={{ backgroundImage: `url(${background})` }}
            style={{backgroundImage: `url(${sliderData.image})`}}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-8 col-12 ml-auto">
                  <div className="slider-content-3 slider-animated-1 text-center" style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    padding: '100px 0',
                    transition: 'background-color 0.2s'
                  }}>
                    <h3 className="animated">{sliderData.subtitle}</h3>
                    <h1 className="animated main-title-nf">{sliderData.title}</h1>
                    <p className="animated"
                       dangerouslySetInnerHTML={{__html: sliderData.text}}
                    />
                    <div className="slider-btn btn-hover">
                      <a
                        className="animated"
                        style={{zIndex: '2'}}
                        onClick={() => scroll()}
                      >
                        {sliderData.button}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* feature icon */}
          <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" data={home_page.iconblock}/>
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


          <div style={{width: '100%', backgroundColor: 'rgba(254, 230, 211, 1)'}}>
            <div ref={showcase} className='container mb-90 py-5'>
              <SectionTitleTwo
                titleText="Подписка на месяц"
                subTitleText=""
                positionClass="text-center"
                spaceClass="mb-60"
                image={bg}
              />
              <div>
                {subscriptions &&
                subscriptions.map((item, id) => (
                  <HomeSubscriptions key={id} item={item} item_id={id}/>
                ))
                }

                <div className="w-100 mt-5">
                  <h3>
                    Сомневаетесь?
                  </h3>
                  <h4>
                    Закажите пробный букет
                  </h4>
                </div>

                {testBouquet &&
                testBouquet.map((item, id) => (
                  <HomeTestBouquet key={id} item={item}/>
                ))

                }

              </div>
            </div>
          </div>


          <SectionTitleTwo
            titleText={home_page.showcase.title}
            subTitleText=""
            positionClass="text-center"
            spaceClass="mb-60"
            image={bg}
          />
          <div className='container pb-90'>
            <div className="column"
                 dangerouslySetInnerHTML={{__html: home_page.showcase.description}}
            />
          </div>


          {/*<ProductDescriptionTab*/}
          {/*  spaceBottomClass="pb-90"*/}
          {/*  size={size}*/}
          {/*  recomendations={recomendations}*/}
          {/*  productFullDesc={fullDescription}*/}
          {/*/>*/}
          <div style={{width: '100%', backgroundColor: '#a5c3d9'}} className="pt-50">
            <div>
              <SectionTitleTwo
                titleText={home_page.gallery.title}
                subTitleText=""
                positionClass="text-center"
                spaceClass="mb-60"
                image={bg}
              />

              <div className='container pb-90'>
                <div className='row justify-content-center'>

                  {pictures}


                </div>
                {/*{home_page.gallery.images.length > 5 &&*/}
                {/*<div className='slider-content-3 mt-15 text-center'>*/}
                {/*  <div className="slider-btn btn-hover"><a className="animated p-3"*/}
                {/*                                           href="/gallery">ЕЩЕ РАБОТЫ</a>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*}*/}
              </div>
            </div>

          </div>
          <div className='container mb-90 pt-5 pb-3'>
            <NewProductGrid category="accessories" limit={4}/>
          </div>


        </Fragment>
        }


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

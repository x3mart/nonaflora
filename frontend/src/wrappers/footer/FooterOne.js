import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {animateScroll} from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";
import Feed from "react-instagram-authless-feed"
import logo1 from "../../assets/img/mir.svg"
import logo2 from "../../assets/img/visa.svg"
import logo3 from "../../assets/img/mastercard.svg"
import logo4 from "../../assets/img/jcb.svg"
import {useCookies} from "react-cookie";
import cross from "../../assets/img/b-icon_style_cross.svg"
import logo from "../../assets/img/NF_Logo_2.png"
import {getFormattedPhone, isEmptyObject} from "../../helpers/phone"

import {connect} from "react-redux"
import {load_home_page} from "../../redux/actions/homePageActions";
import {get_feed} from "../../redux/actions/feedActions";
import InstagramEmbed from 'react-instagram-embed';

const FooterOne = ({
                     backgroundColorClass,
                     spaceTopClass,
                     spaceBottomClass,
                     spaceLeftClass,
                     spaceRightClass,
                     containerClass,
                     extraFooterClass,
                     sideMenu,
                     load_home_page,
                     home_page,
                     insta_feed,
                     get_feed
                   }) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);
  const [date, setDate] = useState(null)
  const getYear = () => setDate(new Date().getFullYear())
  const [instaFeed, setInstaFeed] = useState([])


  const is_empty = obj => {
    if(Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    get_feed();
  }, [])

  useEffect(() => {
    let arr = []
    if (insta_feed.length > 0) {
      let a =[]
      insta_feed.map((item, i) => {
        if (item.media_type !== 'VIDEO') {
          a.push(item)
        }
      })
      for(let i=0; i<=7; i++ ){
        arr.push(a[i])
      }
      setInstaFeed(arr)
    }
  }, [insta_feed])

  useEffect(() => {
    getYear();
  }, [])

  useEffect(() => {
    load_home_page();
  }, [])

  useEffect(() => {
    if (!isEmptyObject(home_page)) {
      setData(home_page.infoblocks)
    }
  }, [home_page])

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const getIcon = (str) => {
    let arr = str.split(":")
    let icon_data = arr[arr.length - 1]
    return <i className={`fa fa-${icon_data} mr-2`}></i>
  }

  const [data, setData] = useState([])

  const [cookies, setCookie] = useCookies(["popupclosed"]);

  const handleCookie = () => {
    setCookie("popupclosed", "active", {
      path: "/",
      maxAge: 864000
    });
    setVisible(false)
  }

  const [visible, setVisible] = useState(
    cookies.popupclosed ? false : true
  )

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ""
      } ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${extraFooterClass ? extraFooterClass : ""} ${
        spaceLeftClass ? spaceLeftClass : ""
      } ${spaceRightClass ? spaceRightClass : ""}`}
    >
      {visible &&
      <div className="b-policy-info b-policy-info_status_visible">
        <div className="b-policy-info__wrapper">
          <div className="b-policy-info__text">
            Мы&nbsp;используем файлы cookie. Продолжив работу с&nbsp;сайтом, вы&nbsp;соглашаетесь с <a
            href="/info/personal-data">Политикой
            обработки персональных данных</a>, <a href="/info/payment">Условиями оплаты</a> и <a href="/info/offert">Публичной
            офертой</a>.
          </div>
          <div className="b-icon b-icon_style_cross b-policy-info__cross" onClick={() => handleCookie()}></div>
        </div>
      </div>
      }
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo={logo}
              spaceBottomClass="mb-30"
              year={date}
            />
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>ПОЛЕЗНЫЕ ССЫЛКИ</h3>
              </div>
              <div className="footer-list">
                <ul>
                  {data && data.map(item => (
                    <li key={item.id}>
                      <Link to={process.env.PUBLIC_URL + "/info/" + item.slug}>{item.short_title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-md-4" : "col-lg-2 col-md-4"
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-95"
                  : "footer-widget mb-30 ml-50"
              }`}
            >
              <div className="footer-title">
                <h3>КОНТАКТЫ</h3>
              </div>
              <div className="footer-list">
                {!is_empty(home_page) &&
                <ul>
                  {home_page.contact.email &&
                  <li>
                    <a href={`mailto:${home_page.contact.email}`} className="d-flex align-items-center">
                      <i className="fa fa-envelope pr-2"></i>
                      {home_page.contact.email}
                    </a>
                  </li>
                  }
                  {home_page.contact.phones &&
                  home_page.contact.phones.map(item => (
                    <li key={item.id} className="footer-phone">
                      <a href={`phone:${item.phone}`} className="d-flex align-items-center">
                        <i className="fa fa-phone pr-2"></i>
                        <i className="fa fa-whatsapp pr-2"></i>
                        {getFormattedPhone(item.phone)}
                      </a>
                    </li>
                  ))
                  }
                  {home_page.contact.socials &&
                  home_page.contact.socials.map(item => (
                    <li key={item.id}>
                      <a href={item.link} className="d-flex align-items-center">
                        {getIcon(item.icon)}
                        {item.name}
                      </a>
                    </li>
                  ))
                  }
                </ul>
                }
              </div>
            </div>
          </div>


          <div
            className={`${
              sideMenu ? "col-xl-6 col-sm-6" : "col-lg-6 col-sm-6"
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-145"
                  : "footer-widget mb-30 ml-75"
              }`}
            >
              <div className="footer-title">
                <h3>МЫ В ИНСТАГРАМЕ</h3>
              </div>
              <div className="footer-list">
                <div className="row">
                  <div className="d-flex justify-content-start flex-row flex-wrap pl-3 pt-1">
                  {
                    instaFeed.length>0 && instaFeed.map((item, i) => {
                      return (
                          <div className="pr-2 pb-2" key={i} style={{width:'25%'}}>
                            <a href={item.permalink} target='bank'>
                              <img src={item.media_url} alt="" style={{width: '100%'}}/>
                            </a>
                          </div>

                      )
                    })
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 w-lg-50 mx-auto">
          <div className="d-flex justify-content-between">
            <img src={logo1} alt="" width="70px"/>
            <img src={logo2} alt="" width="70px"/>
            <img src={logo3} alt="" width="70px"/>
            <img src={logo4} alt="" width="70px"/>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

const mapStateToProps = state => ({
  home_page: state.homePageReducer.home_page,
  insta_feed: state.feedReducer.feed
})

export default connect(mapStateToProps, {load_home_page, get_feed})(FooterOne);

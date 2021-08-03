import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {animateScroll} from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";
import Feed from "react-instagram-authless-feed"

import {connect} from "react-redux"
import {load_home_page} from "../../redux/actions/homePageActions";

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
                     home_page
                   }) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    load_home_page();
  }, [])

  useEffect(() => {
    if (home_page) {
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
    let icon_data = JSON.parse(str)
    return <i className={`${icon_data.style} ${icon_data.icon}`}></i>
  }

  const [data, setData] = useState([])

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
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/logo.png"
              spaceBottomClass="mb-30"
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
                  {data.map(item => (
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
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
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
                {home_page &&
                <ul>
                  {home_page.contact.email &&
                  <li>
                    <a href={`mailto:${home_page.contact.email}`}>{home_page.contact.email}</a>
                  </li>
                  }
                  {home_page.contact.phones &&
                  home_page.contact.phones.map(item => (
                    <li key={item.id}>
                    <a href={`phone:${item.phone}`}>{item.phone}</a>
                  </li>
                  ))
                  }
                  {home_page.contact.socials &&
                  home_page.contact.socials.map(item => (
                    <li key={item.id}>

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
              {/*<div className="footer-title">*/}
              {/*  <h3>МЫ В ИНСТАГРАМЕ</h3>*/}
              {/*</div>*/}
              {/*<div className="footer-list">*/}
              {/*  <Feed userName="jamespaulmoriarty" className="Feed" classNameLoading="Loading" limit="8"/>*/}
              {/*</div>*/}
            </div>
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
  home_page: state.homePageReducer.home_page
})

export default connect(mapStateToProps, {load_home_page})(FooterOne);

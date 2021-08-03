import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";

import {load_home_page} from '../../redux/actions/homePageActions'

import {connect} from "react-redux"
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";


const InfoPage = (props) => {

  const {load_home_page, home_page} = props
  const {slug} = props.match.params
  const {pathname} = props.location;

  useEffect(() => {
    load_home_page();
  }, [])


  useEffect(() => {
    if (home_page !== null) {
      home_page.infoblocks.map((item) => {
        if (item.slug === slug) {
          setData(item)
        }
      })
    }
  }, [home_page, slug])

  const [data, setData] = useState({})

  return (
    <Fragment>
      <MetaTags>
        <title>Нонночка&Флорочка | {data.short_title}</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {data.short_title}
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <Breadcrumb />
        <div className="container py-5">
          <h2>{data.title}</h2>

          <div className="info-text"
            dangerouslySetInnerHTML={{__html: data.body}}
          />
        </div>
      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  home_page: state.homePageReducer.home_page
})

export default connect(mapStateToProps, {load_home_page})(InfoPage);

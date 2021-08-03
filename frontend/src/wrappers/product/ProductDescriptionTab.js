import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {connect} from "react-redux"

const ProductDescriptionTab = ({home_page, spaceBottomClass, productFullDesc, size, recomendations}) => {
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Описание</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Рекомендации по уходу</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="productDescription">
                {/*{productFullDesc}*/}
                {home_page &&
                <div className="container py-5">
                  <div
                    dangerouslySetInnerHTML={{__html: home_page.showcase.description}}
                  />
                </div>
                }
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                {/*{recomendations}*/}
                {home_page &&
                <div className="container py-5">
                  <div
                    dangerouslySetInnerHTML={{__html: home_page.showcase.recomendation}}
                  />
                </div>
                }
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

const mapStateToProps = state => ({
  home_page: state.homePageReducer.home_page
})

export default connect(mapStateToProps)(ProductDescriptionTab);

import React from "react";
import Helmet from "react-helmet";
import "../../assets/scss/init.scss";

function withLayout(Component) {
  return class LayoutWrapper extends React.Component {
    render() {
      return (
        <div className="layout">
          <Helmet defaultTitle="Blog by Maaz Syed Adeeb" />
          <Component {...this.props} />
        </div>
      );
    }
  };
}

export default withLayout;

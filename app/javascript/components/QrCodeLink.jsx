import React from "react";
import { Link } from "react-router-dom";

class QrCodeLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = { svg: '' };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = '/api/v1/show/' + id;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({  svg: response }))
      .catch(() => this.props.history.push('/'));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const {svg}  = this.state;

    const svg_html = this.addHtmlEntities(svg);

    return (
      <div className="">

        <div className="container py-5">
          <div className="row">

            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Follow this qr code to the nfc scan page</h5>
              <div className="qr-code-svg"
                dangerouslySetInnerHTML={{
                  __html: `${svg_html}`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default QrCodeLink;

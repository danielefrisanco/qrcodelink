import React from "react";
import { Link } from "react-router-dom";

class QrCodeLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qr_code_links: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/qr_code_link/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ qr_code_links: response }))
      .catch(() => this.props.history.push("/"));
  }
  render() {
    const { qr_code_links } = this.state;

    const allLinks = qr_code_links.map((qr_code_link, index) => (

      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">

          <div className="card-body">
            <h5 className="card-title">{qr_code_link.id}</h5>
            <Link to={`/qr_code_link/${qr_code_link.id}`} className="btn custom-button">
              View Qr code
            </Link>
          </div>
        </div>
      </div>
    ));


    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Qr code link list</h1>

          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">
              {allLinks}
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default QrCodeLinks;

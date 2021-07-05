import React from "react";
import { Link } from "react-router-dom";

class NDEFScan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {success: false, error: false};
    this.scanButtonOnClick = this.scanButtonOnClick.bind(this);
    this.sendNdefMessage = this.sendNdefMessage.bind(this);
  }

  // Sends the message
  sendNdefMessage(message, serialNumber) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = '/api/v1/save_ndef_message/' + id;


    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      data: { message: message,
              serial_number: serialNumber
            }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => this.setState({success: true, error: false}))
    .catch(error => this.setState({success: false, error: true}));


  }
  async scanButtonOnClick() {
    console.log("User clicked scan button");
    // this.sendNdefMessage('message', 'serialNumber') TEST

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        console.log("Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);
        this.sendNdefMessage(message, serialNumber)
      });
    } catch (error) {
      console.log("Argh! " + error);
      this.setState({success: false, error: true})
    }
  }

  render() {
    var notification = ''
    var scan_div = ''
    if (this.state.error) {
      notification = <div className="alert alert-danger" role="alert">Something went wrong.</div>
    } else {
      if (this.state.success) {
        notification = <div className="alert alert-success" role="alert">Scan successfully saved!</div>
        } else {
          scan_div = <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Scan only on chrome on Android(TODO CHECK)</h5>
            <button type="button" name="button" id="scanButton" onClick={this.scanButtonOnClick}>Scan</button>
          </div>
    }}

    return (
      <div className="">
        <div className="container py-5">
          <div className="row">
            {notification}
            {scan_div}
          </div>
        </div>
      </div>
    );
  }

}

export default NDEFScan;

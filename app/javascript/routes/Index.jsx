import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import QrCodeLink from "../components/QrCodeLink";
import QrCodeLinks from "../components/QrCodeLinks";
import NDEFScan from "../components/NDEFScan";

export default (
  <Router>
    <Switch>
     <Route path="/" exact component={Home} />
      <Route path="/qr_code_links" exact component={QrCodeLinks} />
      <Route path="/qr_code_link/:id" exact component={QrCodeLink} />
      <Route path="/ndef_scan/:id" exact component={NDEFScan} />
    </Switch>
  </Router>
);

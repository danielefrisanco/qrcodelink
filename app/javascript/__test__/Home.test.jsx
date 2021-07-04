import React from "react";

import Adapter from 'enzyme-adapter-react-17-updated';
import { shallow, configure } from 'enzyme';
import { Link } from "react-router-dom";

configure({adapter: new Adapter()});
import Home from '../components/Home.jsx';

describe('Home', () => {
  it('renders correctly a descriptive text and a button to the qr links', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('.lead').text())
      .toBe('A list of the available qr code links.( This page was not in the specifications)');

    const link = wrapper.find(Link)
    expect(link.props().to).toBe('/qr_code_links');
    expect(link.props().children).toBe('View qr code links');
  });

});

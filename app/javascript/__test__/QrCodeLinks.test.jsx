import React from "react";

import Adapter from 'enzyme-adapter-react-17-updated';
import { shallow, configure, mount } from 'enzyme';
import { Link } from "react-router-dom";
// BrowserRouter is necessary because a Link component need to be inside of it
import { BrowserRouter } from "react-router-dom";

// needed by enzyme
configure({adapter: new Adapter()});

import QrCodeLinks from '../components/QrCodeLinks.jsx';

// Mock the fetch function
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: '1' }]),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

// this function let some time pass to allow for example the component to re-render
function wait() {
    return new Promise((resolve) => setTimeout(resolve));
}
describe('QrCodeLinks', () => {
  it('renders a descriptive text and call the api', () => {
    const wrapper = shallow(<QrCodeLinks />);
    expect(wrapper.find('.qr-code-links-description').text())
      .toBe('Qr code link list');
    expect(fetch).toHaveBeenCalledTimes(1);
  });


  it('renders the link to one Qr code that has been fetched', async () => {
    // use mount to render nested components
    const wrapper = mount(<BrowserRouter><QrCodeLinks /></BrowserRouter>);

    await wait();
    wrapper.update();

    const link = wrapper.find(Link)
    expect(link.props().to).toBe('/qr_code_link/1');
    expect(link.props().children).toBe('View Qr code');

  });
});

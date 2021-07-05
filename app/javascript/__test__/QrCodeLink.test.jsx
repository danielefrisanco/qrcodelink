import React from "react";

import Adapter from 'enzyme-adapter-react-17-updated';
import { shallow, configure, mount } from 'enzyme';
import { Link } from "react-router-dom";
// BrowserRouter is necessary because a Link component need to be inside of it
import { BrowserRouter } from "react-router-dom";
// allows to mock function based on the parameters passed
import { when } from 'jest-when'
// needed by enzyme
configure({adapter: new Adapter()});

import QrCodeLink from '../components/QrCodeLink.jsx';

// Mock the fetch function
global.fetch = jest.fn()
// make sure the right url is called
when(global.fetch).calledWith('/api/v1/show/1').mockReturnValue(
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('the generated qr code'),
  })
)

beforeEach(() => {
  fetch.mockClear();
});

// this function let some time pass to allow for example the component to re-render
function wait() {
    return new Promise((resolve) => setTimeout(resolve));
}

describe('QrCodeLink', () => {
  it('renders correctly a descriptive text and call the api', async () => {
    let match = {params:{id: '1'}}
    const wrapper = shallow(<QrCodeLink match={match}/>);
    expect(wrapper.find('h5').text())
      .toBe('Follow this qr code to the nfc scan page');
    expect(fetch).toHaveBeenCalledTimes(1);

    await wait();
    wrapper.update();

    const svg = wrapper.find('.qr-code-svg')
    expect(svg.html()).toContain('the generated qr code');
  });
});

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

import NDEFScan from '../components/NDEFScan.jsx';

// Mock the fetch function
global.fetch = jest.fn()
// make sure the right url is called
when(global.fetch).calledWith('/api/v1/show/1').mockReturnValue(
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('the generated qr code'),
  })
)


// this function let some time pass to allow for example the component to re-render
function wait() {
    return new Promise((resolve) => setTimeout(resolve));
}

describe('NDEFScan', () => {
  it('renders a descriptive text and a scan button', async () => {
    const wrapper = shallow(<NDEFScan />);
    expect(wrapper.state().success).toEqual(false);
    expect(wrapper.state().error).toEqual(false);
    expect(wrapper.find('h5').text())
      .toBe('Scan only on chrome on Android(TODO CHECK)');
    expect(wrapper.find('button').text()).toBe('Scan');

  });

  it('clicking the scan button calls a scan function', async () => {
    let spy = jest.spyOn(NDEFScan.prototype, 'scanButtonOnClick')
         .mockImplementation(() => true)

    const wrapper = shallow(<NDEFScan />);
    let  button = wrapper.find('button')
    button.simulate("click")
    expect(spy).toHaveBeenCalled()

  });

  it('scans an nfc and sends it to the api server', async () => {
    console.log('TODO: test that the scan buttonsend the message to the api server. may be tricky beacause of NDEFReader')

  });
});

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
// make sure the right url is fetched
when(global.fetch).calledWith('/api/v1/show/1').mockReturnValue(
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('the generated qr code'),
  })
)

// makes sure that when the save api is posted with certain header and data,
// fetch returns a successfull promise
when(global.fetch).calledWith('/api/v1/save_ndef_message/1',{
  method: "POST",
  headers: {
    "X-CSRF-Token": 'token',
    "Content-Type": "application/json"
  },
  data: { message: 'message',
          serial_number: 'serialNumber'
        }
}).mockReturnValue(
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({response: 'the response'}),
  })
)

// returns a csrf-token
jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
  if (selector == 'meta[name="csrf-token"]') {
    return {content: 'token'};
  }
});

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

  test('sendNdefMessage send a message and updates the state', async () => {
    // mimic the props content
    let match = {params: {id: '1'}}
    const wrapper = shallow(<NDEFScan match={match}/>);
    const instance = wrapper.instance();
    // check that the initialization is correct
    expect(wrapper.state('success')).toEqual(false);
    expect(wrapper.state('error')).toEqual(false);
    // call the function
    instance.sendNdefMessage('message', 'serialNumber');
    // check that the function calls querySelector for the token
    expect(document.querySelector).toBeCalledTimes(1);

    await wait();
    wrapper.update();
    // check that at the end we have a new successfull state
    expect(wrapper.state('success')).toEqual(true);
    expect(wrapper.state('error')).toEqual(false);
  });
});

# frozen_string_literal: true

require 'test_helper'

class QrCodeLinkControllerTest < ActionDispatch::IntegrationTest
  test '#show an existing QrCodeLink' do
    expect_any_instance_of(RQRCode::QRCode).to receive(:as_svg)
      .and_return('SVG')
    qr_code = QrCodeLink.first
    get(show_path_url(qr_code))
    assert_response :success
    assert_match('SVG', response.parsed_body)
    ndef_message = qr_code.ndef_messages.first
    assert_match('List of the tags', response.parsed_body)
    assert_match(ndef_message.message, response.parsed_body)
    assert_match(ndef_message.serial_number, response.parsed_body)
  end

  test '#scan an existing QrCodeLink' do
    qr_code = QrCodeLink.first
    get(scan_path_url(qr_code))
    assert_response :success
    assert_match('Scan', response.parsed_body)
    # TODO: test the scan button, NDEFReader is an issue
  end

  test '#save_ndef_message add an NdefMessage to a QrCodeLink '\
       'and redirects to #show' do
    qr_code = QrCodeLink.first
    data = { message: 'test message',
             serial_number: 'test serial number' }
    n_messages_before = qr_code.ndef_messages.count
    post(save_ndef_message_path_url(qr_code), params: data)
    assert_response :found
    follow_redirect!
    assert_equal 200, status
    assert_match path, confirm_path_url(qr_code)
    assert_match('Your scan was successfully saved.', response.parsed_body)

    assert_equal qr_code.ndef_messages.count, n_messages_before + 1
    assert_equal qr_code.ndef_messages.last.message, data[:message]
    assert_equal qr_code.ndef_messages.last.serial_number, data[:serial_number]
  end
end

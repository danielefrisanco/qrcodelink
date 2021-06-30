# frozen_string_literal: true

require 'test_helper'

class QrCodeLinkControllerTest < ActionDispatch::IntegrationTest
  test '#show an existing QrCodeLink' do
    assert_equal 2, QrCodeLink.count
    qr_code = QrCodeLink.first
    get(show_path_url(qr_code))
    assert_response :success
    assert_match('List of the tags', response.parsed_body)
    assert_match(qr_code.ndef_messages.first.message, response.parsed_body)
    assert_match(qr_code.ndef_messages.first.serial_number, response.parsed_body)
  end
  # test show with correct id
  # test show without correct id
  # test scan with  correct id
  # test scan without correct id
  # test save_ndef_message with correct id
  # test save_ndef_message without correct id
  # test the flow and the content of the pages
  # mock the ndef js
end

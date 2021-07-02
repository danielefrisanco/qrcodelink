# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class QrCodeLinkControllerTest < ActionDispatch::IntegrationTest
      test '#show an existing QrCodeLink' do
        expect_any_instance_of(RQRCode::QRCode).to receive(:as_svg)
          .and_return('SVG'.to_json)
        qr_code = QrCodeLink.first
        get(api_v1_show_path_url(qr_code), as: :json)
        assert_response :success
        assert_equal('SVG', response.parsed_body)
      end

      test '#index all QrCodeLink' do
        get(api_v1_index_path_url, as: :json)
        assert_response :success
        assert_equal(QrCodeLink.all.as_json, response.parsed_body)
      end

      test '#save_ndef_message add an NdefMessage to a QrCodeLink' do
        qr_code = QrCodeLink.first
        data = { message: 'test message',
                 serial_number: 'test serial number' }
        n_messages_before = qr_code.ndef_messages.count
        post(api_v1_save_ndef_message_path_url(qr_code), params: data, as: :json)
        assert_response :ok
        qr_code.ndef_messages.reload
        assert_equal(qr_code.ndef_messages.last.as_json, response.parsed_body)

        assert_equal qr_code.ndef_messages.count, n_messages_before + 1
        assert_equal qr_code.ndef_messages.last.message, data[:message]
        assert_equal qr_code.ndef_messages.last.serial_number, data[:serial_number]
      end
    end
  end
end

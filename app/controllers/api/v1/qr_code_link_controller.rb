# frozen_string_literal: true

require 'rqrcode'

# This controller contains the logic of the qr code link pages
module Api
  module V1
    # QrCodeLinkController
    class QrCodeLinkController < ApplicationController
      def index
        render json: QrCodeLink.all
      end

      # This action renders a Qr code
      def show
        qr_code_link = QrCodeLink.find(params_id)
        svg = generate_scan_svg(qr_code_link)
        if svg
          render json: svg.html_safe
        else
          render json: ['Error']
        end
      end

      # This action save the ndef_message
      def save_ndef_message
        qr_code_link = QrCodeLink.find(params_id)
        ndef_message = qr_code_link.ndef_messages.create(params_ndef_message)
        if ndef_message
          render json: ndef_message
        else
          render json: ndef_message.errors
        end
      end

      private

      # Returns the id from the params
      # @return The requested id
      def params_id
        params.require(:id)
      end

      # Returns message and serial_number from the params
      # @return The message and serial_number of the scanned nfc
      def params_ndef_message
        params.permit(:message, :serial_number)
      end

      # Generates an svg image to the scan page url
      # @param [QrCodeLink] qr_code_link The object that gives the link
      # @return [String] A standalone SVG
      def generate_scan_svg(qr_code_link)
        # TODO: add ndef_scan to routes to have the correct url path
        qrcode = RQRCode::QRCode.new("#{root_url}ndef_scan/#{qr_code_link.id}")

        qrcode.as_svg(
          color: '000',
          shape_rendering: 'crispEdges',
          module_size: 11,
          standalone: true,
          use_path: true
        )
      end
    end
  end
end

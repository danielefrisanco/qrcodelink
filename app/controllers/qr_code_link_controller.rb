# frozen_string_literal: true

require 'rqrcode'

# This controller contains the logic of the qr code link pages
class QrCodeLinkController < ApplicationController
  # This action renders a Qr code
  def show
    qr_code_link = QrCodeLink.find(params_id)

    @svg = generate_scan_svg(qr_code_link)

    @ndef_messages = qr_code_link.ndef_messages.to_a

    render(:show)
  end

  # This action renders a page where to read a NFC
  def scan
    @qr_code_link = QrCodeLink.find(params_id)
  end

  # This action save the ndef_message
  def save_ndef_message
    qr_code_link = QrCodeLink.find(params_id)
    redirect_to(:show_path, id: params_id) if qr_code_link.ndef_messages.create(params_ndef_message)
  end

  private

  # Returns the id from the params
  def params_id
    params.require(:id)
  end

  # Returns message and serial_number from the params
  def params_ndef_message
    params.permit(:message, :serial_number)
  end

  # Generates an svg image to the scan page url
  # @param [QrCodeLink] qr_code_link The object that gives the link
  # @return [String] A standalone SVG
  def generate_scan_svg(qr_code_link)
    qrcode = RQRCode::QRCode.new(scan_path_url(qr_code_link))

    qrcode.as_svg(
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 11,
      standalone: true,
      use_path: true
    )
  end
end

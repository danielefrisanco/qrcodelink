require "rqrcode"

# This controller contains the logic of the qr code link pages
class QrCodeLinkController < ApplicationController

  # This action renders a Qr code
  def show
    qr_code_link = QrCodeLink.find(params_id)
    qrcode = RQRCode::QRCode.new(scan_path_url(qr_code_link))

    @ndef_messages = qr_code_link.ndef_messages.to_a

    # NOTE: showing with default options specified explicitly
    @svg = qrcode.as_svg(
      color: "000",
      shape_rendering: "crispEdges",
      module_size: 11,
      standalone: true,
      use_path: true
    )

    render :show
  end

  # This action renders a page where to read a NFC
  def scan
    @qr_code_link = QrCodeLink.find(params_id)
  end

  # This action save the ndef_message
  def save_ndef_message

    qr_code_link = QrCodeLink.find(params_id)
    if qr_code_link.ndef_messages.create(params_ndef_message)
      redirect_to :show_path, id: params_id
    end
  end

  private

  def params_id
    params.require(:id)
  end

  def params_ndef_message
    params.permit(:message, :serial_number)
  end
end

require "rqrcode"
class QrCodeLinkController < ApplicationController
  def show
    qr_code_link = QrCodeLink.find(params[:id])
    qrcode = RQRCode::QRCode.new(scan_path_url(qr_code_link))

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

  def scan
    qr_code_link = QrCodeLink.find(params[:id])

  end

  private

  def permitted_params
    params.require(:id)
  end
end

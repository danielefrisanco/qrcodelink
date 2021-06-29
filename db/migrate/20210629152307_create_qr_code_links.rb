class CreateQrCodeLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :qr_code_links do |t|

      t.timestamps
    end
  end
end

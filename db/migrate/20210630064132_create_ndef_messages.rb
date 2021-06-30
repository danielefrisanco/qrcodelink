class CreateNdefMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :ndef_messages do |t|
      t.string :serial_number
      t.text :message
      t.belongs_to :qr_code_link, null: false, foreign_key: true

      t.timestamps
    end
  end
end

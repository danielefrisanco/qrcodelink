# frozen_string_literal: true

# Creates the table ndef_messages
class CreateNdefMessages < ActiveRecord::Migration[6.1]
  def change
    create_table(:ndef_messages, id: :uuid) do |t|
      t.string(:serial_number)
      t.text(:message)
      t.belongs_to(:qr_code_link, null: false, foreign_key: true, type: :uuid)

      t.timestamps
    end
  end
end

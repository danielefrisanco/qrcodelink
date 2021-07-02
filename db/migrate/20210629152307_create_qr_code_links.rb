# frozen_string_literal: true

# Creates the table qr_code_links
class CreateQrCodeLinks < ActiveRecord::Migration[6.1]
  def change
    create_table(:qr_code_links, id: :uuid, &:timestamps)
  end
end

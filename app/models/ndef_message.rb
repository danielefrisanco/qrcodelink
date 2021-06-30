# frozen_string_literal: true

class NdefMessage < ApplicationRecord
  belongs_to :qr_code_link
end

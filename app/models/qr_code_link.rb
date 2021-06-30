# frozen_string_literal: true

class QrCodeLink < ApplicationRecord
  has_many :ndef_messages, dependent: :destroy
end

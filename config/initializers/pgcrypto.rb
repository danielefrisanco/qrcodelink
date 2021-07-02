# frozen_string_literal: true

require 'active_record/pgcrypto'
# Replace the default environment variable name with your own value/key.
ActiveRecord::PGCrypto::SymmetricCoder.pgcrypto_key = ENV['PGCRYPTO_SYM_KEY']

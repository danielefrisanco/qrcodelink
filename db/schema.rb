# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_30_064132) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ndef_messages", force: :cascade do |t|
    t.string "serial_number"
    t.text "message"
    t.bigint "qr_code_link_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["qr_code_link_id"], name: "index_ndef_messages_on_qr_code_link_id"
  end

  create_table "qr_code_links", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "ndef_messages", "qr_code_links"
end

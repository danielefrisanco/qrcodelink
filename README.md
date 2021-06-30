# README

This application has the only purpose to help the reading process for a NFC
to o so it provides a qr code link to a scan page that can be opened on an Android device.
After scanning the NDEF message is saved in the database

* Ruby version
it uses ruby 3.0.1 and rails 6.1.4
* System dependencies

* Configuration

* Database
rails db:create db:migrate db:seed

* How to run the test suite
rails test


* Deployment instructions
rails s

* Documentation
rdoc --main README.md --title 'QRCode app' README.md app/**/qr_code_link_c*.rb

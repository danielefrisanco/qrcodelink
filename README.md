# README

This application has the only purpose to help the reading process for a `NFC`
to o so it provides a qr code link to a scan page that can be opened on an Android device.
After scanning the `NDEF` message is saved in the database

## Ruby version

It uses ruby 3.0.1 and rails 6.1.4


## System dependencies

## Configuration

## Database

rails db:create db:migrate db:seed

## How to run the test suite

* rails test
* yarn jest

## Deployment instructions

rails s

Go to http://localhost:3000/

## Documentation

rake yard


# TODO:

* complete jest tests for react pages(new to jest and I find it quite cumbersome)

* divide front end app from back end to prepare for docker(make sure the test are completed)

* docker and docker-compose

* add create QrCodeLink (low priority)

* show scanned NFCs (low priority)

* use rspec for the tests

* better css style

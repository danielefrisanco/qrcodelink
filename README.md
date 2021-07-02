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

rails test

## Deployment instructions

rails s

Go to http://localhost:3000/

## Documentation

rake yard


# TODO:

* add jest tests for react pages

* add create QrCodeLink (low priority)

* show scanned NFCs (low priority)

* use rspec for the tests

* better css style

* docker and docker-compose

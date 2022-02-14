#!/usr/bin/env bash

yarn --cwd ./connectors/sourcecred/instance  install
npm --prefix ./connectors/coordinApe install
npm --prefix ./connectors/poap install
npm --prefix ./connectors/github install
npm --prefix ./connectors/discord install
npm --prefix ./connectors/sourcecred/server install

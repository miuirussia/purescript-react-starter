#!/usr/bin/env bash

set -euo pipefail

WORK_DIR="$(pwd)"
PURS_VER="$(yarn --silent jqn '.nativeDependencies.purescript' < "$WORK_DIR"/package.json)"
SPAGO_VER="$(yarn --silent jqn '.devDependencies.spago' < "$WORK_DIR"/package.json)"
TEMP_DIR="$(mktemp -d)"
trap "rm -rf $TEMP_DIR" EXIT

function install_spago() {
  echo "Compiling spago from source..."
  git clone "https://github.com/purescript/spago.git" --branch "$SPAGO_VER" "$TEMP_DIR"
  pushd "$TEMP_DIR"
  ./scripts/fetch-templates
  stack build
  stack install --local-bin-path "$WORK_DIR/node_modules/.bin"
  popd
  echo "Using spago compiled from source"
}

yarn install-purescript "--purs-ver=$PURS_VER"
mv "$WORK_DIR/purs" "$WORK_DIR/node_modules/.bin/purs"
("$WORK_DIR"/node_modules/.bin/spago version > /dev/null && echo "Using precompiled spago from npm") || install_spago

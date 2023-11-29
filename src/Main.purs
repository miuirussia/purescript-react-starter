module Main (main) where

import Prelude

import App (mkApp)
import App.Foreign.React (getRoot)

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Exception (catchException, throw)
import Effect.Console as Console
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML as H
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window as W

import React.Basic.DOM.Client (renderRoot)
import React.Basic.Hooks (fragment)
import React.Basic.StrictMode (strictMode)

main :: Effect Unit
main = catchException Console.errorShow do
  window <- H.window
  document <- W.document window
  root <- getElementById "app" $ toNonElementParentNode document
  case root of
    Nothing -> throw "Could not find container element"
    Just container -> do
      app <- mkApp
      reactRoot <- getRoot container
      renderRoot reactRoot
        $ strictMode
        $ fragment
            [ app unit ]

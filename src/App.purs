module App (mkApp) where

import Prelude

import React.Basic.DOM as R
import React.Basic.DOM.Events (capture_)
import React.Basic.Hooks (Component, (/\))
import React.Basic.Hooks as React

mkApp :: Component Unit
mkApp = do
  React.component "App" \_ -> React.do
    state /\ setState <- React.useState 0

    pure $ R.div_
      [ R.button { onClick: capture_ $ setState (\prev -> prev - 1), children: [ R.text "decrement" ] }
      , R.text $ show state
      , R.button { onClick: capture_ $ setState (\prev -> prev + 1), children: [ R.text "increment" ] }
      ]

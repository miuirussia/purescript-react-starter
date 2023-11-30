module App.Components.Test where

import Prelude

import React.Basic.DOM as R
import React.Basic.Hooks (Component)
import React.Basic.Hooks as React

mkComponent :: Component Unit
mkComponent = do
  React.component "Test" \_ -> React.do
    pure $ R.div_ [ R.text "Loaded text" ]

module App (mkApp) where

import Prelude

import App.Components.Test (mkComponent)
import App.DynamicImport (dynamicImport)

import Control.Promise (toAffE)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Unsafe (unsafePerformEffect)

import React.Basic.DOM as R
import React.Basic.DOM.Events (capture_)
import React.Basic.Hooks (Component, (/\))
import React.Basic.Hooks as React

mkApp :: Component Unit
mkApp = do
  React.component "App" \_ -> React.do
    state /\ setState <- React.useState 0
    component /\ setComponent <- React.useState' Nothing

    let
      handleLoad :: Effect Unit
      handleLoad = launchAff_ do
        lazyComponent <- toAffE (dynamicImport mkComponent)
        liftEffect $ setComponent $ Just $ unsafePerformEffect lazyComponent

    pure $ R.div_
      [ R.button { onClick: capture_ $ setState (\prev -> prev - 1), children: [ R.text "decrement" ] }
      , R.text $ show state
      , R.button { onClick: capture_ $ setState (\prev -> prev + 1), children: [ R.text "increment" ] }
      , case component of
          Just renderComponent -> renderComponent unit
          Nothing -> R.button { onClick: capture_ handleLoad, children: [ R.text "Load component" ] }
      ]

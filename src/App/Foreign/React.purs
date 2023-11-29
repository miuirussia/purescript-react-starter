module App.Foreign.React (getRoot, getPortalHost, unsafeEmptyRef, emptyRef, unsafeUndefinedProperty) where

import Data.Nullable (Nullable)
import Effect (Effect)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Web.DOM (Element, Node)

import React.Basic.DOM.Client (ReactRoot)
import React.Basic.Hooks (Ref)

getRoot :: Element -> Effect ReactRoot
getRoot = runEffectFn1 _getRoot

foreign import _getRoot :: EffectFn1 Element ReactRoot

foreign import getPortalHost :: Effect Element

foreign import unsafeEmptyRef :: forall node. Ref node

foreign import emptyRef :: Ref (Nullable Node)

foreign import unsafeUndefinedProperty :: forall a. a

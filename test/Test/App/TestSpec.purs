module Test.App.TestSpec where

import Prelude

import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

spec :: Spec Unit
spec = describe "App.TestSpec" do
  describe "cx" do
    it "should equal" do
      10.0 `shouldEqual` 10.0

let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.13-20231201/packages.dhall
        sha256:706a855400108a03b35bd37afe7f50802deed882c555171d266338d4694ddbe8

let jsonHelpers =
      { json-helpers =
        { dependencies =
          [ "arrays"
          , "exists"
          , "profunctor"
          , "strings"
          , "quickcheck"
          , "lcg"
          , "transformers"
          , "foldable-traversable"
          , "exceptions"
          , "node-fs"
          , "node-buffer"
          , "node-readline"
          , "datetime"
          , "now"
          ]
        , repo =
            "https://github.com/input-output-hk/purescript-bridge-json-helpers.git"
        , version = "0ff78186a949722f37218046a09abdf27d77ecfe"
        }
      }

let specDiscovery =
      { spec-discovery =
        { dependencies =
          [ "aff"
          , "aff-promise"
          , "effect"
          , "foldable-traversable"
          , "prelude"
          , "spec"
          ]
        , repo =
            "https://github.com/purescript-spec/purescript-spec-discovery.git"
        , version = "6cbedc3860bad606a02f7eacba1c3e41afd9f04f"
        }
      }

in  (upstream // jsonHelpers // specDiscovery)
  with react-basic-dom.version = "12cc426327de615614a86925ced5cd2c303e05ed"
  with routing-duplex.repo
       = "https://github.com/miuirussia/purescript-routing-duplex.git"
  with routing-duplex.version = "v0.8.3"

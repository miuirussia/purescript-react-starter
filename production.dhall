let config = ./spago.dhall
in config // { backend = "purs-backend-es build --output-dir ./output --int-tags" }

module {{ComponentWithNamespace}}.State exposing (..)

import User.Types exposing (..)

initialState = {}

update msg model =
    case msg of
        Action ->
          ( model, Cmd.none )

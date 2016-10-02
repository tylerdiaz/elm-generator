module {{ComponentWithNamespace}}.State exposing (..)

import {{ComponentWithNamespace}}.Types exposing (..)

initialState = {}

update msg model =
    case msg of
        ActionName ->
          ( model, Cmd.none )

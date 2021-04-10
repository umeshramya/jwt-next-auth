import React from 'react'
import {FormDelete} from "reactstrap-react-lib"

function ProtectedRoute() {
    return (
        <FormDelete
            id="1"
            curUri = "api/validate-user-route"
            onSuccess = {(res)=>  res.data.mes}
            onError = {err=>err.response.data}
        />
    )
}

export default ProtectedRoute

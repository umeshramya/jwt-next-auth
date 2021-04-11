import React, {useState} from 'react'
import {FormSubmit} from "reactstrap-react-lib"
import {Container, Row, Col, Input, FormGroup, Label} from "reactstrap"

function ValidateUser() {
    let init={name:""}
    const [InputObj, setInputObj]=useState(init)
    return (
        <>
        <h3>Validate User</h3>
            <FormSubmit
                Inputs={
                    <>
                     <FormGroup>
                         <Label>Submit succeessful for only variefied user</Label>
                         <Input type="text" value={InputObj.name} onChange = {e=>setInputObj({name : e.target.value})}/>
                     </FormGroup>
                    </>
                }
                curObj={InputObj}
                curUri={"/api/validate-user"}
                onSuccess={e=>e.data.mes}
                onError={e=>e.response.data}


            />

        </>
    )
}

export default ValidateUser

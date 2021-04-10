import React,{useState} from 'react'
import {FormSubmit} from "reactstrap-react-lib"
import {Container, Row, Col, FormGroup, Label, Input} from "reactstrap"

function CreateToken() {
    let initialState = {
        payload : ""
    }
    const [InputObj, setInputObj] = useState(initialState)
    return (
        <Container>
            <h3>Create token</h3>
            <Row>
                <Col>
                    <FormSubmit
                    
                        Inputs={
                        <>
                            <FormGroup>
                                <Label>payload</Label>
                                <Input type="text" value= {InputObj.payload} onChange={e=>setInputObj({...InputObj, payload: e.target.value})}/>
                            </FormGroup>
                        </>}
                        curObj={InputObj}
                        curUri = "/api/create-token"
                        onSuccess = {e=>e.data.mes}
                        onError = {e=>e.response.data}
                    />
                
                </Col>
            </Row>
        </Container>
    )
}

export default CreateToken

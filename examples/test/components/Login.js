import React, {useState} from 'react'
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap"
import { FormSubmit } from "reactstrap-react-lib"

function Login() {
    let initialState = {
        username: "", password: ""
    }
    const [InputObj, setInputObj] = useState(initialState)
    return (
        <>
            <Row>
                <Col>
                    <FormSubmit
                        Inputs={
                            <>
                            <FormGroup>
                                <Label>User Name</Label>
                                <Input type="text" value={InputObj.username} onChange={e => setInputObj({ ...InputObj, username: e.target.value })} required={true} />
                            </FormGroup>
                            <FormGroup>
                            <Label>password</Label>
                            <Input type="password" value={InputObj.password} onChange={e => setInputObj({ ...InputObj, password: e.target.value })} required={true} />
                        </FormGroup>
                        </>
                        }

                        curUri="/api/login"
                        curObj = {InputObj}
                        reset = {()=>setInputObj(initialState)}
                        onSuccess={(r)=>console.log(r.data.mes)}
                        onError = {(er)=>console.log(er.response.data)}

                    />
                </Col>
            </Row>

        </>
    )
}

export default Login

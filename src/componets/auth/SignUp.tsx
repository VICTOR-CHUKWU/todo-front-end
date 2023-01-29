import React, { useState } from 'react';
import { formdata } from "../../types";
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../services/auth.service';
import { saveToken } from '../../utils';

const SignUp = () => {
    const [formdata, setFormData] = useState<formdata>({
        username: '',
        email: '',
        password: ''
    });
    const [submiting, setSubmiting] = useState(false);
    let navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData({
            ...formdata,
            [name]: value
        })
    };

    const handleSubmit = async () => {
        setSubmiting(true)
        if (formdata.email && formdata.password && formdata.username) {
            signUp(formdata)
                .then((res) => {
                    return res.data
                }).then((respo) => {
                    console.log(respo, 'respo');
                    if (respo.accessToken) {
                        saveToken(respo.accessToken)
                        navigate("/");
                    } else {
                        setSubmiting(false)
                    }
                })

        } else {
            alert('Please write item');
        }
    };
    return (
        <div className='todo-body'>
            <h5 className='form-header'>Register to enjoy app</h5>

            <div className='text-center bg-transparent'>
                <input type="text" placeholder="username" name='username' value={formdata.username} onChange={onChange} className="input-auth" autoComplete='off' />
                <input type="email" placeholder="email" name='email' value={formdata.email} onChange={onChange} className="input-auth" />
                <input type="password" placeholder="*******" name='password' value={formdata.password} onChange={onChange} className="input-auth" />
                {/* <div className=''> */}
                <button className='form-submit-btn' type='submit' onClick={() => handleSubmit()}>Submit</button>
                {/* </div> */}
                <span>already have an account?   <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>login</Link></span>
            </div>
        </div>
    )
}

export default SignUp
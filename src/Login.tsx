import BandhanMutual from './images/BandhanMutual.png';
import './Login.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';

const Login = () => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        const { email, password } = data as { email: string; password: string; };

        const response = await fetch('/api/account/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { role } = await response.json();
            setUserRole(role);
            navigate(`/${role}`);
        } else {
            // Handle login error
        }
    };



    return (
    <div className="main-container">
        <form className = "login-form" onSubmit={handleSubmit(onSubmit)}>
            <img src={BandhanMutual} className="logo"/>
            <h2 className='login-text'>Staff Login</h2>
            <div className="form-control">
                <input
                    type="text"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Email is not valid."
                        }
                    })}
                    placeholder="Email"
                />
                {errors.email && <p className='error-msg'>{String(errors.email.message)}</p>}
            </div>
            <div className="form-control">
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    placeholder="Password"
                />
                {errors.password && (
                    <p className='error-msg'>{String(errors.password.message)}</p>
                )}
            </div>
            <div className="form-control">
                <label />
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
   )
}

export { Login } 

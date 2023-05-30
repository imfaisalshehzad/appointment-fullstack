import {useForm, Controller, SubmitHandler} from "react-hook-form";
import Image from 'next/image';
import cccircular from "../../public/cccircular.svg";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

function Login() {
    const navigate = useRouter()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const onSubmit = async data => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND + '/auth/login', {
                email: data.email,
                password: data.password,
            });
            if (res.status != 200) {
                toast.error(res.data.message)
            } else {
                axios.defaults.headers.common['Authorization'] = `${res.data.jwt}`;
                navigate.push('/dashboard')
            }
        } catch (e) {
            toast.error(e?.response.data.message)
        }
    }
    return (
        <section className="Login">
            <div className="row">
                <div className="signup_grid">
                    <div className="left">
                        <Image
                            priority
                            src={cccircular}
                            alt="img"
                        />
                    </div>
                    <div className="right">
                        <div className="signup_block">
                            <h2>Log in</h2>
                            <span className="normal_text signup_intro">Enter your account details to login</span>
                            <div className="signup_form">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form_grid">
                                        <div className="input_holder bordered_input full_input">
                                            <label htmlFor="">Email</label>
                                            <input {...register("email")} type="email" name="email"
                                                   placeholder="E-mail address"
                                                   id="id_login"/>
                                        </div>
                                        <div className="input_holder bordered_input full_input">
                                            <label htmlFor="">Password</label>
                                            <input type="password" name="password" placeholder="Password" required=""
                                                   id="id_password" {...register("password")} />
                                        </div>
                                    </div>
                                    <div className="signup_form_action">
                                        <button type="submit" className="btn">Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login

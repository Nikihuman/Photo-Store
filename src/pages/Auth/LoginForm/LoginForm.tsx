import {  useEffect, useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { Input } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import cn from 'classnames';
import styles from './LoginForm.module.scss';
import { LoginFormProps } from './LoginForm.props';
import { MouseEvent } from 'react';
import { IPasswordVisibility } from '../../../helpers/other';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm } from '../../../helpers/login.interface';
import EyeOffIcon from '../../../assets/eye-off.svg?react';
import EyeOnIcon from '../../../assets/eye-on.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { userActions } from '../../../store/user.slice';
import { RootState } from '../../../store/store';
import { PASSWORD_ERROR_MESSAGE } from '../../../helpers/API';

export function LoginForm ({className ,...props}:LoginFormProps) {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const {jwt} = useSelector((s: RootState)=>s.user);
	const loginErrorMessages = useSelector((s: RootState)=>s.user.loginErrorMessages);

	const [visibility, setVisibility] = useState<IPasswordVisibility>({
		type: 'password'
	});
	const { register, handleSubmit } = useForm<ILoginForm>();

	const change_password_visibility = (e: MouseEvent<HTMLButtonElement>)=>{
		e.preventDefault();
		if(visibility.type === 'password'){
			return setVisibility({type: 'text'});
		}
		setVisibility({type: 'password'});
	};
	const submit: SubmitHandler<ILoginForm> = (data) =>{
		dispatch(userActions.clearErrorsMessages());
		dispatch(userActions.login(data));
	};

	const error: SubmitErrorHandler<ILoginForm> = (data) =>{
		dispatch(userActions.clearErrorsMessages());
		dispatch(userActions.addLoginErrorsMessages({
			email: data.email?.message ? data.email.message : '',
			password: data.password?.message ? data.password.message : ''
		}));
	};
	useEffect(()=>{
		if(jwt){
			navigate('/');
		}
	},[jwt, navigate]);
			
	return(
		<Form className={cn(className, styles.form)} {...props} onSubmit={handleSubmit(submit, error)}>
			<h1 className={cn(styles.title)}>LOGIN</h1>
			<Input
				type='email'
				id='email'
				lable='Enter email'
				placeholder='Email'
				error_message={loginErrorMessages.email}
				error_text_position={{left: '23.5em'}}
				{...register('email',
					{
						required: {
							value: true,
							message: 'Email not entered'
						}
					}
				)}
			/>
			<div className={cn(styles.input_password_wrapper)}>
				<Input
					type={visibility.type}
					id='password'
					lable='Enter password'
					placeholder='Password'
					error_message={loginErrorMessages.password}
					error_text_position={{left: '23.5em'}}
					{...register('password',
						{
							required: 
						{
							value: true,
							message: PASSWORD_ERROR_MESSAGE
						},
							minLength: {
								value: 8,
								message: PASSWORD_ERROR_MESSAGE
							},
							pattern: {
								value: /^[^\s]*$/,
								message: PASSWORD_ERROR_MESSAGE
							}
						}
					)}
				/>
				<Button onClick={change_password_visibility} className={cn(styles.change_password_visibility)}>
					{visibility.type === 'password' ? <EyeOffIcon/> : <EyeOnIcon/>}
				</Button>
			</div>
			<Button className={cn(styles.submit_button)}>SUBMIT</Button>
			<div className={cn(styles.redirect_to_registeration)}>
				<span>Or if you have't a profile</span>
				<Link to='/auth/register'>Sign Up</Link>
			</div>
			<div className={cn(styles.redirect_to_main)}>
				<Link to='/'>Continue without authorization</Link>
			</div>
		</Form>
	);
}

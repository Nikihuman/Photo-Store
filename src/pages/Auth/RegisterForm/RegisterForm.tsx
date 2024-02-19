import {  useEffect, useState } from 'react';
import { Form } from '../../../components/Form/Form';
import { Input } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import cn from 'classnames';
import styles from './RegisterForm.module.scss';
import { RegisterFormProps } from './RegisterForm.props';
import { MouseEvent } from 'react';
import { IPasswordVisibility } from '../../../helpers/other';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import EyeOffIcon from '../../../assets/eye-off.svg?react';
import EyeOnIcon from '../../../assets/eye-on.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { IRegisterForm } from '../../../helpers/register.interface';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user.slice';
import { PASSWORD_ERROR_MESSAGE } from '../../../helpers/API';


export function RegisterForm ({className ,...props}:RegisterFormProps) {
	const [visibility, setVisibility] = useState<IPasswordVisibility>({
		type: 'password'
	});
	const navigate = useNavigate();
	const jwt = useSelector((s: RootState)=>s.user.jwt);
	const registerErrorMessages = useSelector((s: RootState)=>s.user.registerErrorMessages);
	const dispatch = useDispatch<AppDispatch>();
	const { register, handleSubmit } = useForm<IRegisterForm>();

	const change_password_visibility = (e: MouseEvent<HTMLButtonElement>)=>{
		e.preventDefault();
		if(visibility.type === 'password'){
			return setVisibility({type: 'text'});
		}
		setVisibility({type: 'password'});
	};
	const submit: SubmitHandler<IRegisterForm> = (data) =>{
		dispatch(userActions.clearErrorsMessages());
		dispatch(userActions.register(data));
	};
	const error: SubmitErrorHandler<IRegisterForm> = (data) =>{
		dispatch(userActions.clearErrorsMessages());
		dispatch(userActions.addRegisterErrorsMessages({
			email: data.email?.message ? data.email.message : '',
			password: data.password?.message ? data.password.message : '',
			name: data.name?.message ? data.name.message : ''
		}));
	};
	useEffect(()=>{
		if(jwt){
			navigate('/');
		}
	},[jwt, navigate]);
	
	return(
		<Form className={cn(className, styles.form)} {...props} onSubmit={handleSubmit(submit, error)}>
			<h1 className={cn(styles.title)}>REGISTERATION</h1>
			<Input
				type='email'
				id='email'
				lable='Enter email'
				placeholder='Email'
				error_message={registerErrorMessages.email}
				error_text_position={{left: '23.5em', top: '1.5em'}}
				{...register('email',
					{
						required: {
							value: true,
							message: 'Email not entered'
						}
					}
				)}
			/>
			<Input
				type='text'
				id='text'
				lable='Enter name'
				placeholder='Name'
				error_message={registerErrorMessages.name}
				error_text_position={{left: '23.5em'}}
				{...register('name',
					{
						required: {
							value: true,
							message: 'The field \'name\' must be a string, and the length of the \'name\' field must be 2 or more characters'
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
					error_message={registerErrorMessages.password}
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
			<div className={cn(styles.redirect_to_login)}>
				<span>Or if you already have a profile</span>
				<Link to='/auth/login'>Sign In</Link>
			</div>
			<div className={cn(styles.redirect_to_main)}>
				<Link to='/'>Continue without authorization</Link>
			</div>
		</Form>
	);
}

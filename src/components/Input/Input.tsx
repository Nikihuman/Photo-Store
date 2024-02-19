import { forwardRef } from 'react';
import { InputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.scss';



export const Input = forwardRef<HTMLInputElement, InputProps> (function Input ({className, error_text_position, ...props}, ref) {
	return(
		<div className={cn(styles.input_wrapper, className)}>
			<label className={cn(styles.label)} htmlFor={props.id}>{props.lable}</label>
			<input className={cn(styles.input, {[styles.invalid]: props.error_message})} ref={ref} {...props}/>
			{props.error_message && 
			<div className={cn(styles.errorText)}
				style={{
					bottom: error_text_position?.bottom,
					left: error_text_position?.left,
					right:error_text_position?.right,
					top: error_text_position?.top}}>
				<span>{props.error_message}</span>
			</div>}
			{props.children}
		</div>
		
	);
});
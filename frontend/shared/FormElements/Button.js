import React from 'react';
import Link  from 'next/link';

import styles from './Button.module.css';
const Button = props => {
  if (props.href) {
    return (
      <a
        className={[styles[`button button--${props.size || 'default'}`], styles[`${props.inverse &&
          'button--inverse'}`], styles[`${props.danger && 'button--danger'}`]].join(' ')}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link href={props.to}>
        <button className={[styles[`button`],styles[` button--${props.size || 'default'}`], styles[`${props.inverse &&
        'button--inverse'}`] ,styles[`${props.danger && 'button--danger'}`]].join(' ')}>
      
        {props.children}
    
      </button>
      </Link>
      
    );
  }
  return (
    <button
      className={[styles[`button`], styles[`button--${props.size || 'default'}`], styles[`${props.inverse &&
        'button--inverse'}`], styles[`${props.danger && 'button--danger'}`]].join(' ')}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React from 'react'
import Modal from './Modal'
import {NavLink} from 'react-router-dom'

import styles from './LoginRequired.module.css';

function LoginRequired({display, onClose}) {
    if(!display) return null;
    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles['account-required-container']}>
                <div className={styles['account-required-message']}>Please Create an Account or Login to Continue</div>
                <div className={styles['account-required-redirect-buttons-container']}>
                    <NavLink to={'/signup-page'}>
                        <button className={styles['account-required-redirect-signup']}>Sign Up</button>
                    </NavLink>
                    <NavLink to={'/login-page'}>
                        <button className={styles['account-required-redirect-login']}>Login</button>
                    </NavLink>
                </div>
            </div>
        </Modal>
    )
}

export default LoginRequired

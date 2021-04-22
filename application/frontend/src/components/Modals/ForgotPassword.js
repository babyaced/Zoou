import React, { useState } from 'react'

import Modal from './Modal'

import styles from './ForgotPassword.module.css'

function ForgotPassword({display,onClose}) {
    
    const [email, setEmail] = useState('');


    return (
        <Modal display={display} onClose={onClose}>
            <form className={styles['reset-password-container']}>
                <div className={styles['reset-password-header']}> Reset Password</div>
                <input type="email" className={styles['reset-password-email-field']} placeholder="Enter your email address" required onChange={(e)=>setEmail(e.target.value)}/>
                <button type="submit" class={styles['reset-password-button']}>Reset Password</button>
            </form>
        </Modal>
        
    )
}

export default ForgotPassword

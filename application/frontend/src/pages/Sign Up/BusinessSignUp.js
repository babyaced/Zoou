import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './BusinessSignUp.module.css';

function BusinessSignUpPage() {

    return (
        <form className={styles['business-form']}>
            <div className={styles['business-container']}>
                <h1>Business Sign Up</h1>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['email-input-label']} for='email'><h3>Email</h3></label>
                            <input
                                type='email'
                                placeholder='Enter email'
                                name='email'
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['username-input-label']} for='uname'><h3>Username</h3></label>
                            <input
                                type='username'
                                placeholder='Enter username'
                                name='uname'
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['password-input-label']} for='psw'><h3>Password</h3></label>
                            <input
                                type='password'
                                placeholder='Enter password'
                                name='psw'
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['repeat-password-input-label']} for='psw-repeat'><h3>Confirm Password</h3></label>
                            <input
                                type='password'
                                placeholder='Repeat password'
                                name='psw-repeat'
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={styles['input-container']}>
                            <label className={styles['fname-input-label']} for='fname'><h3>First Name</h3></label>
                            <input
                                type='text'
                                placeholder='First name'
                                name='fname'
                            />
                        </div>

                        <div className={styles['input-container']}>
                            <label className={styles['lname-input-lablel']} for='lname'><h3>Last Name</h3></label>
                            <input
                                type='text'
                                placeholder='Last name'
                                name='lname'
                            />
                        </div>
                    </Grid>
                </Grid>

                <div className={styles['checkbox-container']}>
                    <p>By creating an account you agree to our <a href='#'>Terms & Privacy</a>
                        <label>
                            <input
                                type='checkbox'
                                required name='remember'
                            />
                        </label>
                    </p>
                </div>

                <div className={styles['btn-container']}>
                    <button type='submit' className={styles['submit-btn']}>Next: Business Details</button>
                </div>
            </div>
        </form>
    );
}

export default BusinessSignUpPage;
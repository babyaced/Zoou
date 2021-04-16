import React from 'react';
import {Link} from 'react-router-dom'

import ImageContainer from './ImageContainer/ImageContainer';
import Reviews from './Reviews/Reviews';

import styles from './ProfileContent.module.css';

function ProfileContent() {
    return (
        <div className={styles.ProfileContent} >
            <div style={{display: 'flex'}} >
                <ImageContainer title='Photo' />
                <ImageContainer title='Pets' />
                {/* <div style={{marginRight: "20px"}} >
                    <h1>Photos</h1>
                    <img className={styles.Image} src={shelterImg} alt="No image found" />
                    <p><Link>See All</Link></p>
                </div>
                <div>
                    <h1>Pets</h1>
                    <img className={styles.Image} src={shelterImg} alt="No image found" />
                    <p><Link>See All</Link></p>
                </div> */}
            </div>
            <h1>Reviews</h1>
            <Reviews />
            <Link>Write a Review</Link>
            <Link style={{marginLeft: '345px'}} >See All</Link>
        </div>
    );
}

export default ProfileContent;
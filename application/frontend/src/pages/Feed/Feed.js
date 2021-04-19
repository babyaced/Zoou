import {React, useState} from 'react'
import styles from './Feed.module.css'
import bus_prof_pic from '../../images/businessProfile.jpg'
import shel_prof_pic from '../../images/shelterProfile.jpg'
import own_prof_pic from '../../images/petOwnerProfile.jpg'
import PostModal from '../../components/Modals/PostModal'

import ArrowIcon from '../../images/Created Icons/Arrow.svg'

function Feed() {
    const [postModalDisplay,setPostModalDisplay]= useState(false);
    const [feedPosts, setFeedPosts] = useState([
        {
            post_id: 1,
            user_display_name: 'Paw Spa',
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', //CHANGE LATER //NOT WORKING
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 2,
            user_display_name: 'Burgsdale Pet Shelter',
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg', //CHANGE LATER //NOT WORKING
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg',
            likes: 10,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
            post_id: 3,
            user_display_name: 'Alex',
            prof_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg', //CHANGE LATER //NOT WORKING
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg',
            likes: 20,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        }
    ]);

    const [selectedPost, setSelectedPost] = useState({});

    function openPostModal(feedPost){
        console.log(feedPost);
        setSelectedPost(feedPost);
        setPostModalDisplay(true);
        return 
    }

    function closePostModal(){
        setPostModalDisplay(false);
    }

    return (
        <>
        <div className={styles["follower-feed-header"]}><h1>Feed</h1></div>
        <div className={styles["follower-feed-new-post"]}>
            <textarea className={styles["follower-feed-new-post-body"]} placeholder="Create a Post"/>
            <button className={styles["follower-feed-new-post-attach-image"]}>Add Image</button>
            <button className={styles["follower-feed-new-post-submit"]}>Submit</button>
            <button className={styles["follower-feed-new-post-expand-collapse"]}/>
        </div>
        <ul className={styles["follower-feed-container"]}>
            {feedPosts.length == 0 && <li>No Feed Posts</li>}
            {feedPosts && feedPosts.map((feedPost)=>(
            <div className={styles["follower-feed-post"]} onClick={() => openPostModal(feedPost)} >
                    <img className={styles["follower-feed-post-prof_pic"]} src={feedPost.prof_pic}/>
                    <div className={styles["follower-feed-post-name"]}>{feedPost.user_display_name}</div>
                    <div className={styles["follower-feed-post-timestamp"]}>{feedPost.timestamp}</div>
                    <div className={styles["follower-feed-post-likes"]}>{feedPost.likes}</div>
                    <button className={styles['follower-feed-post-like']}/>
                    {/* <div className={styles["follower-feed-post-comments"]}>10 comments</div> */}
                    <div className={styles["follower-feed-post-body"]}>{feedPost.body}</div>
                    <img className={styles["follower-feed-post-pic"]} src={feedPost.pic}/>
                </div>
            ))}
        </ul>
        <PostModal display={postModalDisplay} onClose={closePostModal} selectedPost={selectedPost}/>
        </>
    )
}

export default Feed

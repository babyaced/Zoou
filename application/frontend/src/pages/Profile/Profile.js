import { useEffect, useState } from 'react';
import Axios from "axios";
import {useParams} from 'react-router-dom';

// Import components
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import AboutMe from '../../components/AboutMe/AboutMe';
import SendAMessage from '../../components/Modals/SendAMessage';


import styles from './Profile.module.css'
import axios from 'axios';



const shelterProfile = {
    accountType: 'shelter',
    id: '1',
    userName: 'Burgsdale Pet Shelter',
    userPicture: 'shelterImage',
    about: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. ',
    contactInfo: {
        phone: '(415) 465-8544', 
        address: '326 Oak St, Burgsdale CA',
        hours: {
            Sun: 'Closed', 
            Mon: '12:00AM - 12:00AM',
            Tue: '12:00AM - 12:00AM',
            Wed: '12:00AM - 12:00AM',
            Thu: '12:00AM - 12:00AM',
            Fri: '12:00AM - 12:00AM',
            Sat: 'Closed'
        }
    },
    reviews: [
        {
           user_id: 1,
           review: "Pets are adorable and the staff are nice",
           rating: 3 
        },
        {
            user_id: 2,
            review: 'It\'s a good place',
            rating: 4 
        },
        {
            user_id: 3,
            review: 'staff are frendly',
            rating: 5
        },
        {
            user_id: 4,
            review: 'I saw one of these in Canada and I bought one. My ant loves to play with it.',
            rating: 4.5 
        }
    ],
    photos: [
        { 
            post_id: 1,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 2,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 3,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 4,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
    ],
    petProfiles: [
        { pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        }
    ]
};

const newShelterProfile = {
    accountType: 'shelter',
    id: '8',
    userName: 'SF Animal Shelter',
    userPicture: '',
    about: 'Write down something to share with others!',
    contactInfo: {
        phone: '', 
        address: '',
        hours: {
            Sun: '12:00AM - 12:00AM', 
            Mon: '12:00AM - 12:00AM',
            Tue: '12:00AM - 12:00AM',
            Wed: '12:00AM - 12:00AM',
            Thu: '12:00AM - 12:00AM',
            Fri: '12:00AM - 12:00AM',
            Sat: '12:00AM - 12:00AM'
        }
    },
    reviews: [],
    photos: [],
    petProfiles: []
};

const businessProfile = {
    accountType: 'business',
    id: '2',
    userName: 'Paw Spa',
    userPicture: 'business2Image',
    about: 'Paw Spa is a family business.',
    contactInfo: {
        phone: '(111) 111-1111', 
        address: '234 Paw St, Burgsdale CA',
        hours: {
            Sun: 'Closed', 
            Mon: 'Closed',
            Tue: 'Closed',
            Wed: '12:00AM - 12:00AM',
            Thu: '12:00AM - 12:00AM',
            Fri: '12:00AM - 12:00AM',
            Sat: 'Closed'
        }
    },
    reviews: [
        {
           user_id: 1,
           review: "I saw this on TV and wanted to give it a try. one of my hobbies is web-browsing. and when i'm browsing the web this works great.",
           rating: 3 
        },
        {
            user_id: 2,
            review: 'It\'s a good place',
            rating: 4 
        },
        {
            user_id: 3,
            review: 'My neighbor Georgie has one of these. She works as a busboy and she says it looks brown.',
            rating: 5
        },
        {
            user_id: 4,
            review: 'I saw one of these in Canada and I bought one. My ant loves to play with it.',
            rating: 4.5 
        }
    ],
    photos: [
        { 
            post_id: 1,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 2,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 3,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 4,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
    ]
};

const newBusinessProfile = {
    accountType: 'business',
    id: '22',
    userName: 'Booming Poodle Grooming',
    userPicture: '',
    about: 'Write down something to share with others!',
    contactInfo: {
        phone: '', 
        address: '',
        hours: {
            Sun: '12:00AM - 12:00AM', 
            Mon: '12:00AM - 12:00AM',
            Tue: '12:00AM - 12:00AM',
            Wed: '12:00AM - 12:00AM',
            Thu: '12:00AM - 12:00AM',
            Fri: '12:00AM - 12:00AM',
            Sat: '12:00AM - 12:00AM'
        }
    },
    reviews: [],
    photos: []
};

const petOwnerProfile = {
    accountType: 'pet owner',
    id: '3',
    userName: 'Alex',
    userPicture: 'petOwner1Image',
    about: 'Hello, I\'m Alex.',
    photos: [
        { 
            post_id: 1,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 2,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 3,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 4,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
    ],
    petProfiles: [
        { pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        { pet_id: 4,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 5,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 6,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        }
    ]
};

const newPetOwnerProfile = {
    accountType: 'pet owner',
    id: '11',
    userName: 'OldmanCatluvr',
    userPicture: '',
    about: 'Write down something to share with others!',
    photos: [],
    petProfiles: []
};

const petProfile = {
    accountType: 'pet',
    id: '97',
    userName: 'Sasha',
    userPicture: 'petImage-Sasha',
    petOwner: 'Alex', 
    about: 'Hello, I\'m Sasha.',
    petType: {value: 'Dog', label: 'Dog'},
    petBreeds: [{value: 'Samoyed', label: 'Samoyed'}, {}],
    petColors: 'White',
    petSize: 'Large',
    photos: [
        { 
            post_id: 1,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 2,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 3,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 4,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        { 
            post_id: 5,
            user_display_name: 'Paw Spa',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg', 
            pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg',
            likes: 0,
            timestamp: '12/25/20 at 11:05 AM',
            body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
    ],
    petProfiles: [
        {   pet_id: 1,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 3,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 2,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        },
        {  pet_id: 4,
            name: 'Mimi',
            size_name: 'medium',
            age_name: 'six',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg' 
        },
        {   pet_id: 5,
            name: 'Juju',
            size_name: 'larg',
            age_name: 'ten',
            profile_pic: 'https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg' 
        },
        {   pet_id: 6,
            name: 'Max',
            size_name: 'small',
            age_name: 'two',
            profile_pic:'https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg'
        }
    ]
};

const newPetProfile = {
    accountType: 'pet',
    id: '108',
    userName: 'Rex',
    userPicture: '',
    about: '',
    photos: [],
    petProfiles: []
};


function Profile({appUser}) {

    const [fetchedProfile,setFetchedProfile] = useState({});
    const [fetchedPhotoPosts, setFetchedPhotoPosts] = useState([]);

    const {profileID} = useParams();
    console.log("profileID: ",profileID);

    useEffect(() =>{
        axios.get('/api/profile',{params: {profileID: profileID}})
        .then(response =>{
            console.log(response);
            console.log(response.data);
            setFetchedProfile(response.data);
        })
        .catch(err =>{
            console.log(err)
        })

        axios.get('/api/get-photo-posts',{params: {profileID: profileID}})
        .then(response =>{
            console.log(response)
            console.log(response.data);
            setFetchedPhotoPosts(response.data);
        })
        .catch(err =>{
            console.log(err)
        })
    },[])



    // ROUTING FOR THE DYNAMIC PROFILE PAGES 

    const [email, setEmail] = useState('')
    const [username, setUname] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    var currUrl = window.location.pathname
    
    // console.log(appUser);
    // switch profile type by changing the userProfile Ex: shelterProfile, businessProfile, newBusinessProfile and petOwnerProfile
    const [userProfile, setUserProfile] = useState(petOwnerProfile);
    const [selfView, setSelfView] = useState(false);

    function updateProfileHandler(type, value) {
        if (type === 'address' || type === 'phone' || type === 'hours') {
            // console.log('value is ' + value + 'type is ' + type);
            setUserProfile(() => ({
                ...userProfile,
                contactInfo: {
                ...userProfile.contactInfo,
                [type]: value
                }
            }));
        }
        else {
            // console.log('[value] is ' + value + ' and [type] is ' + type);
            setUserProfile(() => ({
                ...userProfile,
                [type]: value
            }));
        }
        // console.log('updateProfileHandler');
    }

    function toggleSelfViewHandler() {
        setSelfView(!selfView);
        let button = document.getElementById('profile-button'); // Maybe change the ID name to somthing more specific - Wameedh
        selfView ? button.className = styles.SwitchSelf : button.className = styles.SwitchVistor;
    }

    // console.log(userProfile);
    return (
        <div className={styles.Profile} >
            <ProfileInfo 
                displayName={fetchedProfile.display_name} 
                profilePic={fetchedProfile.profile_pic_link} 
                appUser={appUser} 
                isSelfView={selfView} 
                profile={userProfile} 
                updateProfile={updateProfileHandler} 
            />
            <div className={styles.Bottom}>
                <AboutMe
                    aboutMeBody={fetchedProfile.about_me}
                    isSelfView={selfView} 
                    profile={userProfile} 
                    updateProfile={updateProfileHandler} 
                />
                <ProfileContent
                    photoPosts={fetchedPhotoPosts}
                    pets={[]}
                    isSelfView={selfView} 
                    profile={userProfile} 
                    updateProfile={updateProfileHandler} 
                />
            </div>
        </div>
    )
}

export default Profile;
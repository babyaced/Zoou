import {useState, useEffect} from 'react'

import Modal from './Modal'

import Select from 'react-select';

import makeAnimated from 'react-select/animated';

import styles from './EditPetDetails.module.css'
import axios from 'axios';

import TypeOptions from '../../components/DropdownOptions/TypeOptions'
import ColorOptions from '../../components/DropdownOptions/ColorOptions'
import AgeOptions from '../../components/DropdownOptions/AgeOptions'
import SizeOptions from '../../components/DropdownOptions/SizeOptions'
import CatBreedOptions from '../../components/DropdownOptions/CatBreedOptions'
import DogBreedOptions from '../../components/DropdownOptions/DogBreedOptions'

function EditPetDetails({display, updateProfile, profile, onClose, updatePetType, updatePetBreed, recievedPetAge}) {

    // let recievedPetName
    // let recievedPetType
    console.log(recievedPetAge)
    // let recievedPetSize
    // console.log(profile);
    //full version should recieve pet types and breeds from db and display in dropdown
    const [petName, setPetName] = useState('');
    const [petType,setPetType] = useState([]);  //set this to already existing pet type stored in db for real version
    const [dogBreed, setDogBreed] = useState([]);
    const [petColors, setPetColors] = useState([]);
    const [petSize, setPetSize] = useState([]);
    const [catBreed, setCatBreed] = useState([]);
    const [petAge, setPetAge] = useState([]); 


    const [typeOptions,setTypeOptions] = useState();

    const [dogBreedOptions,setDogBreedOptions] = useState();

    const [catBreedOptions,setCatBreedOptions] = useState();

    const [colorOptions,setColorOptions] = useState();

    const [sizeOptions,setSizeOptions] = useState();

    const [ageOptions,setAgeOptions] = useState();

    function customTheme(theme){
        return {
            ... theme,
            colors:{
                ... theme.colors,
                primary25: '#B3B3B3',
                primary:'#1CB48F',
            }
        }
    }

    //function updatePet(){
    //     axios.post('/api/edit-pet',{})
    //     .then((response) =>{

    //     })
    //     .catch((err) =>{

    //     })
    // }
    
    const animatedComponents = makeAnimated();

    return (
        <Modal display={display} onClose={onClose}>
            <div className={styles['edit-pet-details-header']}>Edit Pet Information</div>
            <div className={styles['edit-pet-details-container']}>
                <div className={styles['edit-pet-details-name']}>
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="pet_name" 
                        maxLength="25"
                        value={profile.display_name}
                        placeholder="Name"
                        onChange={event => updateProfile('userName', event.target.value)} />
                </div>
                <div className={styles['edit-pet-details-type']}>
                    <label for="type">Type</label>
                    <Select id="type" name="pet_type"
                        onChange={updatePetType}
                        options= {TypeOptions()}
                        theme={customTheme}
                        //value = pet Type
                        placeholder="Select Pet Type"
                        isSearchable
                    />
                </div>
                <div className={styles['edit-pet-details-breed']}>
                    <label for="breed">Breed</label>
                    <Select id="breed" name="pet_breed"
                        onChange={updatePetBreed}
                        options={DogBreedOptions()}
                        theme={customTheme}
                        placeholder="Select Dog Breed"
                        isSearchable
                        isMulti
                        // value = pet breed
                        components={animatedComponents}
                    />
                </div>
                <div className={styles['edit-pet-details-color']}>
                    <label for="color">Color(s)</label>
                    <Select id="color" name="pet_color"
                        onChange={setPetColors}
                        options={ColorOptions()}
                        theme={customTheme}
                        placeholder="Select Pet Color(s)"
                        isSearchable
                        //value = pet color
                        isMulti
                    />
                </div>
                <div className={styles['edit-pet-details-age']}>
                        <label for="age">Age</label>
                        <Select id="age" name="pet_age"
                            onChange={setPetAge}
                            options={AgeOptions()}
                            theme={customTheme}
                            value={recievedPetAge}
                            placeholder="Select Pet Age"
                            //value = pet age
                            isSearchable
                        />
                </div>
                <div className={styles['edit-pet-details-size']}>
                    <label for="size">Size</label>
                    <Select id="size" name="pet_size"
                        onChange={setPetSize}
                        options={SizeOptions()}
                        theme={customTheme}
                        placeholder="Select Pet Size"
                        //value = pet size
                        isSearchable
                    />
                </div>
                {petType && petType.label == 'Dog' && <div className={styles['edit-pet-details-breed']}>
                        <label for="breed">Breed</label>
                        <Select id="breed" name="pet_breed"
                            // onChange={updatePetBreed}
                            onChange={setDogBreed}
                            options={DogBreedOptions()}
                            theme={customTheme}
                            placeholder="Select Dog Breed"
                            isSearchable
                            isMulti
                            //value= dog breed
                            components={animatedComponents}
                        />
                    </div>}
                {petType && petType.label == 'Cat' && <div className={styles['edit-pet-details-breed']}>
                    <label for="breed">Breed</label>
                    <Select id="breed" name="pet_breed"
                        // onChange={updatePetBreed}
                        onChange={setCatBreed}
                        options={ catBreedOptions()}
                        theme={customTheme}
                        placeholder="Select Cat Breed"
                        isSearchable
                        isMulti
                        //value = cat breed
                        components={animatedComponents}
                    />
                </div>}
                <button className={styles['edit-pet-details-submit']} onClick={onClose}>Submit</button>
            </div>
        </Modal>
    )
}

export default EditPetDetails

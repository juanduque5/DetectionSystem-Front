import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';

//////////////////////////CLARIFY-API///////////////////////////
const returnClarifyOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '11ac2b365024477aa65e678196a5581e';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'qsgma7zoqjyc';
  const APP_ID = 'test';
  // Change these to whatever model and image URL you want to use
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}

//it's outside so it clear everything when singOut
const initialState = {
     input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      signUp: false,
      user: {
        id: '',
        nameL: '',
        email: '',
        entries: 0,
        joined: ''
      }
}
/////Constructor/////
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    }
  




///Function to get face calculations//////
  faceCalculations = (data) => {
    let item1, item2, item3 = '';
    let clarifaiFace, clarifaiFace2, clarifaiFace3 = {};
    const clarifaiName = data.outputs[0].data.regions[0].data.concepts;
    const clarifaiName2 = data.outputs[0].data.regions[1].data.concepts;
    const clarifaiName3 = data.outputs[0].data.regions[2].data.concepts;
    const clarifaiName4 = data.outputs[0].data.regions[3].data.concepts;
    //const clarifaiName5 = data.outputs[0].data.regions[4].data.concepts;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
  
    //getting different locations 
    if(clarifaiName[0].name === clarifaiName2[0].name){
        item1 = clarifaiName[0].name;
        item2 = clarifaiName3[0].name;
        item3 = clarifaiName4[0].name;
        clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        clarifaiFace2 = data.outputs[0].data.regions[2].region_info.bounding_box;
        clarifaiFace3 = data.outputs[0].data.regions[3].region_info.bounding_box;

    } else if (clarifaiName2[0].name === clarifaiName3[0].name){
        item1 = clarifaiName[0].name;
        item2 = clarifaiName2[0].name;
        item3 = clarifaiName4[0].name;
        clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        clarifaiFace2 = data.outputs[0].data.regions[1].region_info.bounding_box;
        clarifaiFace3 = data.outputs[0].data.regions[3].region_info.bounding_box;
    
    } else {
        item1  = clarifaiName[0].name;
        item2 = clarifaiName2[0].name;
        item3 = clarifaiName3[0].name;
        clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        clarifaiFace2 = data.outputs[0].data.regions[1].region_info.bounding_box;
        clarifaiFace3 = data.outputs[0].data.regions[2].region_info.bounding_box;
    }
     console.log(width, height);
     console.log(clarifaiFace, clarifaiFace2, clarifaiFace3);
    
    return {
      leftCol_1: clarifaiFace.left_col * width,
      topRow_1: clarifaiFace.top_row * height,
      rightCol_1: width - (clarifaiFace.right_col * width),
      bottomRow_1: height - (clarifaiFace.bottom_row * height),
      leftCol_2: clarifaiFace2.left_col * width,
      topRow_2: clarifaiFace2.top_row * height,
      rightCol_2: width - (clarifaiFace2.right_col * width),
      bottomRow_2: height - (clarifaiFace2.bottom_row * height),
      leftCol_3: clarifaiFace3.left_col * width,
      topRow_3: clarifaiFace3.top_row * height,
      rightCol_3: width - (clarifaiFace3.right_col * width),
      bottomRow_3: height - (clarifaiFace3.bottom_row * height),
      name_1: item1,
      name_2: item2,
      name_3: item3
    }
  }

  ///displayFace///
  //we get calculations from below and set obj box to the result we got.
  //this will get pass to FaceRecognition.js to use those calculation and names to set up the css and display locations of items
  displayFace = (box) => {
    console.log(box);
    this.setState({box:box});
  }  


/////Submit-Button//////
  //submit button for image recognition
  onSubmit = () => {
    //This sets imageURL
    this.setState({ imageUrl: this.state.input });
//we pass input to api returnClarifyOtions   
//const requestOptions = returnClarifyOptions(this.state.imageUrl);
    const requestOptions = returnClarifyOptions(this.state.input);


    //we call put method
    const handleResponse = (response) => {
      //call backend to check if id exist and increase user entries and return it back to the front
        if(response){
         fetch('http://localhost:2000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })   //Get the response from the backend and set entries to count
         .then(response => response.json())
         .then(count => {
          //Read about it
           this.setState(Object.assign(this.state.user,{entries:count}))
         })
         .catch(console.log)
        }
        //calculate faceCalculations, then call function displayFace to pass calculation info
        this.displayFace(this.faceCalculations(response));
       
    }

  const handleError = (error) => {
    console.error(error);
    }
 //face-detection
 //face-sentiment-recognition
  
  //we call the api, get a response and then handle functions  
    fetch("https://api.clarifai.com/v2/models/apparel-detection/outputs", requestOptions)
      .then(response => response.json())
      .then(handleResponse)
      .catch(handleError);

  }

  ///lOAD-USER///
loadUser = (data) => {
  this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
  }})
}

/////Input-Form/////
//this sets input to the value target which is the URL, we will use to pass it to the imageURL:
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

/////Delete-Button/////
  //clear last input, clear imageUrl and box
  onDelete = () => {
    this.setState({ input: '', imageUrl: '', box: {} });
  }

  ///Route Change///
   onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({signUp: true })
    } else {
      this.setState(initialState)
      // this.setState({signUp: faslse})
    }
    this.setState({route: route })
   }

  render() {

    const {box, route, signUp, imageUrl } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        {/* This recieves the routeChange from Navigation and gets the signUp */}
        <Navigation routeChange = {this.onRouteChange} signUp = {signUp} />
        {/* if route home, then display logo, rank and imageLink */}
        {route === 'home'
         ? 
         <div>
        <Logo />
        {/* ranks passes the user.name and user.entries */}
        <Rank userName={this.state.user.name} userEntries={this.state.user.entries}  />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
        />
        {/* It gets imageUrl to use in src="", and get calculations and names */}
        <FaceRecognition 
        imageUrl={imageUrl} 
        box={box}
        />
         {/* Gets loadUser info to update user obj and right information gets display, and change route */}
        </div>
         : (
          route === 'signIn' 
          ?

          <SignIn loadUser={this.loadUser} routeChange = {this.onRouteChange}/> 
          :
          <Register loadUser={this.loadUser} routeChange = {this.onRouteChange}/>
          )  

         
      }
      </div>
    );
  }
}

export default App;

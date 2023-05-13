import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from './components/Design/Particles';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

  
  class App extends Component {

    constructor(){
    super();
    this.state = {
      input :'',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box)
    this.setState({box: box})
  }
  
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onSubmitButton = () =>{
    console.log("click");
    
    this.setState({imageUrl: this.state.input});

    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "4zggpn7egm0",
        "app_id": "my-second-application"
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
            'Authorization': 'Key ' + '101048a4e0e94f64bd294ec542147862'
        },
        body: raw
      };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error));
}

  onRouteChange = (route) =>{
    if (route === 'SignOut'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render(){
   const {isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
     < Particles/>
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
     { route === 'home'
       ? <div>
       <Logo />
       < Rank/>
       <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
       <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>   
       : (
        route === 'SignIn' ?
        <SignIn onRouteChange={this.onRouteChange} />
        :
        <Register onRouteChange={this.onRouteChange} />
       )  
     } 
    </div>
  );
}
}

export default App;

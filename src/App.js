import React, { Component } from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import Signin from './Signin';
import './App.css';
import ImageLink from './ImageLink';
import Rank from './Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Register from './Register';
import ImageRecognition from './ImageRecognition'

const app = new Clarifai.App({
    apiKey: 'Your Api Key Here'
});
const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 100
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            boxes: [],
            route: 'signin',
            isSignedIn: false
        }

    }
    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }
    FaceLocation = (data) => {
        return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box;
            const image = document.getElementById('inputimage');
            const width = Number(image.width);
            const height = Number(image.height);
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height),
            }
        })

    }
    displayFaceBox = (boxes) => {
        this.setState({ boxes: boxes });
    }
    onSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayFaceBox(this.FaceLocation(response)))
            .catch(err => console.log(err))

    }
    onRouteChange = (route) => {
        if (route === 'signout')
            this.setState({ isSignedIn: false });
        else if (route === 'home')
            this.setState({ isSignedIn: true });

        this.setState({ route: route });

    }
    render() {
        return (

                <
                div className = "App" >

                <
                Particles className = 'particles'
                params = { particlesOptions }
                />

                <
                Navigation isSignedIn = { this.state.isSignedIn }
                onRouteChange = { this.onRouteChange }
                /> {
                this.state.route === 'home' ?
                <
                div >
                <
                Logo / >
                <
                Rank / >
                <
                ImageLink onInputChange = { this.onInputChange }
                onSubmit = { this.onSubmit }
                /> <
                ImageRecognition boxes = { this.state.boxes }
                imageUrl = { this.state.imageUrl }
                /> < /
                div >

                :
                (this.state.route === 'signin' ?
                    <
                    Signin onRouteChange = { this.onRouteChange }
                    /> : <
                    Register onRouteChange = { this.onRouteChange }
                    />
                )

            } <
            /div>
    );
}
}

export default App;
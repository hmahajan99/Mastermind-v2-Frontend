import React, { Component } from 'react';
import { withRouter } from "react-router";
import Image from '../Image/Image';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';

class ImageAnalyzer extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
      input: '',
      concepts: [],
      boxes: []    
    };
  }

  getActionFromUrl = () => {
    switch(this.props.location.pathname){
      case '/concepts': return 'generalConcepts'
      case '/demographics': return 'getDemographics'
      case '/apparels': return 'getApparels'
      case '/food': return 'recognizeFood'
      case '/celebrity': return 'recognizeCelebrity'
      default : return 'detectFaces'
    }
  }

  extractData = (action) => {
    switch(action){
      
      case 'detectFaces': return (data) => {
          const image = document.getElementById('inputimage');
          const width = Number(image.width);
          const height = Number(image.height);
          const boxes = data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box;
            return {
              leftCol: clarifaiFace.left_col * width,
              topRow: clarifaiFace.top_row * height,
              rightCol: width - (clarifaiFace.right_col * width),
              bottomRow: height - (clarifaiFace.bottom_row * height)
            }
          });
          return {boxes, concepts:[]};
        }

      case 'getApparels':
      case 'recognizeFood':
      case 'generalConcepts': return (data) => {
          const concepts = data.outputs[0].data.concepts.filter((concept,idx) => idx<5).map(concept => {
            const {name, value} = concept;
            return {
              name: name[0].toUpperCase() + name.slice(1),
              value
            }
          });
          return {boxes:[], concepts};
        }

      case 'recognizeCelebrity': return (data) => {
          const image = document.getElementById('inputimage');
          const width = Number(image.width);
          const height = Number(image.height);
          const boxes = data.outputs[0].data.regions.map(region => {
            const clarifaiFace = region.region_info.bounding_box;
            return {
              leftCol: clarifaiFace.left_col * width,
              topRow: clarifaiFace.top_row * height,
              rightCol: width - (clarifaiFace.right_col * width),
              bottomRow: height - (clarifaiFace.bottom_row * height)
            }
          });
          const concepts = data.outputs[0].data.regions.map(region => {
            const {name, value} = region.data.concepts[0];
            const capitaliZedName = name.split(' ')
                .map(part => part[0].toUpperCase() + part.slice(1))
                .reduce((accumulator, part) => accumulator + part + " ","")
            return {
              name: capitaliZedName,
              value
            }
          });
          return {boxes, concepts};
        }

      case 'getDemographics': return (data) => {
          const image = document.getElementById('inputimage');
          const width = Number(image.width);
          const height = Number(image.height);
          const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
          const boxes = [{
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
          }];
          const concepts = [];
          data.outputs[0].data.regions[0].data.concepts.map((concept) => {
            const {name, value, vocab_id} = concept;
            const index = concepts.findIndex(concept => concept.vocab_id === vocab_id);
            if(index===-1){
              concepts.push({name,value,vocab_id});
            }else if(value>concepts[index].value){
              concepts[index] = {name,value,vocab_id};
            }
          });
          const demographTypeConcepts = concepts.map((concept)=>{
            const {name, value, vocab_id} = concept;
            const demographType = vocab_id + '_:_' + name;
            const capitaliZedDemographType = demographType.split('_')
                .map(part => part[0].toUpperCase() + part.slice(1))
                .reduce((accumulator, part) => accumulator + part + " ","")
            return {
              name: capitaliZedDemographType,
              value
            }
          })
          return {boxes, concepts: demographTypeConcepts};
        }
    }
  }

  setBoxesAndConcepts = (data) => {
    this.setState({boxes: data.boxes});
    this.setState({concepts: data.concepts});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const action = this.getActionFromUrl();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/imageurl`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        action: action,
        imageurl: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
          body: JSON.stringify({
            id: this.props.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.props.setUser(Object.assign(this.props.user, { entries: count}))
        })
        .catch(console.log)

      }
      this.setBoxesAndConcepts(this.extractData(action)(response));
    })
    .catch(err => console.log(err));
  }

  render() {
    const { imageUrl, concepts, boxes } = this.state;
    return (
      <div>
        <Rank
          name={this.props.user.name}
          entries={this.props.user.entries}
        />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <Image boxes={boxes} concepts={concepts} imageUrl={imageUrl} />
      </div>
    );
  }
}

export default withRouter(ImageAnalyzer);

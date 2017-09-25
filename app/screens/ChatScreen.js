import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { StackNavigator } from 'react-navigation';

let allInstances = [];
let inst = null;
let key = null;
let LastMessage = "Hello";
let TrainingData = [];
let synaptic = require('synaptic'); // this line is not needed in the browser
let Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;
LSTM.prototype = new Network();
LSTM.prototype.constructor = LSTM;
let myLSTM = new LSTM(100,101,100);
let trainer = new Trainer(myLSTM);

class ChatScreen extends React.Component {
  constructor() {
    super();
    this.id = 1;
    this.state = {
      messages: []
    };
  }
  static navigationOptions = ({ navigation }) => {
    const emptyLambda = () => { };
    return ({
      headerLeft: null,
      headerRight: <Button
        title="ⓘ  "
        onPress={() =>
          navigation.navigate('Information', {
            changeInst: navigation.state.params.changeInst
            || emptyLambda
          })
        }
      />,
      title: "ChatterBot"
    })
  }
  changeInst = (inst, key) => {
    this.props.navigation.setParams({ inst, key });
  }
  componentWillMount() {
    this.props.navigation.setParams({
      inst: "Hello",
      key: ["Hello", "Hi", "Wassup", "Hey"],
      changeInst: this.changeInst,
    })

    this.setState({
      messages: [
        {
          _id: this.id,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }


  respond = () => {
    const response = this.state.messages[0];
    const { text } = response;
    const messages = this.state.messages.slice();
    if (LastMessage === undefined) {
      LastMessage = "Hello";
    }
    messages.unshift(MessageObj(CalcInstance2(text, LastMessage), ++this.id)); /////////////////////////Change CalcInstance2 to 1
    let LastMessage = text;
    if (LastMessage === undefined) {
      LastMessage = "Hello";
    }
    console.log(text)
    this.setState({ messages });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.respond();
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { inst, key } = this.props.navigation.state.params ?
      this.props.navigation.state.params :
      { inst: "Hello", key: ["Hello", "Hi", "Wassup", "Hey"] }

    allInstances.push([inst, key]);
    //console.log(inst);
    //console.log(key);
    const { removeInstances } = this.props.navigation.state.params ?
      this.props.navigation.state.params :
      { removeInstances: false }
    if (removeInstances == true) {
      allInstances = [["Hello", ["Hello", "Hi", "Wassup", "Hey"]]];
    }
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

function MessageObj(message, id) {
  return {
    _id: id,
    text: message,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

function CalcInstance(instanceText) {
  let levenshtein = require('fast-levenshtein');
  let cutInstanceText = instanceText.split(" ");
  let returnMessage = null;
  for (let i = 0; i < allInstances.length; i++) {
    let items = allInstances[i];
    let instance = items[0];
    let keys = items[1];
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j];
      for (let k = 0; k < cutInstanceText.length; k++) {
        let instanceWord = cutInstanceText[k];
        if (levenshtein.get(instanceWord.toLowerCase(), key.toLowerCase()) <= (key.length) / 2) {
          returnMessage = "We are talking about \"".concat(instance, "\", correct?");
        }
      }
    }
    if (returnMessage == null) {
      returnMessage = "I\'m sorry, I couldn't understand the message.";
    }
  }
  return returnMessage;
}
function CalcInstance2(instanceText,LastText) {
  TrainingData.push({
    input: Normalize(instanceText), 
    output: Normalize(LastText)
  });
  
  //console.log(TrainingData);
  trainer.train(TrainingData,{
    rate: .3,
    iterations: 1000,
    error: 5,
    shuffle: false,
    cost: Trainer.cost.CROSS_BINARY
  })
  //RemadeOutput = this.Tests.replace(/\d+./g, x => String.fromCharCode('0b' + x));
  return myLSTM.activate(Normalize(instanceText));
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function LSTM(originalInput, blocks, originalOutput) {
  // create the layers
  let inputLayer = new Layer(originalInput);
  let inputGate = new Layer(blocks);
  let forgetGate = new Layer(blocks);
  let memoryCell = new Layer(blocks);
  let outputGate = new Layer(blocks);
  let outputLayer = new Layer(originalOutput);

  // connections from input layer
  let input = inputLayer.project(memoryCell);
  inputLayer.project(inputGate);
  inputLayer.project(forgetGate);
  inputLayer.project(outputGate);

  // connections from memory cell
  let output = memoryCell.project(outputLayer);

  // self-connection
  let self = memoryCell.project(memoryCell);

  // peepholes
  memoryCell.project(inputGate);
  memoryCell.project(forgetGate);
  memoryCell.project(outputGate);

  // gates
  inputGate.gate(input, Layer.gateType.INPUT);
  forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
  outputGate.gate(output, Layer.gateType.OUTPUT);

  // input to output direct connection
  inputLayer.project(outputLayer);

  // set the layers of the neural network
  this.set({
    input: inputLayer,
    hidden: [inputGate, forgetGate, memoryCell, outputGate],
    output: outputLayer
  });
}
function Normalize(ascii) {
  let bin = Array(100).join("0");
  for (let i = 0; i < ascii.length; i++) {
    let code = ascii.charCodeAt(i);
    bin += ('0000000000' + code.toString(2)).slice(-10);
  }
  return bin.slice(-10 * 10).split('').reverse();
}

export default ChatScreen;
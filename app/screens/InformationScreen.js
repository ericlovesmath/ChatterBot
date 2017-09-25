import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SettingsList from 'react-native-settings-list';

class InformationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Editor"
  })
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false, removeInstances: false};
  }
  handlePress() {
    Alert.alert(
      'This feature is not yet finished!',
      'Look out for the next update!',
      [{text: 'I\'ll be back!'}],
      { cancelable: false }
    )

  }
  removeInstances() {
    const { navigate } = this.props.navigation;
    if (this.state.switchValue == true) {
      Alert.alert(
        'Are you sure you want a reset?',
        'You cannot undo this action',
        [
          {text: 'I\'m ready', onPress: () => this.removeInstancesTrue(), style: 'cancel'},
          {text: 'I\'m need more time'},
        ],
        { cancelable: false }
      )
    }
  }
  removeInstancesTrue() {
    const { navigate } = this.props.navigation;
    this.state.removeInstances = true;
    navigate('Chat', {removeInstances: this.state.removeInstances})
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Item
            title='Add Private Instance'
            onPress={() => navigate('PrivateInstance', {screenKey: this.props.navigation.state.key, changeInst: this.props.navigation.state.params.changeInst} )}
          />
          <SettingsList.Item
            title='Add Public Instance'
            onPress={() => this.handlePress()}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title='Allow Danger Options'
            titleStyle={{color:'red'}}
          />
          <SettingsList.Item
            title='Remove all Instances'
            titleStyle={{color:'red'}}
            onPress={() => this.removeInstances()}
          />
        </SettingsList>
      </View>
    )
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}


export default InformationScreen;
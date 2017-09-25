import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import TextField from 'react-native-md-textinput';

class InformationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Add Instance"
  })
  constructor(){
    super();
    this.state = {inst: "", key: ""};
  }
  submittedAlert = () => {
    Alert.alert(
      'Submited Instance',
      'Go test if it works!',
      [{text: 'Alright!', onPress: this.handlePress },],
      { cancelable: false }
    )

  }
  handlePress = () => {
    const { goBack, state } = this.props.navigation;
    this.props.navigation.state.params.changeInst(this.state.inst, this.state.key.split(" "));
    goBack(this.props.navigation.state.params.screenKey )

  }
  render() {
    const { navigate } = this.props.navigation;
    const Instance = "";
    const Keywords = [];
    return (
      <ScrollView>
        <TextField
          label={'   Instance Name'}
          highlightColor={'#00BCD4'}
          multiline = {true}
          height = {35}
          autoGrow = {true}
          marginLeft = {15}
          value = {this.state.inst}
          onChangeText={(inst) => this.setState({inst})}
        />
        <Text style={styles.Description}>The instance is a general idea. It should be a single word with no spaces.</Text>
        <TextField
          label={'   Keywords'}
          highlightColor={'#00BCD4'}
          multiline = {true}
          height = {35}
          autoGrow = {true}
          marginLeft = {15}
          value = {this.state.key}
          onChangeText={(key) => this.setState({key})}
        />
        <Text style={styles.Description}>Keywords are words that are based off of the Instance.{"\n"}
        For example, if the instance was "Baking", an example set of keywords would be "Cookie, Cake, Scone, Brownie, Doughnut".{"\n"}
        Split each keyword with a space. For maximum results, enter 5~10 keywords.{"\n"}
        </Text>
        <Button
          onPress={this.submittedAlert}
          title="Submit new Instance"
        />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  Description: {
    color: 'gray',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5
  }
});
export default InformationScreen;
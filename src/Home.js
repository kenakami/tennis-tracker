import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView , TouchableOpacity, Modal, Button} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      radio_props: [
        {label: 'Simple', value: 0 },
        {label: 'Detailed', value: 1 }
      ],
      details: 0
    }
  }

  renderModal() {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style  = {{fontSize: 20, paddingBottom: '3%'}}>
              Match Options
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.7,
              }}
            />
          </View>
          <Text style = {{marginTop: '5%', paddingBottom: '5%', alignSelf: 'flex-start'}}>
            Select mode
          </Text>
        <View style = {{alignSelf: 'flex-start'}}>
          <RadioForm
            radio_props={this.state.radio_props}
            initial={0}
            onPress={(value) => {this.setState({details: value})}}
          />
        </View>
        <TouchableOpacity
            style = {{width: '100%', height: '15%', borderRadius: 20, alignSelf: 'center', marginTop: '3%', backgroundColor: '#0b79bd', padding: '2%', alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style = {{color: '#ffffff'}}>
            Create match
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress = {() => this.setState({modalVisible: !this.state.modalVisible})}
            style = {{width: '100%', height: '15%', borderRadius: 20, alignSelf: 'center', marginTop: '3%', backgroundColor: '#f0e9e9', padding: '2%', alignItems: 'center', justifyContent: 'center'}}
        >
          <Text>
            Cancel
          </Text>
        </TouchableOpacity>

        </View>
      </View>
    )
  }

  componentDidMount(){
    this.props.navigation.setOptions({headerRight: () => (
      <TouchableOpacity onPress = {() => this.setState({modalVisible: !this.state.modalVisible})}>
          <AntDesign name="plus" size={21} color= "black"/>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {marginRight:'4%'}})
  }
 
  
  render() {
    var radio_props = [
      {label: 'param1', value: 0 },
      {label: 'param2', value: 1 }
    ];
    return (
      <SafeAreaView style = {{flex: 1}}>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <TouchableOpacity
            style = {{width: '90%', height: '11%', borderRadius: 10, alignSelf: 'center', marginTop: '3%', borderColor: 'black', backgroundColor: 'white', borderWidth: 2, padding: '2%'}}
            onPress={() => this.props.navigation.navigate('Details')}
          >
            <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
              <View>
                <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%'}}>
                  Ken
                </Text>
                <Text style = {{fontSize: 17, fontWeight: '500'}}>
                  Jun
                </Text>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <View style = {{alignSelf: 'flex-end'}}>
                  <Text style = {{fontSize: 17, fontWeight: '300', paddingBottom: '2%', paddingRight: '3%'}}>
                    0
                  </Text>
                  <Text style = {{fontSize: 17, fontWeight: '500'}}>
                    6
                  </Text>
                </View>
                <View style = {{alignSelf: 'flex-end'}}>
                  <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%', paddingRight: '3%'}}>
                    6
                  </Text>
                  <Text style = {{fontSize: 17, fontWeight: '300'}}>
                    0
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            >
              {this.renderModal()}
          </Modal>
        </ScrollView>
    </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '40%'
  },
});
export default Home;

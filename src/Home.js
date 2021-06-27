import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView , TouchableOpacity, Modal, Button, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const empty_data = {
  match: {
    set: [{
      game: [
        {
          point: [],
          p1: 0,
          p2: 0,
        },
      ],
      p1: 0,
      p2: 0,
    }]
  },
  p1_name: "",
  p2_name: "",
}

const data = {
  match: {
    set: [{
      game: [
        {
          point: [true, true, true, true],
          p1: 4,
          p2: 0,
        },
        {
          point: [true, false, true, true, true],
          p1: 4,
          p2: 1,
        },
        {
          point: [true, false, false, true, true, true],
          p1: 4,
          p2: 2,
        },
        {
          point: [true, false, false, false, true, true, true],
          p1: 4,
          p2: 3,
        },
        {
          point: [true, true, true, true],
          p1: 4,
          p2: 0,
        },
        {
          point: [true, true, true, true],
          p1: 4,
          p2: 0,
        },
      ],
      p1: 6,
      p2: 0,
    }]
  },
  p1_name: "Foo",
  p2_name: "Bar",
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      firstModalVisible: false,
      radio_props: [
        {label: 'Simple', value: 0 },
        {label: 'Detailed', value: 1 }
      ],
      radio_props1: [
        {label: 'Player 1 Serving', value: 0 },
        {label: 'Player 2 Serving', value: 1 }
      ],
      details: 0,
      player1_serving: 0
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
          onPress={() => {
            this.props.navigation.navigate('Match', {/* TODO pass info here */});
            this.setState({modalVisible: !this.state.modalVisible})
          }}
          style = {{width: '100%', height: '15%', borderRadius: 20, alignSelf: 'center', marginTop: '3%', backgroundColor: '#0b79bd', padding: '2%', alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style = {{color: '#ffffff'}}>
            Create Match
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

  renderInformation() {
    return (
      <View style={styles.centeredView}>
        <View style={styles.firstModalView}>
          <View>
            <Text style  = {{fontSize: 20, paddingBottom: '3%'}}>
              Player Information
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.7,
              }}
            />
          </View>
          <View style = {{flexDirection: 'row', alignSelf: 'flex-start', width: '100%', justifyContent: 'space-between', paddingBottom: '4%', alignItems: 'center', marginTop: '7%'}}>
            <Text>
              Player One
            </Text>
            <TextInput
              style={styles.input}
            />
          </View>
          <View style = {{flexDirection: 'row', alignSelf: 'flex-start', width: '100%', justifyContent: 'space-between', paddingBottom: '4%', alignItems: 'center'}}>
            <Text>
              Player Two
            </Text>
            <TextInput
              style={styles.input}
            />
          </View>
          <View style = {{alignSelf: 'flex-start'}}>
            <RadioForm
              radio_props={this.state.radio_props1}
              initial={0}
              onPress={(value) => {this.setState({player1_serving: value})}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({firstModalVisible: !this.state.firstModalVisible})
              this.setState({modalVisible: !this.state.modalVisible})
            }}
            style = {{width: '100%', height: '15%', borderRadius: 20, alignSelf: 'center', marginTop: '3%', backgroundColor: '#0b79bd', padding: '2%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style = {{color: '#ffffff'}}>
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {() => this.setState({firstModalVisible: !this.state.firstModalVisible})}
            style = {{width: '100%', height: '15%', borderRadius: 20, alignSelf: 'center', marginTop: '3%', backgroundColor: '#f0e9e9', padding: '2%', alignItems: 'center', justifyContent: 'center'}}>
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
      <TouchableOpacity onPress = {() => this.setState({firstModalVisible: !this.state.firstModalVisible})}>
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
            visible={this.state.firstModalVisible}
            >
              {this.renderInformation()}
          </Modal>
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
  firstModalView: {
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
    height: '48%'
  },
  input: {
    height: '120%',
    width: '50%',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 2
  }
});
export default Home;

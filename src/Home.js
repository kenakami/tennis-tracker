import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView , TouchableOpacity, Modal, Button, TextInput, KeyboardAvoidingView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Ionicons } from '@expo/vector-icons'; 
import Scoreboard from './components/Scoreboard';

import { useSelector, useDispatch } from 'react-redux'
import { addMatch, setMatch } from './features/matches/matchesSlice';

const empty_score = {
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
  }],
  p1: 0,
  p2: 0,
}

function Home(props) {
  const matches = useSelector((state) => state.matches.array)
  const dispatch = useDispatch()

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [simple, setSimple] = useState(true);
  const [p1_serving, set_p1_serving] = useState(true);
  const [p1_name, set_p1_name] = useState('Player 1');
  const [p2_name, set_p2_name] = useState('Player 2');
  const radio_props = [
    {label: 'Simple', value: true},
    {label: 'Detailed', value: false}
  ];
  const radio_props1 = [
    {label: 'Player 1 Serving', value: true},
    {label: 'Player 2 Serving', value: false}
  ];

  useEffect(() => {
    // Same as componentDidMount
    props.navigation.setOptions({headerRight: () => (
      <TouchableOpacity onPress = {() => setModal1Visible(true)}>
        <AntDesign name="plus" size={21} color= "black"/>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {marginRight:'4%'}})
  },[]);

  const reset = () => {
    setSimple(true);
    set_p1_serving(true);
    set_p1_name('Player 1');
    set_p2_name('Player 2');
  }

  const renderModal1 = () => {
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
              onChangeText = {(name) => set_p1_name(name)}
            />
          </View>
          <View style = {{flexDirection: 'row', alignSelf: 'flex-start', width: '100%', justifyContent: 'space-between', paddingBottom: '4%', alignItems: 'center'}}>
            <Text>
              Player Two
            </Text>
            <TextInput
              style={styles.input}
              onChangeText = {(name) => set_p2_name(name)}
            />
          </View>
          <View style = {{alignSelf: 'flex-start'}}>
            <RadioForm
              radio_props={radio_props1}
              initial={0}
              onPress={(value) => set_p1_serving(value)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setModal1Visible(false);
              setModal2Visible(true);
            }}
            style={[styles.button, {backgroundColor: '#0b79bd'}]}
          >
            <Text style = {{color: '#ffffff'}}>
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModal1Visible(!modal1Visible)}
            style={[styles.button, {backgroundColor: '#f0e9e9'}]}
          >
            <Text>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderModal2 = () => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style = {{flexDirection: 'row'}}>
            <View style = {{alignSelf: 'flex-start'}}>
            </View>
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
          </View>
          <Text style = {{marginTop: '5%', paddingBottom: '5%', alignSelf: 'flex-start'}}>
            Select mode
          </Text>
        <View style = {{alignSelf: 'flex-start'}}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => setSimple(!simple)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            let new_match = {
              score: empty_score,
              info: {
                p1_serving: p1_serving,
                p1_name: p1_name,
                p2_name: p2_name,
              }
            }
            dispatch(addMatch({
              data: new_match,
            }));
            setModal2Visible(false);
            if (simple) {
              props.navigation.navigate('Match Simple', {
                ...new_match,
                index: matches.length,
              })
            } else {
              props.navigation.navigate('Match Detailed', {
                ...new_match,
                index: matches.length,
              });
            }
            reset();
          }}
          style={[styles.button, {backgroundColor: '#0b79bd'}]}
        >
          <Text style = {{color: '#ffffff'}}>
            Create Match
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => setModal2Visible(!modal2Visible)}
          style={[styles.button, {backgroundColor: '#f0e9e9'}]}
        >
          <Text>
            Cancel
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  return (
    <SafeAreaView style = {{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {
          matches.map((match, index) => (
            <TouchableOpacity
              onPress={() => {
                if (match.info.done) return;
                if (match.info.simple) {
                  props.navigation.navigate('Match Simple', {
                    score: match.score,
                    info: match.info,
                    index: length,
                  })
                } else {
                  // match detailed
                }
              }}
            >
              <Text>{match.info.date}</Text>
              <Scoreboard match={match} key={"match"+index}/>
            </TouchableOpacity>
          ))
        }
        {/*
          this.state.matches.map((match, index) => (
            <Scoreboard data={match} key={"match"+index}/>
          ))
          */}
        {/*
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
          */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal1Visible}
        >
          {renderModal1()}
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal2Visible}
        >
          {renderModal2()}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );

  const renderDebug = () => {
    return (
      <View style={{flex: 1, padding: '5%'}}>
        <Button
          title="print state"
          onPress={() => console.log(this.state)}
        />
        <Button
          title="clear storage"
          onPress={() => {
            //AsyncStorage.removeItem('matches')
            dispatch();
          }}
        />
      </View>
    )
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
  },
  input: {
    height: '120%',
    width: '70%',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 2
  },
  button: {
    width: '100%',
    height: 48, 
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '3%',
    backgroundColor: '#f0e9e9',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;

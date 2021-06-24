import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView , Modal} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function test() {
    return (
        <ScrollView>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style = {{fontSize: 35, marginLeft: '10%', marginTop: '8%'}}>
                    Ken
                </Text>
                <Text style = {{fontSize: 35, marginRight: '10%', marginTop: '8%'}}>
                    Jun
                </Text>
            </View>
            <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style = {styles.leftText}>
                    1
                </Text>
                <Text style = {styles.middleText}>
                    Aces
                </Text>
                <Text style = {styles.rightText}>
                    2
                </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Double Faults
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        First serve %
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Winners
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Unforced Errors
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Forced Errors
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Win % on 1st serve
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Win % on 2nd serve
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Break points Won
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        Points Won
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {styles.leftText}>
                        1
                    </Text>
                    <Text style = {styles.middleText}>
                        % of Points Won
                    </Text>
                    <Text style = {styles.rightText}>
                        2
                    </Text>
                </View>
        </ScrollView>  
    );
  }

  function test1() {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style = {{width: '100%', height: '8%', backgroundColor:'#696969', justifyContent: 'center'}}>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {{marginLeft: '3%', fontSize: 17, color: 'white'}}>
                        Game 1
                    </Text>
                    <Text style = {{marginRight: '3%', fontSize: 17, color: `#e0ffff`}}>
                        1-0
                    </Text>
                </View>
            </View>
            <View style = {{flexDirection: 'row', marginLeft: '3%', padding: '3%'}}>
                <View>
                    <Text style = {styles.leftScore}>
                        00-00
                    </Text>
                    <Text style = {styles.leftScore}>
                        15-00
                    </Text>
                </View>
                <View>
                    <Text style = {styles.description}>
                        Serving Ken Nakamine
                    </Text>
                    <Text style = {styles.description}>
                        Ken hit an unforced error
                    </Text>
                </View>
            </View>
            <View style = {{width: '100%', height: '8%', backgroundColor:'#696969', justifyContent: 'center'}}>
                <View style = {{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style = {{marginLeft: '3%', fontSize: 17, color: 'white'}}>
                        Game 2
                    </Text>
                    <Text style = {{marginRight: '3%', fontSize: 17, color: `#e0ffff`}}>
                        2-0
                    </Text>
                </View>
            </View>
            <View style = {{flexDirection: 'row', marginLeft: '3%', padding: '3%'}}>
                <View>
                    <Text style = {styles.leftScore}>
                        00-00
                    </Text>
                    <Text style = {styles.leftScore}>
                        15-00
                    </Text>
                </View>
                <View>
                    <Text style = {styles.description}>
                        Serving Ken Nakamine
                    </Text>
                    <Text style = {styles.description}>
                        Ken hit an unforced error
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
  }


class Details extends React.Component {
    
  render() {
    return (
        <SafeAreaView style = {{flex: 1}}>
                <View style = {{width: '90%', height: '11%', borderRadius: '10%', alignSelf: 'center', marginTop: '3%', borderColor: 'black', backgroundColor: 'white', borderWidth: '2%', padding: '2%'}}>
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
                </View>
                <Tab.Navigator
                    tabBarOptions={{
                        labelStyle: { fontSize: 14, fontWeight:'800' },
                        
                        style: {borderWidth:0, shadowColor:'transparent', backgroundColor:'transparent'},
                        indicatorStyle: {
                            backgroundColor: 'transparent',
                            borderWidth:0,
                        
                        }

                    }}
                >
                    <Tab.Screen name= "Match Stats" component = {test}/>
                    <Tab.Screen name = "Match Log" component = {test1}/>
                </Tab.Navigator> 
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: 20
    },
    leftText: { 
        marginLeft: '15%',
        fontSize: 20,
        marginTop: '5%'
    },
    middleText: {
        fontSize: 20, 
        marginTop: '5%'
    },
    rightText: { 
        marginRight: '15%',
        fontSize: 20,
        marginTop: '5%'
    },
    leftScore: {
        marginLeft: '3%',
        fontSize: 15,
    },
    description: {
        fontSize: 15,
    }
  });
export default Details;

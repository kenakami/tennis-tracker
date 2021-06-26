import React from 'react';
import { Text, View, SafeAreaView, ScrollView , TouchableOpacity } from 'react-native';

class Scoreboard extends React.Component {
  render() {
    return(
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
    );
  }
}

export default Scoreboard;

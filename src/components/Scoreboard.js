import React from 'react';
import { Text, View, SafeAreaView, ScrollView , TouchableOpacity, ActivityIndicator } from 'react-native';

Array.prototype.last = function(){
    return this[this.length - 1];
};

const score = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'Ad',
}

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState(this.props.data);
    }
  }

  render() {
    if (false) {
      return (
        <View
          style = {{width: '90%', height: '11%', borderRadius: 10, alignSelf: 'center', marginTop: '3%', borderColor: 'black', backgroundColor: 'white', borderWidth: 2, padding: '2%', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    return(
      <TouchableOpacity
        style = {{width: '90%', height: '11%', borderRadius: 10, alignSelf: 'center', marginTop: '3%', borderColor: 'black', backgroundColor: 'white', borderWidth: 2, padding: '2%'}}
        //onPress={() => this.props.navigation.navigate('Details')}
      >
        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
          <View>
            <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%'}}>
              {this.props.data.p1_serving ? '*' : null}
            </Text>
            <Text style = {{fontSize: 17, fontWeight: '500'}}>
              {this.props.data.p1_serving ? null : '*'}
            </Text>
          </View>
          <View>
            <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%'}}>
              {this.props.data.p1_name}
            </Text>
            <Text style = {{fontSize: 17, fontWeight: '500'}}>
              {this.props.data.p2_name}
            </Text>
          </View>
          <View style = {{flexDirection: 'row'}}>
            {
              <View style = {{alignSelf: 'flex-end', backgroundColor: 'gray'}} key={"set"}>
                <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%', paddingRight: '3%'}}>
                  {this.props.data.match.p1}
                </Text>
                <Text style = {{fontSize: 17, fontWeight: '300'}}>
                  {this.props.data.match.p2}
                </Text>
              </View>
            }
            {
              this.props.data.match.set.map((set, index) => (
                <View style = {{alignSelf: 'flex-end'}} key={"set"+index}>
                  <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%', paddingRight: '3%'}}>
                    {set.p1}
                  </Text>
                  <Text style = {{fontSize: 17, fontWeight: '300'}}>
                    {set.p2}
                  </Text>
                </View>
              ))
            }
            {
              <View style = {{alignSelf: 'flex-end', backgroundColor: 'gray'}} key={"point"}>
                <Text style = {{fontSize: 17, fontWeight: '500', paddingBottom: '2%', paddingRight: '3%'}}>
                  {this.props.data.done ? 0 : score[this.props.data.match.set.last().game.last().p1]}
                </Text>
                <Text style = {{fontSize: 17, fontWeight: '300'}}>
                  {this.props.data.done ? 0 : score[this.props.data.match.set.last().game.last().p2]}
                </Text>
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Scoreboard;

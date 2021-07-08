import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

Array.prototype.last = function(){
  return this[this.length - 1];
};

const convert = {
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
    /*
    if (this.props.data) {
      this.setState(this.props.data);
    }
    */
  }

  render() {
    return (
      <View
        style = {{flexDirection: 'row', width: '90%', borderRadius: 10, alignSelf: 'center', marginTop: '4%', borderColor: 'black', backgroundColor: 'white', borderWidth: 2, padding: '2%', paddingLeft: 0}}
      >
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.unit}>
            {this.props.match.info.p1_serving ? '*' : null}
          </Text>
          <Text style={styles.unit}>
            {this.props.match.info.p1_serving ? null : '*'}
          </Text>
        </View>
        <View style={{flex: 10}}>
          <Text style={styles.unit}>
            {this.props.match.info.p1_name}
          </Text>
          <Text style={styles.unit}>
            {this.props.match.info.p2_name}
          </Text>
        </View>
        {
          this.props.match.score.set.map((set, index) => (
            <View style={{flex: 1, alignItems: 'center'}} key={"set"+index}>
              <Text style={styles.unit}>
                {set.p1}
              </Text>
              <Text style={styles.unit}>
                {set.p2}
              </Text>
            </View>
          ))
        }
        <View style={{flex: 1, alignItems: 'center', backgroundColor: 'gray'}} key={"point"}>
          <Text style={styles.unit}>
            {this.props.match.info.done ? 0 : convert[this.props.match.score.set.last().game.last().p1]}
          </Text>
          <Text style={styles.unit}>
            {this.props.match.info.done ? 0 : convert[this.props.match.score.set.last().game.last().p2]}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  unit: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  }
});

export default Scoreboard;

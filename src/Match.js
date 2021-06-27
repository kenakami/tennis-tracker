import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Scoreboard from './components/Scoreboard';

const data = {
  match: {
    set: [
    {
      game: [
        {
          point: [],
          p1: 4,
          p2: 0,
        },
      ],
      p1: 6,
      p2: 0,
    },
    {
      game: [
        {
          point: [],
          p1: 4,
          p2: 0,
        },
      ],
      p1: 6,
      p2: 0,
    }
    ]
  },
  p1_name: "Ken",
  p2_name: "Jun",
}

const score = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
}

Array.prototype.last = function(){
  return this[this.length - 1];
};

class Match extends React.Component {
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
      best_of: 1,
    }
  }

  componentDidMount() {
    this.setState({
      p1_name: this.props.data?.p1_name,
      p2_name: this.props.data?.p2_name,
      best_of: this.props.data?.best_of,
    });
  }

  /**
   * Awwards point and returns an array of formatted game score (eg. 40-15)
   * @param p   Player to award point (true = p1, false = p2)
   */
  point(p) {
    const winner = p ? 'p1' : 'p2';
    let match = this.state.match;
    let cur_game = this.state.match.set.last().game.last();
    cur_game[winner]++;
    cur_game.point.push(p);
    if (Math.abs(cur_game.p1-cur_game.p2) >= 2 && Math.max(cur_game.p1, cur_game.p2) >= 4) {
    }
  }

  /**
   * Returns the game score in an array (eg. 40-15)
   */
  gameScore() {
    // TODO
    return null
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Scoreboard data={this.state} />
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity style={{padding: '2%'}}>
            <Text style={{fontSize: 64}}>15</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}}>
            <Text style={{fontSize: 64}}>-</Text>
          </View>
          <TouchableOpacity style={{padding: '2%'}}>
            <Text style={{fontSize: 64}}>40</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Match;

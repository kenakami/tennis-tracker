import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Scoreboard from './components/Scoreboard';

const score = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'Ad',
}

Array.prototype.last = function(){
  return this[this.length - 1];
};

class MatchSimple extends React.Component {
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
        }],
        p1: 0,
        p2: 0,
      },
      p1_serving: true,
      p1_name: "Foo",
      p2_name: "Bar",
      best_of: 1,
    }
  }

  componentDidMount() {
    this.setState({
      p1_serving: this.props.route?.params?.p1_serving,
      p1_name: this.props.route?.params?.p1_name,
      p2_name: this.props.route?.params?.p2_name,
    });
  }

  /**
   * Awwards point
   * @param p   Player to award point (true = p1, false = p2)
   */
  point(p) {
    if (this.state.done) return;
    const winner = p ? 'p1' : 'p2';
    let match = this.state.match;
    let cur_game = match.set.last().game.last();
    cur_game[winner]++;
    cur_game.point.push(p);
    if (Math.min(cur_game.p1, cur_game.p2) >= 4 && cur_game.p1 == cur_game.p2) {
      cur_game.p1 = 3;
      cur_game.p2 = 3;
    }
    // Game
    if (Math.abs(cur_game.p1-cur_game.p2) >= 2 && Math.max(cur_game.p1, cur_game.p2) >= 4) {
      let cur_set = match.set.last();
      cur_set[winner]++;
      // Set
      // TODO tie breakers
      if (Math.abs(cur_set.p1-cur_set.p2) >= 2 && Math.max(cur_set.p1, cur_set.p2) >= 6) {
        match[winner]++;
        // Match
        if (Math.max(match.p1, match.p2) >= Math.trunc(this.state.best_of/2)+1) {
          this.setState({done: true});
          this.setState({match: match});
          alert(`Game, Set, Match!\nWon by ${p ? this.state.p1_name : this.state.p2_name}`);
          return;
        } 
        match.set.push({
          game: [],
          p1: 0,
          p2: 0,
        });
      }
      this.setState({p1_serving: !this.state.p1_serving});
      match.set.last().game.push({
        point: [],
        p1: 0,
        p2: 0,
      });
    }
    this.setState({match: match});
  }

  /**
   * Returns the game score in an array (eg. 40-15)
   */
  gameScore() {
    // TODO
    let p1 = score[this.state.match.set.last().game.last().p1];
    let p2 = score[this.state.match.set.last().game.last().p2];
    return [p1, p2];
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Scoreboard data={this.state} />
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity
            style={{padding: '2%'}}
            onPress={() => {
              this.point(true);
            }}
          >
            <Text style={{fontSize: 64}}>{this.state.done ? 0 : score[this.state.match.set.last().game.last().p1]}</Text>
            <Text style={{fontSize: 32}}>{this.state.p1_name}</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}}>
            <Text style={{fontSize: 64}}>-</Text>
          </View>
          <TouchableOpacity
            style={{padding: '2%'}}
            onPress={() => {
              this.point(false);
            }}
          >
            <Text style={{fontSize: 64}}>{this.state.done ? 0 : score[this.state.match.set.last().game.last().p2]}</Text>
            <Text style={{fontSize: 32}}>{this.state.p2_name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default MatchSimple;

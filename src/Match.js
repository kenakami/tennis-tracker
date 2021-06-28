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
  done: false,
}

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
        }],
        p1: 0,
        p2: 0,
      },
      p1_name: "Foo",
      p2_name: "Bar",
      best_of: 1,
    }
  }

  componentDidMount() {
    /*
    this.setState({
      p1_name: this.props.data?.p1_name,
      p2_name: this.props.data?.p2_name,
      best_of: this.props.data?.best_of,
    });
    */
  }

  /**
   * Awwards point and returns an array of formatted game score (eg. 40-15)
   * @param p   Player to award point (true = p1, false = p2)
   */
  point(p) {
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
        if (Math.max(match.p1, match.p2) >= Math.trunc(match.best_of/2)+1) {
          // game set match
          alert('match');
          this.setState({match: match});
          alert(`Game, Set, Match!\nWon by ${p ? match.p1_name : match.p2.name}`);
          return;
        } else {
          match.set.push({
            game: [
              {
                point: [],
                p1: 0,
                p2: 0,
              },
            ],
            p1: 0,
            p2: 0,
          });
        }
      } else {
        match.set.last().game.push({
          point: [],
          p1: 0,
          p2: 0,
        });
      }
    }
    this.setState({match: match});
    console.log(this.state);
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
          <TouchableOpacity style={{padding: '2%'}} onPress={() => this.point(true)}>
            <Text style={{fontSize: 64}}>{score[this.state.match.set.last().game.last().p1]}</Text>
            <Text style={{fontSize: 32}}>{this.state.p1_name}</Text>
          </TouchableOpacity>
          <View style={{padding: '2%'}}>
            <Text style={{fontSize: 64}}>-</Text>
          </View>
          <TouchableOpacity style={{padding: '2%'}} onPress={() => this.point(false)}>
            <Text style={{fontSize: 64}}>{score[this.state.match.set.last().game.last().p2]}</Text>
            <Text style={{fontSize: 32}}>{this.state.p2_name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Match;

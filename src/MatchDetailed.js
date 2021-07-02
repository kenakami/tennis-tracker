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

class MatchDetailed extends React.Component {
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
      data: 'First Service'
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
   * Awwards point and returns an array of formatted game score (eg. 40-15)
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

  backToFirstService() {
    this.setState({data: 'First Service'})
  }

  handleFault() {
    if (this.state.data == "Second Service") {
      this.setState({data: 'First Service'})
      this.point(!this.state.p1_serving)
    } else {
      this.setState({data: 'Second Service'})
    }
  }

  renderServer1() {
    return(
      <View style = {{flex: 1, backgroundColor: '#6495ed'}}>
        <View style = {{height: '88%', flexDirection: 'row'}}>
            <View style = {{width: '50%', height: '100%'}}>
              <TouchableOpacity style = {styles.button} onPress={() => {this.setState({data: "Ball in Play"})}}>
                <Text style = {{fontSize: 19, color: 'green'}}>
                    Ball in 
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress = {() => {this.handleFault()}}>
                <Text style = {{fontSize: 19, color: 'red'}}>
                  Fault
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(this.state.p1_serving)
                }}>
                <Text style = {{fontSize: 19, color: 'green'}}>
                  Ace
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {{width: '50%', height: '100%'}}>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(!this.state.p1_serving)
                }}>
                <Text style = {{fontSize: 19, color: 'green'}}>
                  Return Winner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(this.state.p1_serving)
                }}>
                <Text style = {{fontSize: 19, color: 'red'}}>
                  Return Error
                </Text>
              </TouchableOpacity>

            </View>
        </View>
        <TouchableOpacity style = {styles.button}>
            <Text style = {{fontSize: 19}}>
                Undo
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderServer2() {
    return(
      <View style = {{flex: 1, backgroundColor: '#6495ed'}}>
        <View style = {{height: '88%', flexDirection: 'row'}}>
          <View style = {{width: '50%', height: '100%'}}>
            <TouchableOpacity style = {styles.button} onPress={() => {
              this.backToFirstService()
              this.point(!this.state.p1_serving)
              }}>
              <Text style = {{fontSize: 19, color: 'green'}}>
                Return Winner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress={() => {
              this.backToFirstService()
              this.point(this.state.p1_serving)
              }}>
              <Text style = {{fontSize: 19, color: 'red'}}>
                Return Error
              </Text>
            </TouchableOpacity>
          </View>
          <View style = {{width: '50%', height: '100%'}}>
            <TouchableOpacity style = {styles.button} onPress={() => {this.setState({data: "Ball in Play"})}}>
              <Text style = {{fontSize: 19, color: 'green'}}>
                Ball in 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress = {() => {this.handleFault()}}>
              <Text style = {{fontSize: 19, color: 'red'}}>
                Fault
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress={() => {
              this.backToFirstService()
              this.point(this.state.p1_serving)
              }}>
              <Text style = {{fontSize: 19, color: 'green'}}>
                Ace
              </Text>
            </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity style = {styles.button}>
              <Text style = {{fontSize: 19}}>
                  Undo
              </Text>
          </TouchableOpacity>
        </View>
    );
  }

  renderBallIn() {
    return(
      <View style = {{flex: 1, backgroundColor: '#6495ed'}}>
        <View style = {{height: '88%', flexDirection: 'row'}}>
            <View style = {{width: '50%', height: '100%'}}>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(true)
                }}>
                <Text style = {{fontSize: 19, color: 'green'}}>
                  Winner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(false)
                }}>
                <Text style = {{fontSize: 19, color: 'red'}}>
                  Forced Error
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(false)
                }}>
                <Text style = {{fontSize: 19, color: 'red'}}>
                  Unforced error
                </Text>
              </TouchableOpacity>
            </View>
            <View style = {{width: '50%', height: '100%'}}>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(false)
                }}>
                <Text style = {{fontSize: 19, color: 'green'}}>
                  Winner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(true)
                }}>
                <Text style = {{fontSize: 19, color: 'red'}}>
                  Forced Error
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress={() => {
                this.backToFirstService()
                this.point(true)
                }}>
                <Text style = {{fontSize: 19, color: 'red'}}>
                  Unforced error
                </Text>
              </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style = {styles.button}>
          <Text style = {{fontSize: 19}}>
              Undo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
    <SafeAreaView style={{flex: 1}}>
      <Scoreboard data={this.state} />
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%'}}>
          <Text style = {{fontSize: 18}}>
              {this.state.p1_name}
          </Text>
          <Text style = {{color: '#00bfff', fontSize: 18}}>
              {this.state.data}
          </Text>
          <Text style = {{fontSize: 18}}>
              {this.state.p2_name}
          </Text>
      </View> 
      {this.state.p1_serving & this.state.data != "Ball in Play" ? this.renderServer1() : null}
      {!this.state.p1_serving & this.state.data != "Ball in Play" ? this.renderServer2() : null}
      {this.state.data == "Ball in Play" ? this.renderBallIn() : null}
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flex: 1,
      borderColor: 'black', 
      borderWidth: 1,
      backgroundColor: 'white',
      padding: '0.5%'
    }
  });
export default MatchDetailed;

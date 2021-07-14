import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActionSheetIOS } from 'react-native';
import Scoreboard from './components/Scoreboard';
import { Ionicons } from '@expo/vector-icons';
import util from './util';

import { useSelector, useDispatch } from 'react-redux'
import { addMatch, setMatch } from './features/matches/matchesSlice';

const convert = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'Ad',
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

function MatchDetailed(props) {
  const matches = useSelector((state) => state.matches.array)
  const dispatch = useDispatch()

  const index = props.route.params.index
  const [score, setScore] = useState(matches[index].score);
  const [info, setInfo] = useState(matches[index].info);
  const [stats, setStats] = useState(matches[index].stats);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Details', {
          index: index
        })}>
          <Ionicons name="stats-chart" size={20} color="black" />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { marginRight: '4%' }
    })
    dispatch(setMatch({
      index: props.route.params.index,
      data: {
        score: score,
        info: info,
        stats: stats,
      },
    }));
    return () => {
    };
  }, [score, info]);

  useEffect(() => {
    util.storeData('matches', matches);
  },[matches]);

  const point = (p) => {
    if (info.done) return;
    const winner = p ? 'p1' : 'p2';
    let temp_score = JSON.parse(JSON.stringify(score));    // copy current score into match
    let cur_game = temp_score.set.last().game.last();

    cur_game[winner]++;
    cur_game.point.push(p);
    if (Math.min(cur_game.p1, cur_game.p2) >= 4 && cur_game.p1 == cur_game.p2) {
      cur_game.p1 = 3;
      cur_game.p2 = 3;
    }
    // Game
    if (Math.abs(cur_game.p1 - cur_game.p2) >= 2 && Math.max(cur_game.p1, cur_game.p2) >= 4) {
      let cur_set = temp_score.set.last();
      cur_set[winner]++;
      // Set
      // TODO tie breakers
      if (Math.abs(cur_set.p1 - cur_set.p2) >= 2 && Math.max(cur_set.p1, cur_set.p2) >= 6) {
        temp_score[winner]++;
        // Match
        if (Math.max(temp_score.p1, temp_score.p2) >= Math.trunc(info.best_of / 2) + 1) {
          //setInfo({ ...info, done: true });
          temp_score.done = true;
          setScore(temp_score);
          alert(`Game, Set, Match!\nWon by ${p ? info.p1_name : info.p2_name}`);
          return;
        }
        temp_score.set.push({
          game: [],
          p1: 0,
          p2: 0,
        });
      }
      // setInfo({ ...info, p1_serving: !score.p1_serving });
      temp_score.p1_serving = !score.p1_serving;
      temp_score.set.last().game.push({
        point: [],
        p1: 0,
        p2: 0,
      });
    }
    setScore({ ...temp_score });
  }

  const backToFirstService = () => {
    setInfo({ ...info, state: 'First Service', first_serve: true});
  }

  const handleAce = () => {
    let temp = JSON.parse(JSON.stringify(stats));
    let server = score.p1_serving ? 'p1' : 'p2';
    point(score.p1_serving)
    temp[server].aces++
    temp[server].winners++
    temp[server].points_won++
    temp[server].total_serve_wins++
    if (info.first_serve) {
      temp[server].first_serve_in++
      temp[server].first_serve_total++
      temp[server].first_serve_wins++
    } else {
      temp[server].second_serve_in++
      temp[server].second_serve_win++
    }
    backToFirstService()
    setStats(temp);
  }

  const handleFault = () => {
    let temp = JSON.parse(JSON.stringify(stats));
    let server = score.p1_serving ? 'p1' : 'p2';
    let receiver = score.p1_serving ? 'p2' : 'p1';
    if (info.first_serve) {
      setInfo({ ...info, state: 'Second Service', first_serve: false})
      temp[server].first_serve_total++
    } else {
      point(!score.p1_serving)
      backToFirstService()
      temp[server].double_faults++
      temp[server].unforced_errors++
      temp[receiver].points_won++
    }
    setStats(temp);
  }

  const handleBallIn = () => {
    let temp = JSON.parse(JSON.stringify(stats));
    setInfo({ ...info, state: 'Ball in Play'})
    let server = score.p1_serving ? 'p1' : 'p2';
    if (info.state == "First Service") {
      temp[server].first_serve_total++
      temp[server].first_serve_in++
    }
    setStats(temp);
  }

  const handleReturnWinner = () => {
    let temp = JSON.parse(JSON.stringify(stats));
    let server = score.p1_serving ? 'p1' : 'p2';
    let receiver = score.p1_serving ? 'p2' : 'p1';
    point(!score.p1_serving)
    temp[receiver].winners++
    temp[receiver].points_won++
    if (info.first_serve) {
      temp[server].first_serve_total++
      temp[server].first_serve_in++
    }
    backToFirstService()
    setStats(temp);
  }

  const handleReturnError = () => {
    let temp = JSON.parse(JSON.stringify(stats));
    let server = score.p1_serving ? 'p1' : 'p2';
    let receiver = score.p1_serving ? 'p2' : 'p1';
    point(score.p1_serving)
    temp[server].points_won++
    temp[server].total_serve_wins++
    if (info.first_serve) {
      temp[server].first_serve_total++
      temp[server].first_serve_in++
      temp[server].first_serve_wins++
      temp[receiver].forced_errors++
    } else {
      temp[receiver].unforced_errors++
    }
    backToFirstService()
    setStats(temp);
  }

  const handleWinners = (p) => {
    let temp = JSON.parse(JSON.stringify(stats));
    let server = score.p1_serving ? 'p1' : 'p2';
    let receiver = score.p1_serving ? 'p2' : 'p1';
    point(p)
    setStats(temp);
  }

  const handleForcedError = (p) => {
    let temp = JSON.parse(JSON.stringify(stats));
    setStats(temp);
  }

  const handleUnforcedError = (p) => {
    let temp = JSON.parse(JSON.stringify(stats));
    setStats(temp);
  }

  const actionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Generate number", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
        } else if (buttonIndex === 2) {
        }
      }
    );
  const renderServer1 = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#6495ed' }}>
        <View style={{ height: '88%', flexDirection: 'row' }}>
          <View style={{ width: '50%', height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={() => { handleBallIn() }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Ball in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { handleFault() }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Fault
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleAce()
            }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Ace
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleReturnWinner()
            }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Return Winner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleReturnError()
            }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Return Error
              </Text>
            </TouchableOpacity>

          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 19 }}>
            Undo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderServer2 = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#6495ed' }}>
        <View style={{ height: '88%', flexDirection: 'row' }}>
          <View style={{ width: '50%', height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleReturnWinner()
            }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Return Winner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleReturnError()
            }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Return Error
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={() => { handleBallIn() }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Ball in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { handleFault() }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Fault
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleAce()
            }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Ace
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 19 }}>
            Undo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderBallIn = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#6495ed' }}>
        <View style={{ height: '88%', flexDirection: 'row' }}>
          <View style={{ width: '50%', height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleWinners(true)
            }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Winner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleForcedError(true)
            }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Forced Error
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleUnforcedError(true)
            }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Unforced error
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', height: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleWinners(false)
            }}>
              <Text style={{ fontSize: 19, color: 'green' }}>
                Winner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleForcedError(false)
            }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Forced Error
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleUnforcedError(false)
            }}>
              <Text style={{ fontSize: 19, color: 'red' }}>
                Unforced error
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 19 }}>
            Undo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Scoreboard match={{ score: score, info: info }} />
      <View style={{ flexDirection: 'row', marginTop: '3%' }}>
        <Text style={{ flex: 1, fontSize: 18, textAlign: 'left' }}>
          {info.p1_name}
        </Text>
        <Text style={{ flex: 1, fontSize: 18, textAlign: 'center', color: '#00bfff' }}>
          {info.state}
        </Text>
        <Text style={{ flex: 1, fontSize: 18, textAlign: 'right' }}>
          {info.p2_name}
        </Text>
      </View>
      {score.p1_serving & info.state != "Ball in Play" ? renderServer1() : null}
      {!score.p1_serving & info.state != "Ball in Play" ? renderServer2() : null}
      {info.state == "Ball in Play" ? renderBallIn() : null}
    </SafeAreaView>
  );

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

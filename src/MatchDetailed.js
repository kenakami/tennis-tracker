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
const boolToP = (bool) => bool ? 'p1' : 'p2';

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
    let match = JSON.parse(JSON.stringify(score));    // copy current score into match
    let temp_stats = JSON.parse(JSON.stringify(stats));    // copy current stats into temp_stats
    let cur_game = match.set.last().game.last();
    cur_game[winner]++;
    cur_game.point.push(p);

    // check break point
    if (cur_game[boolToP(!info.p1_serving)] >= 3 && cur_game[boolToP(info.p1_serving)] <= 2) {
      temp_stats[boolToP(!info.p1_serving)].break_points_total++;
      setStats(temp_stats);
    }

    if (Math.min(cur_game.p1, cur_game.p2) >= 4 && cur_game.p1 == cur_game.p2) {
      cur_game.p1 = 3;
      cur_game.p2 = 3;
    }
    // Game
    if (Math.abs(cur_game.p1 - cur_game.p2) >= 2 && Math.max(cur_game.p1, cur_game.p2) >= 4) {
      let cur_set = match.set.last();
      cur_set[winner]++;
      // check break point won
      if (p != p1_serving) {
        temp_stats[winner].break_points_won++;
        setStats(temp_stats);
      }
      // Set
      // TODO tie breakers
      if (Math.abs(cur_set.p1 - cur_set.p2) >= 2 && Math.max(cur_set.p1, cur_set.p2) >= 6) {
        match[winner]++;
        // Match
        if (Math.max(match.p1, match.p2) >= Math.trunc(info.best_of / 2) + 1) {
          setInfo({ ...info, done: true });
          setScore(match);
          alert(`Game, Set, Match!\nWon by ${p ? info.p1_name : info.p2_name}`);
          return;
        }
        match.set.push({
          game: [],
          p1: 0,
          p2: 0,
        });
      }
      setInfo({ ...info, p1_serving: !info.p1_serving });
      match.set.last().game.push({
        point: [],
        p1: 0,
        p2: 0,
      });
    }
    setScore({ ...match });
    setStats(temp_stats);
  }

  const backToFirstService = () => {
    setInfo({ ...info, state: 'First Service', first_serve: true});
  }

  const handleFault = () => {
    let temp = JSON.parse(JSON.stringify(stats));
    if (info.state == "Second Service") {
      setInfo({ ...info, state: 'First Service', first_serve: true});
      point(!info.p1_serving)
      if (info.p1_serving) {
        temp.p1.double_faults++
        temp.p2.points_won++
        temp.p1.unforced_errors++
      } else {
        temp.p2.double_faults++
        temp.p1.points_won++
        temp.p2.unforced_errors++
      }
    } else {
      setInfo({ ...info, state: 'Second Service', first_serve: false});
      if (info.p1_serving) {
        temp.p1.total_first_serves++
        temp.p1.total_second_serves++
      } else {
        temp.p2.total_first_serves++
        temp.p2.total_second_serves++
      }
    }
    setStats(temp);
    console.log(stats);
  }

  const handleBallIn = () => {
    setInfo({ ...info, state: 'Ball in Play' });
    let temp = JSON.parse(JSON.stringify(stats));
    if (info.p1_serving & info.state == "First Service") {
      temp.p1.total_first_serves++
      temp.p1.first_serve++
    } else if (info.p2_serving & info.state == "First Service") {
      temp.p2.total_first_serves++
      temp.p2.first_serve++
    }
    setStats(temp);
    console.log(stats)
  }

  const handleAce = () => {
    backToFirstService()
    point(info.p1_serving)
    let temp = JSON.parse(JSON.stringify(stats));
    if (info.p1_serving) {
      temp.p1.aces++
      temp.p1.winners++
      temp.p1.points_won++
      if (info.state == "First Service") {
        temp.p1.first_serve++
        temp.p1.total_first_serves++
        temp.p1.first_serve_win++
      } else {
        temp.p1.second_serve_win++
      }
    } else {
      temp.p2.aces++
      temp.p2.winners++
      temp.p2.points_won++
      if (info.state == "First Service") {
        temp.p2.first_serve++
        temp.p2.total_first_serves++
        temp.p2.first_serve_win++
      } else {
        temp.p2.second_serve_win++
      }
    }
    setStats(temp);
    console.log(stats)
  }

  const handleReturnWinner = () => {
    backToFirstService()
    point(!info.p1_serving)
    let temp = JSON.parse(JSON.stringify(stats));
    if (info.p1_serving) {
      temp.p2.winners++
      temp.p2.points_won++
      if (info.state == "First Service") {
        temp.p1.first_serve++
        temp.p1.total_first_serves++
      }
    } else {
      temp.p1.winners++
      temp.p1.points_won++
      if (info.state == "First Service") {
        temp.p2.first_serve++
        temp.p2.total_first_serves++
      }
    }
    setStats(temp);
    console.log(stats)
  }

  const handleReturnError = () => {
    backToFirstService()
    point(info.p1_serving)
    let temp = JSON.parse(JSON.stringify(stats));
    if (info.p1_serving) {
      if (info.state == "First Service") {
        temp.p2.forced_errors++
        temp.p1.total_first_serves++
        temp.p1.first_serve++
        temp.p1.first_serve_win++
      } else {
        temp.p2.unforced_errors++
        temp.p1.second_serve_win++
      }
      temp.p1.points_won++
    } else {
      if (info.state == "First Service") {
        temp.p1.forced_errors++
        temp.p2.total_first_serves++
        temp.p2.first_serve++
        temp.p2.first_serve_win++
      } else {
        temp.p1.unforced_errors++
        temp.p2.second_serve_win++
      }
      temp.p2.points_won++
    }
    setStats(temp);
    console.log(stats)
  }

  const handleWinners = (p) => {
    let temp = JSON.parse(JSON.stringify(stats));
    if (p) {
      temp.p1.winners++
      temp.p1.points_won++
      if (info.p1_serving & info.first_serve) {
        temp.p1.first_serve_win++
      } else if (info.p1_serving & !info.first_serve) {
        temp.p1.second_serve_win++
      }
    } else {
      temp.p2.winners++
      temp.p2.points_won++
      if (!info.p1_serving & info.first_serve) {
        temp.p2.first_serve_win++
      } else if (!info.p1_serving & !info.first_serve) {
        temp.p2.second_serve_win++
      }
    }
    backToFirstService()
    point(p)
    setStats(temp);
    console.log(stats)
  }

  const handleForcedError = (p) => {
    let temp = JSON.parse(JSON.stringify(stats));
    if (p) {
      temp.p1.forced_errors++
      temp.p2.points_won++
      if (!info.p1_serving & info.first_serve) {
        temp.p2.first_serve_win++
      } else if (!info.p1_serving & !info.first_serve) {
        temp.p2.second_serve_win++
      }
    } else {
      temp.p2.forced_errors++
      temp.p1.points_won++
      if (info.p1_serving & info.first_serve) {
        temp.p1.first_serve_win++
      } else if (info.p1_serving & !info.first_serve) {
        temp.p1.second_serve_win++
      }
    }
    backToFirstService()
    point(!p)
    setStats(temp);
    console.log(stats)
  }

  const handleUnforcedError = (p) => {
    let temp = JSON.parse(JSON.stringify(stats));
    if (p) {
      temp.p1.unforced_errors++
      temp.p2.points_won++
      if (!info.p1_serving & info.first_serve) {
        temp.p2.first_serve_win++
      } else if (!info.p1_serving & !info.first_serve) {
        temp.p2.second_serve_win++
      }
    } else {
      temp.p2.unforced_errors++
      temp.p1.points_won++
      if (info.p1_serving & info.first_serve) {
        temp.p1.first_serve_win++
      } else if (info.p1_serving & !info.first_serve) {
        temp.p1.second_serve_win++
      }
    }
    backToFirstService()
    point(!p)
    setStats(temp);
    console.log(stats)
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
      {info.p1_serving & info.state != "Ball in Play" ? renderServer1() : null}
      {!info.p1_serving & info.state != "Ball in Play" ? renderServer2() : null}
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

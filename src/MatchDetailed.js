import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActionSheetIOS } from 'react-native';
import Scoreboard from './components/Scoreboard';
import { Ionicons } from '@expo/vector-icons';
import util from './util';

import { useSelector, useDispatch } from 'react-redux'
import { addMatch, setMatch } from './features/matches/matchesSlice';
import { ActionCreators } from "redux-undo";

const convert = {
  true: 'p1',
  false: 'p2',
  'p1': true,
  'p2': false,
}

Array.prototype.last = function () {
  return this[this.length - 1];
};


function MatchDetailed(props) {
  const matches = useSelector((state) => state.matches.present.array);
  const state = useSelector((state) => state.matches);
  const dispatch = useDispatch()
  const index = props.route.params.index

  useEffect(() => {
    dispatch(ActionCreators.clearHistory());
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

    return () => {
      dispatch(ActionCreators.clearHistory());
    }
  },[]);

  useEffect(() => {
    util.storeData('matches', matches);
  },[matches]);

  /**
   * Awards point to player p, and updates score, info, and breakpoint stats
   * @param {boolean} p Player that won; true = p1, false = p2
   * @param {object} temp_score Current score
   * @param {object} temp_info Current info
   * @return {array} Contains the resulting score, info, and stats
   */
  const pointNew = (p, temp_score, temp_info) => {
    if (temp_info.done) return;
    const winner = p ? 'p1' : 'p2';
    let cur_game = temp_score.set.last().game.last();
    cur_game[winner]++;
    /*
    cur_game.point.push({
      outcome: p,
      history: history
    });
    */
    if (cur_game.point.length == 0) {
      cur_game.point.push({
        outcome: null,
        history: [],
      });
    }
    cur_game.point.last().outcome = p;
    if (Math.min(cur_game.p1, cur_game.p2) >= 4 && cur_game.p1 == cur_game.p2) {
      cur_game.p1 = 3;
      cur_game.p2 = 3;
    }
    // Game
    if (Math.abs(cur_game.p1 - cur_game.p2) >= 2 && Math.max(cur_game.p1, cur_game.p2) >= 4) {
      let cur_set = temp_score.set.last();
      cur_set[winner]++;
      cur_set.game.last().outcome =  p;
      // Set
      // TODO tie breakers
      if (Math.abs(cur_set.p1 - cur_set.p2) >= 2 && Math.max(cur_set.p1, cur_set.p2) >= 6) {
        temp_score[winner]++;
        temp_score.set.last().outcome = p;
        // Match
        if (Math.max(temp_score.p1, temp_score.p2) >= Math.trunc(temp_info.best_of / 2) + 1) {
          temp_info.done = true;
          alert(`Game, Set, Match!\nWon by ${p ? temp_info.p1_name : temp_info.p2_name}`);
          return;
        }
        temp_score.set.push({
          game: [],
          p1: 0,
          p2: 0,
        });
      }
      temp_info.p1_serving = !temp_info.p1_serving;
      temp_score.set.last().game.push({
        point: [],
        p1: 0,
        p2: 0,
        server: temp_info.p1_serving,
      });
    }
    cur_game = temp_score.set.last().game.last();
    cur_game.point.push({
      outcome: null,
      history: [],
    });
    return [temp_score, temp_info];
  }

  const updateBreakpoint = (p, temp_score, temp_info, temp_stats) => {
    // check breakpoints won with previous info
    let cur_game = temp_score.set.last().game.last();
    if (temp_info.breakpoint && cur_game.p1 == 0 && cur_game.p2 == 0) {
      temp_info.breakpoint = false;
      temp_stats[convert[p]].breakpoints_won++;
      return [temp_info, temp_stats];
    }
    // check breakpoints
    if (cur_game[convert[!temp_info.p1_serving]] >= 3 &&
        cur_game[convert[!temp_info.p1_serving]] - cur_game[convert[temp_info.p1_serving]] >= 1) {
      temp_info.breakpoint = true;
      temp_stats[convert[!temp_info.p1_serving]].breakpoints_total++;
    }
    return [temp_info, temp_stats];
  }

  /**
   * Update server and the state of the match and return updated info
   * @param {object} temp_info current info
   * @return {object} updated info
   */
  const backToFirstServe = (temp_info) => {
    temp_info.state = 'First Service';
    temp_info.first_serve = true;
    return temp_info;
  }

  /**
   * Update stats and score based on user input
   * @param {string} id describes the input
   * @param {boolean} p player associated; true = p1, false = p2
   */
  const handleOnPress = (id, p) => {
    let temp_score = JSON.parse(JSON.stringify(matches[index].score));
    let temp_info = JSON.parse(JSON.stringify(matches[index].info));
    let temp_stats = JSON.parse(JSON.stringify(matches[index].stats));
    let server = temp_info.p1_serving ? 'p1' : 'p2';
    let receiver = !temp_info.p1_serving ? 'p1' : 'p2';
    let point_complete, winner;
    temp_score.set.last().game.last().point.last().history.push(id);
    switch(id) {
      case 'ball_in':
        point_complete = false;
        temp_info.state = 'Ball in Play';
        if (temp_info.first_serve) {
          temp_stats[server].first_serve_total++
          temp_stats[server].first_serve_in++
        }
        break;
      case 'fault':
        if (temp_info.first_serve) {
          point_complete = false;
          temp_info.state = 'Second Service';
          temp_info.first_serve = false;
          temp_stats[server].first_serve_total++
        } else {
          point_complete = true;
          winner = !p;
          temp_info = backToFirstServe(temp_info);
          temp_stats[server].double_faults++
          temp_stats[server].unforced_errors++
          temp_stats[receiver].points_won++
        }
        break;
      case 'ace':
        point_complete = true;
        winner = p;
        temp_stats[server].aces++
        temp_stats[server].winners++
        temp_stats[server].points_won++
        temp_stats[server].total_serve_wins++
        if (temp_info.first_serve) {
          temp_stats[server].first_serve_in++
          temp_stats[server].first_serve_total++
          temp_stats[server].first_serve_wins++
        } else {
          temp_stats[server].second_serve_in++
          temp_stats[server].second_serve_win++
        }
        temp_info = backToFirstServe(temp_info);
        break;
      case 'return_winner':
        point_complete = true;
        winner = p;
        temp_stats[receiver].winners++
        temp_stats[receiver].points_won++
        if (temp_info.first_serve) {
          temp_stats[server].first_serve_total++
          temp_stats[server].first_serve_in++
        }
        temp_info = backToFirstServe(temp_info);
        break;
      case 'return_error':
        point_complete = true;
        winner = !p;
        temp_stats[server].points_won++
        temp_stats[server].total_serve_wins++
        if (temp_info.first_serve) {
          temp_stats[server].first_serve_total++
          temp_stats[server].first_serve_in++
          temp_stats[server].first_serve_wins++
          temp_stats[receiver].forced_errors++
        } else {
          temp_stats[receiver].unforced_errors++
        }
        temp_info = backToFirstServe(temp_info);
        break;
      case 'winner':
        point_complete = true;
        winner = p;
        temp_stats[convert[p]].winners++
        temp_stats[convert[p]].points_won++
        if (server == convert[p]) {
          temp_stats[convert[p]].total_serve_wins++
          if (temp_info.first_serve) {
            temp_stats[convert[p]].first_serve_wins++
          }
        }
        temp_info = backToFirstServe(temp_info);
        break;
      case 'forced_error':
        point_complete = true;
        winner = !p;
        temp_stats[convert[p]].forced_errors++
        temp_stats[convert[!p]].points_won++
        if (server == convert[!p]) {
          temp_stats[convert[!p]].total_serve_wins++
          if (temp_info.first_serve) {
            temp_stats[convert[!p]].first_serve_wins++
          }
        }
        temp_info = backToFirstServe(temp_info);
        break;
      case 'unforced_error':
        point_complete = true;
        winner = !p;
        temp_stats[convert[p]].unforced_errors++
        temp_stats[convert[!p]].points_won++
        if (server == convert[!p]) {
          temp_stats[convert[!p]].total_serve_wins++
          if (temp_info.first_serve) {
            temp_stats[convert[!p]].first_serve_wins++
          }
        }
        temp_info = backToFirstServe(temp_info);
        break;
    }
    if (point_complete) {
      [temp_score, temp_info] = pointNew(winner, temp_score, temp_info);
      [temp_info, temp_stats] = updateBreakpoint(winner, temp_score, temp_info, temp_stats);
    }
    dispatch(setMatch({
      index: props.route.params.index,
      data: {
        score: temp_score,
        info: temp_info,
        stats: temp_stats,
      },
    }));

    console.log(temp_score.set.last().game.last().point);
    console.log('--------------');
  }

  const renderServer = (p) => {
    return(
      <View style={{ width: '50%', height: '100%' }}>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('ball_in', p)}>
          <Text style={{ fontSize: 19, color: 'green' }}>
            Ball in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('fault', p)}>
          <Text style={{ fontSize: 19, color: 'red' }}>
            Fault
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('ace', p)}>
          <Text style={{ fontSize: 19, color: 'green' }}>
            Ace
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderReceiver = (p) => {
    return(
      <View style={{ width: '50%', height: '100%' }}>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('return_winner', p)}>
          <Text style={{ fontSize: 19, color: 'green' }}>
            Return Winner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('return_error', p)}>
          <Text style={{ fontSize: 19, color: 'red' }}>
            Return Error
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderBallInPlay = (p) => {
    return(
      <View style={{ width: '50%', height: '100%' }}>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('winner', p)}>
          <Text style={{ fontSize: 19, color: 'green' }}>
            Winner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('forced_error', p)}>
          <Text style={{ fontSize: 19, color: 'red' }}>
            Forced Error
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOnPress('unforced_error', p)}>
          <Text style={{ fontSize: 19, color: 'red' }}>
            Unforced error
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const renderUndo = () => {
    return(
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(ActionCreators.undo());
        }}
        disabled={state.past.length <= 0}
      >
        <Text style={{ fontSize: 19 }}>
          Undo
        </Text>
      </TouchableOpacity>
    );
  }
  
  const renderColumns = () => {
    // Ball in Play
    if (matches[index].info.state == 'Ball in Play') {
      return(
        <View style={{ height: '88%', flexDirection: 'row' }}>
          {renderBallInPlay(true)}
          {renderBallInPlay(false)}
        </View>
      );
    } else {
      //  p1 is serving
      if (matches[index].info.p1_serving) {
        return(
          <View style={{ height: '88%', flexDirection: 'row' }}>
            {renderServer(true)}
            {renderReceiver(false)}
          </View>
        );
      }
      // p2 is serving
      else {
        return(
          <View style={{ height: '88%', flexDirection: 'row' }}>
            {renderReceiver(true)}
            {renderServer(false)}
          </View>
        );
      }
    }
  }

  const renderInput = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#6495ed' }}>
        {renderColumns()}
        {renderUndo()}
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Scoreboard match={{ score: matches[index].score, info: matches[index].info }} />
      <View style={{ flexDirection: 'row', marginTop: '3%' }}>
        <Text style={{ flex: 1, fontSize: 18, textAlign: 'left' }}>
          {matches[index].info.p1_name}
        </Text>
        <Text style={{ flex: 1, fontSize: 18, textAlign: 'center', color: '#00bfff' }}>
          {matches[index].info.state}
        </Text>
        <Text style={{ flex: 1, fontSize: 18, textAlign: 'right' }}>
          {matches[index].info.p2_name}
        </Text>
      </View>
      {renderInput()}
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


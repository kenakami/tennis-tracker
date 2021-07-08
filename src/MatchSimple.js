import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
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

function MatchSimple(props) {
  const matches = useSelector((state) => state.matches.array)
  const dispatch = useDispatch()

  const index = props.route.params.index
  const [score, setScore] = useState(matches[index].score);
  const [info, setInfo] = useState(matches[index].info);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
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
    let cur_game = match.set.last().game.last();
    cur_game[winner]++;
    cur_game.point.push(p);
    if (Math.min(cur_game.p1, cur_game.p2) >= 4 && cur_game.p1 == cur_game.p2) {
      cur_game.p1 = 3;
      cur_game.p2 = 3;
    }
    // Game
    if (Math.abs(cur_game.p1 - cur_game.p2) >= 2 && Math.max(cur_game.p1, cur_game.p2) >= 4) {
      let cur_set = match.set.last();
      cur_set[winner]++;
      // Set
      // TODO tie breakers
      if (Math.abs(cur_set.p1 - cur_set.p2) >= 2 && Math.max(cur_set.p1, cur_set.p2) >= 6) {
        match[winner]++;
        // Match
        if (Math.max(match.p1, match.p2) >= Math.trunc(info.best_of / 2) + 1) {
          setInfo({ ...info, done: true });
          setScore(match);
          alert(`Game, Set, Match!\nWon by ${p ? this.state.p1_name : this.state.p2_name}`);
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
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Scoreboard match={{ score: score, info: info }} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={{ padding: '2%' }}
            onPress={() => {
              if (!info.done) {
                point(true);
              }
            }}
          >
            <Text style={{ fontSize: 64 }}>{info.done ? 0 : convert[score.set.last().game.last().p1]}</Text>
            <Text style={{ fontSize: 32 }}>{info.p1_name}</Text>
          </TouchableOpacity>
          <View style={{ padding: '2%' }}>
            <Text style={{ fontSize: 64 }}>-</Text>
          </View>
          <TouchableOpacity
            style={{ padding: '2%' }}
            onPress={() => {
              if (!info.done) {
                point(false);
              }
            }}
          >
            <Text style={{ fontSize: 64 }}>{info.done ? 0 : convert[score.set.last().game.last().p2]}</Text>
            <Text style={{ fontSize: 32 }}>{info.p2_name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

export default MatchSimple;

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Modal } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux'
import Scoreboard from './components/Scoreboard';
import { addMatch, setMatch, deleteMatch, clear } from './features/matches/matchesSlice';

const Tab = createMaterialTopTabNavigator();

const convert_score = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
  4: 'Ad',
}

const convert_name = {
  true: 'p1_name',
  false: 'p2_name',
}

function Details(props) {
  const matches = useSelector((state) => state.matches.present.array)
  const dispatch = useDispatch()
  let matchLog;

  const index = props.route.params.index
  const [score, setScore] = useState(matches[index].score);
  const [info, setInfo] = useState(matches[index].info);
  const [stats, setStats] = useState(matches[index].stats);

  const renderStats = () => {
    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 35, marginLeft: '10%' }}>
            {info.p1_name}
          </Text>
          <Text style={{ fontSize: 35, marginRight: '10%' }}>
            {info.p2_name}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.aces}
          </Text>
          <Text style={styles.middleText}>
            Aces
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.aces}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.double_faults}
          </Text>
          <Text style={styles.middleText}>
            Double Faults
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.double_faults}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {(stats.p1.first_serve_total == 0) ? 0 : Math.round(stats.p1.first_serve_in / stats.p1.first_serve_total * 100)}%
          </Text>
          <Text style={styles.middleText}>
            First serve %
          </Text>
          <Text style={styles.rightText}>
            {(stats.p2.first_serve_total == 0) ? 0 : Math.round(stats.p2.first_serve_in / stats.p2.first_serve_total * 100)}%
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.winners}
          </Text>
          <Text style={styles.middleText}>
            Winners
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.winners}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.unforced_errors}
          </Text>
          <Text style={styles.middleText}>
            Unforced Errors
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.unforced_errors}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.forced_errors}
          </Text>
          <Text style={styles.middleText}>
            Forced Errors
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.forced_errors}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {(stats.p1.first_serve_in == 0) ? 0 : Math.round(stats.p1.first_serve_wins / stats.p1.first_serve_in * 100)}%
          </Text>
          <Text style={styles.middleText}>
            Win % on 1st serve
          </Text>
          <Text style={styles.rightText}>
            {(stats.p2.first_serve_in == 0) ? 0 : Math.round(stats.p2.first_serve_wins / stats.p2.first_serve_in * 100)}%
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {(stats.p1.first_serve_total - stats.p1.first_serve_in == 0) ? 0 : Math.round((stats.p1.total_serve_wins - stats.p1.first_serve_wins) / (stats.p1.first_serve_total - stats.p1.first_serve_in) * 100)}%
          </Text>
          <Text style={styles.middleText}>
            Win % on 2nd serve
          </Text>
          <Text style={styles.rightText}>
            {(stats.p2.first_serve_total - stats.p2.first_serve_in == 0) ? 0 : Math.round((stats.p2.total_serve_wins - stats.p2.first_serve_wins) / (stats.p2.first_serve_total - stats.p2.first_serve_in) * 100)}%
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.breakpoints_won} / {stats.p1.breakpoints_total}
          </Text>
          <Text style={styles.middleText}>
            Break points Won
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.breakpoints_won} / {stats.p2.breakpoints_total}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {stats.p1.points_won}
          </Text>
          <Text style={styles.middleText}>
            Points Won
          </Text>
          <Text style={styles.rightText}>
            {stats.p2.points_won}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            {((stats.p1.points_won + stats.p2.points_won) == 0) ? 0 : Math.round(stats.p1.points_won / (stats.p1.points_won + stats.p2.points_won) * 100)}%
          </Text>
          <Text style={styles.middleText}>
            % of Points Won
          </Text>
          <Text style={styles.rightText}>
            {((stats.p1.points_won + stats.p2.points_won) == 0) ? 0 : Math.round(stats.p2.points_won / (stats.p1.points_won + stats.p2.points_won) * 100)}%
          </Text>
        </View>
      </ScrollView>
    );
  }

  const renderMatchLogNew = () => (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      ref={ref => {matchLog = ref}}
      onContentSizeChange={() => matchLog.scrollToEnd({animated: true})}
    >
      {renderSets(score.set)}
    </ScrollView>
  )

  const pointToLog = (point, server_bool) => {
    const server = info[convert_name[server_bool]];
    const receiver = info[convert_name[!server]];
    const winner = info[convert_name[point.outcome]];
    const loser = info[convert_name[!point.outcome]];
    let out = '';
    point.history.forEach((id, index) => {
      if (index > 0) out += '\n';
      let serve = index == 0 ? 'first' : 'second';
      switch(id) {
        case 'ball_in':
          out += `${server}'s ${serve} serve goes in.`;
          break;
        case 'fault':
          out += `${server} misses ${serve} serve.`;
          break;
        case 'ace':
          out += `${server} hits a ${serve} serve ace!`;
          break;
        case 'return_winner':
          out += `${receiver} hits a return winner!`;
          break;
        case 'return_error':
          out += `${receiver} hits a return error.`;
          break;
        case 'winner':
          out += `${winner} hits a winner!`;
          break;
        case 'forced_error':
          out += `${loser} hits a forced error.`;
          break;
        case 'unforced_error':
          out += `${loser} hits an unforced error.`;
          break;
        default:
          out += 'default';
      }
    });
    return out;
  }

  const renderPoints = (points, game) => {
    let [p1, p2] = [0, 0];
    return (
      points.map((point, index) => {
        switch(point.outcome) {
          case true:
            p1++;
            break;
          case false:
            p2++;
            break;
          default:
        }
        if (p1 == 4 && p2 == 4) {
          [p1, p2] = [3, 3];
        }
        return(
          <View style={{flexDirection: 'row'}}>
            <View style={styles.pointScore}>
              { !(game.outcome != null && index == points.length-1) &&
              <Text style={{flex: 4, textAlign: 'center'}}>
                {convert_score[p1]}
              </Text>
              }
              <Text style={{flex: 1, textAlign: 'center'}}>
                {game.outcome != null && index == points.length-1 ? 'game' : '-'}
              </Text>
              { !(game.outcome != null && index == points.length-1) &&
              <Text style={{flex: 4, textAlign: 'center'}}>
                {convert_score[p2]}
              </Text>
              }
            </View>
            <Text style={styles.pointDescription}>
              {pointToLog(point, game.server)}
            </Text>
          </View>
        )
      })
    );
  }

  const renderGames = (games) => {
    let [p1, p2] = [0, 0];
    return (
      games.map((game, index) => {
        switch(game.outcome) {
          case true:
            p1++;
            break;
          case false:
            p2++;
            break;
          default:
        }
        return (
        <View>
        <View style={[styles.header, {backgroundColor: '#696969'}]}>
          <Text style={{ marginLeft: '3%', fontSize: 17, color: 'white' }}>
            Game {index+1}
          </Text>
          <Text style={{ marginRight: '3%', fontSize: 17, color: `white` }}>
            {game.outcome == null ? 'in play' : p1+'-'+p2}
          </Text>
        </View>
        <View style={{ marginLeft: '2%', padding: '2%' }}>
          {renderPoints(game.point, game)}
        </View>
        </View>
        )
      })
    );
  }

  const renderSets = (sets) => {
    let [p1, p2] = [0, 0];
    return (
      sets.map((set, index) => {
        switch(set.outcome) {
          case true:
            p1++;
            break;
          case false:
            p2++;
            break;
          default:
        }
        return(
        <View>
        <View style={[styles.header, {backgroundColor: 'black'}]}>
          <Text style={{ marginLeft: '3%', fontSize: 17, color: 'white' }}>
            Set {index+1}
          </Text>
          <Text style={{ marginRight: '3%', fontSize: 17, color: `white` }}>
            {set.outcome == null ? 'in play' : p1+'-'+p2}
          </Text>
        </View>
          {renderGames(set.game)}
        </View>
        )
      })
    );
  }

  const renderMatchLog = () => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ width: '100%', height: '8%', backgroundColor: '#696969', justifyContent: 'center' }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ marginLeft: '3%', fontSize: 17, color: 'white' }}>
              Game 1
            </Text>
            <Text style={{ marginRight: '3%', fontSize: 17, color: `#e0ffff` }}>
              1-0
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: '3%', padding: '3%' }}>
          <View>
            <Text style={styles.leftScore}>
              00-00
            </Text>
            <Text style={styles.leftScore}>
              15-00
            </Text>
          </View>
          <View>
            <Text style={styles.description}>
              Serving Ken Nakamine
            </Text>
            <Text style={styles.description}>
              Ken hit an unforced error
            </Text>
          </View>
        </View>
        <View style={{ width: '100%', height: '8%', backgroundColor: '#696969', justifyContent: 'center' }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ marginLeft: '3%', fontSize: 17, color: 'white' }}>
              Game 2
            </Text>
            <Text style={{ marginRight: '3%', fontSize: 17, color: `#e0ffff` }}>
              2-0
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: '3%', padding: '3%' }}>
          <View>
            <Text style={styles.leftScore}>
              00-00
            </Text>
            <Text style={styles.leftScore}>
              15-00
            </Text>
          </View>
          <View>
            <Text style={styles.description}>
              Serving Ken Nakamine
            </Text>
            <Text style={styles.description}>
              Ken hit an unforced error
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Scoreboard match={{ score: score, info: info }} />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 14, fontWeight: '700' },
          style: { borderWidth: 0, shadowColor: 'transparent', backgroundColor: 'transparent' },
          indicatorStyle: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          }
        }}
      >
        <Tab.Screen name="Match Stats" component={renderStats} />
        <Tab.Screen name="Match Log" component={renderMatchLogNew} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20
  },
  leftText: {
    marginLeft: '15%',
    fontSize: 20,
    marginTop: '5%'
  },
  middleText: {
    fontSize: 20,
    marginTop: '5%'
  },
  rightText: {
    marginRight: '15%',
    fontSize: 20,
    marginTop: '5%'
  },
  pointScore: {
    flexDirection: 'row',
    justifyContent: 'center',
    //marginLeft: '3%',
    fontSize: 16,
    flex: 1,
  },
  pointDescription: {
    marginLeft: 12,
    fontSize: 16,
    flex: 6,
  },
  header: {
    width: '100%',
    height: 32,
    backgroundColor: '#696969',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export default Details;


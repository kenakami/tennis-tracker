import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Modal } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux'
import Scoreboard from './components/Scoreboard';
import { addMatch, setMatch, deleteMatch, clear } from './features/matches/matchesSlice';

const Tab = createMaterialTopTabNavigator();

function Details(props) {
  const matches = useSelector((state) => state.matches.array)
  const dispatch = useDispatch()

  const index = props.route.params.index
  const [score, setScore] = useState(matches[index].score);
  const [info, setInfo] = useState(matches[index].info);
  const [stats, setStats] = useState(matches[index].stats);

  const renderStats = () => {
    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 35, marginLeft: '10%' }}>
            Ken
          </Text>
          <Text style={{ fontSize: 35, marginRight: '10%' }}>
            Jun
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
            {Math.round(stats.p1.first_serve / stats.p1.total_first_serves * 100)}%
          </Text>
          <Text style={styles.middleText}>
            First serve %
          </Text>
          <Text style={styles.rightText}>
            {Math.round(stats.p2.first_serve / stats.p1.total_first_serves * 100)}%
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
            1
          </Text>
          <Text style={styles.middleText}>
            Win % on 1st serve
          </Text>
          <Text style={styles.rightText}>
            2
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            1
          </Text>
          <Text style={styles.middleText}>
            Win % on 2nd serve
          </Text>
          <Text style={styles.rightText}>
            2
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.leftText}>
            1
          </Text>
          <Text style={styles.middleText}>
            Break points Won
          </Text>
          <Text style={styles.rightText}>
            2
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
            1
          </Text>
          <Text style={styles.middleText}>
            % of Points Won
          </Text>
          <Text style={styles.rightText}>
            2
          </Text>
        </View>
      </ScrollView>
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
        <Tab.Screen name="Match Log" component={renderMatchLog} />
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
  leftScore: {
    marginLeft: '3%',
    fontSize: 15,
  },
  description: {
    fontSize: 15,
  }
});
export default Details;

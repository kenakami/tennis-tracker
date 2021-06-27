import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView , Modal} from 'react-native';
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


class Match extends React.Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <Scoreboard 
          data={data}
        />
        <View>
        </View>
      </View>
    );
  }
}
export default Match;

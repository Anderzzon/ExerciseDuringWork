import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { firebase } from '../../firebaseConfig';
import { LineChart } from 'react-native-chart-kit';

const WeekChart = () => {
  const { user } = useContext(AuthContext);
  const db = firebase.firestore();
  const exerciseData = db
    .collection('Users')
    .doc(user.uid)
    .collection('Completed');

  const [monday, setMonday] = useState(0);
  const [tusday, setTusday] = useState(0);
  const [wensday, setWensday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);

  useEffect(() => {
    exerciseData.onSnapshot((snapshot) => {
      const mon = [];
      const tus = [];
      const wen = [];
      const thu = [];
      const fri = [];
      const sat = [];
      const sun = [];
      snapshot.forEach((doc) => {
        const exercise = {
          date: doc.data().date.toDate(),
          name: doc.data().name,
        };
        exercise.id = doc.id;

        switch (exercise.date.getDay()) {
          case 1:
            mon.push(exercise);
            break;
          case 2:
            tus.push(exercise);
            break;
          case 3:
            wen.push(exercise);
            break;
          case 4:
            thu.push(exercise);
            break;
          case 5:
            fri.push(exercise);
            break;
          case 6:
            sat.push(exercise);
            break;
          case 0:
            sun.push(exercise);
            break;
        }
        //console.log(exercise);
      });
      setMonday(mon.length);
      setTusday(tus.length);
      setWensday(wen.length);
      setThursday(thu.length);
      setFriday(fri.length);
      setSaturday(sat.length);
      setSunday(sun.length);
    });
  });

  return (
    <LineChart
      data={{
        labels: ['Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: [monday, tusday, wensday, thursday, friday, saturday, sunday],
          },
        ],
      }}
      width={Dimensions.get('window').width * 0.9} // from react-native
      height={300}
      yAxisSuffix=" times"
      yAxisInterval={1} // optional, defaults to 1
      verticalLabelRotation={70}
      onDataPointClick={() => console.log('clicked')}
      chartConfig={{
        backgroundColor: '#566D87',
        backgroundGradientFrom: '#566D87',
        backgroundGradientTo: '#566D87',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          //stroke: "#ffa726"
        },
      }}
      bezier
      style={styles.bezier}
    />
  );
};

const YearChart = () => {
  const { user } = useContext(AuthContext);
  const db = firebase.firestore();
  const exerciseData = db
    .collection('Users')
    .doc(user.uid)
    .collection('Completed');

  const [january, setJanuary] = useState(0);
  const [february, setFebruary] = useState(0);
  const [march, setMarch] = useState(0);
  const [april, setApril] = useState(0);
  const [may, setMay] = useState(0);
  const [june, setJune] = useState(0);
  const [july, setJuly] = useState(0);
  const [august, setAugust] = useState(0);
  const [september, setSeptember] = useState(0);
  const [october, setOctober] = useState(0);
  const [november, setNovember] = useState(0);
  const [december, setDecember] = useState(0);

  useEffect(() => {
    exerciseData.onSnapshot((snapshot) => {
      const jan = [];
      const feb = [];
      const mar = [];
      const apr = [];
      const ma = [];
      const jun = [];
      const jul = [];
      const aug = [];
      const sep = [];
      const oct = [];
      const nov = [];
      const dec = [];
      snapshot.forEach((doc) => {
        const entity = {
          date: doc.data().date.toDate(),
          name: doc.data().name,
        };
        //doc.data()
        entity.id = doc.id;

        switch (entity.date.getMonth()) {
          case 0:
            jan.push(entity);
            break;
          case 1:
            feb.push(entity);
            break;
          case 2:
            mar.push(entity);
            break;
          case 3:
            apr.push(entity);
            break;
          case 4:
            ma.push(entity);
            break;
          case 5:
            jun.push(entity);
            break;
          case 6:
            jul.push(entity);
            break;
          case 7:
            aug.push(entity);
            break;
          case 8:
            sep.push(entity);
            break;
          case 9:
            oct.push(entity);
            break;
          case 10:
            nov.push(entity);
            break;
          case 11:
            dec.push(entity);
            break;
        }
        //newEntities.push(entity)
      });
      setJanuary(jan.length);
      setFebruary(feb.length);
      setMarch(mar.length);
      setApril(apr.length);
      setMay(ma.length);
      setJune(jun.length);
      setJuly(jul.length);
      setAugust(aug.length);
      setSeptember(sep.length);
      setOctober(oct.length);
      setNovember(nov.length);
      setDecember(dec.length);
    });
  });

  return (
    <LineChart
      data={{
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: [
              january,
              february,
              march,
              april,
              may,
              june,
              july,
              august,
              september,
              october,
              november,
              december,
            ],
          },
        ],
      }}
      width={Dimensions.get('window').width * 0.9} // from react-native
      height={300}
      //yAxisLabel="$"
      yAxisSuffix=" times"
      yAxisInterval={1} // optional, defaults to 1
      verticalLabelRotation={70}
      onDataPointClick={() => console.log('clicked')}
      chartConfig={{
        backgroundColor: '#566D87',
        backgroundGradientFrom: '#566D87',
        backgroundGradientTo: '#566D87',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          //stroke: "#ffa726"
        },
      }}
      bezier
      style={styles.bezier}
    />
  );
};

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headline}>Total exercises per day</Text>
        <WeekChart />
        <Text style={styles.headline}>Total exercises per month</Text>
        <YearChart />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#323F4E',
  },

  headline: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },

  bezier: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

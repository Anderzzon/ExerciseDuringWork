import React, {useContext, useState, useEffect} from "react";
import { SafeAreaView, Text, StyleSheet, Dimensions, ScrollView, Header } from "react-native";
import { AuthContext } from '../context/AuthContext';
import {firebase} from '../../firebaseConfig'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const WeekChart = () => {

  const { user } = useContext(AuthContext);
  const db = firebase.firestore()
  const exerciseData = db.collection('Users').doc(user.uid).collection("Completed")

  const [monday, setMonday] = useState(0)
  const [tusday, setTusday] = useState(0)
  const [wensday, setWensday] = useState(0)
  const [thursday, setThursday] = useState(0)
  const [friday, setFriday] = useState(0)
  const [saturday, setSaturday] = useState(0)
  const [sunday, setSunday] = useState(0)

  useEffect(() => {
    exerciseData
      .onSnapshot(
        snapshot => {
          const monday = []
          const tusday = []
          const wensday = []
          const thursday = []
          const friday = []
          const saturday = []
          const sunday = []
          snapshot.forEach(doc => {
            const entity = {
              date: doc.data().date.toDate(),
              name: doc.data().name
            }
            //doc.data()
            entity.id = doc.id

            switch (entity.date.getDay()) {
              case 1: monday.push(entity)
                break;
              case 2: tusday.push(entity)
                break;
              case 3: wensday.push(entity)
                break;
              case 4: thursday.push(entity)
                break;
              case 5: friday.push(entity)
                break;
              case 6: saturday.push(entity)
                break;
              case 0: sunday.push(entity)
                break;
            }
            //newEntities.push(entity)
            console.log(entity)
          })
          setMonday(monday.length)
          setTusday(tusday.length)
          setWensday(wensday.length)
          setThursday(thursday.length)
          setFriday(friday.length)
          setSaturday(saturday.length)
          setSunday(sunday.length)
          //setEntities(newEntities)
        }
      )
  }, [])

  return(
    <LineChart
    data={{
      labels: ["Mon", "Tus", "Wen", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [
            monday,
            tusday,
            wensday,
            thursday,
            friday,
            saturday,
            sunday
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width * 0.9} // from react-native
    height={300}
    //yAxisLabel="$"
    yAxisSuffix=" times"
    yAxisInterval={1} // optional, defaults to 1
    verticalLabelRotation={70}
    onDataPointClick= {() => console.log("clicked")}
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
        r: "6",
        strokeWidth: "2",
        //stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  )
}

const YearChart = () => {

  const { user } = useContext(AuthContext);
  const db = firebase.firestore()
  const exerciseData = db.collection('Users').doc(user.uid).collection("Completed")

  const [january, setJanuary] = useState(0)
  const [february, setFebruary] = useState(0)
  const [march, setMarch] = useState(0)
  const [april, setApril] = useState(0)
  const [may, setMay] = useState(0)
  const [june, setJune] = useState(0)
  const [july, setJuly] = useState(0)
  const [august, setAugust] = useState(0)
  const [september, setSeptember] = useState(0)
  const [october, setOctober] = useState(0)
  const [november, setNovember] = useState(0)
  const [december, setDecember] = useState(0)

  useEffect(() => {
    exerciseData
      .onSnapshot(
        snapshot => {
          const january = []
          const february = []
          const march = []
          const april = []
          const may = []
          const june = []
          const july = []
          const august = []
          const september = []
          const october = []
          const november = []
          const december = []
          snapshot.forEach(doc => {
            const entity = {
              date: doc.data().date.toDate(),
              name: doc.data().name
            }
            //doc.data()
            entity.id = doc.id

            switch (entity.date.getMonth()) {
              case 0: january.push(entity)
                break;
              case 1: february.push(entity)
                break;
              case 2: march.push(entity)
                break;
              case 3: april.push(entity)
                break;
              case 4: may.push(entity)
                break;
              case 5: june.push(entity)
                break;
              case 6: july.push(entity)
                break;
              case 7: august.push(entity)
                break;
              case 8: september.push(entity)
                break;
              case 9: october.push(entity)
                break;
              case 10: november.push(entity)
                break;
              case 11: december.push(entity)
                break;
            }
            //newEntities.push(entity)
            console.log(entity)
          })
          setJanuary(january.length)
          setFebruary(february.length)
          setMarch(march.length)
          setApril(april.length)
          setMay(may.length)
          setJune(june.length)
          setJuly(july.length)
          setAugust(august.length)
          setSeptember(september.length)
          setOctober(october.length)
          setNovember(november.length)
          setDecember(december.length)
        }
      )
  }, [])

  return(
    <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
            december
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width * 0.9} // from react-native
    height={300}
    //yAxisLabel="$"
    yAxisSuffix=" times"
    yAxisInterval={1} // optional, defaults to 1
    verticalLabelRotation={70}
    onDataPointClick= {() => console.log("clicked")}
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
        r: "6",
        strokeWidth: "2",
        //stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  )
}

export default () => {

  

    return (
      <SafeAreaView style = {styles.container}>
        <ScrollView>
        <Text style = {styles.headline}>Total exercises per day</Text>
        <WeekChart/>
        <Text style = {styles.headline}>Total exercises per month</Text>
        <YearChart/>
        </ScrollView>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      backgroundColor: '#323F4E',
    },

    headline: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      alignSelf: 'center'
    }

  });
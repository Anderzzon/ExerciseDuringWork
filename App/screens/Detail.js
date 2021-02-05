import React, { useContext, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Easing,
  StatusBar,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { firebase } from '../../firebaseConfig';
import { useRef } from 'react';
import { useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
let { width, height } = Dimensions.get('window');

export default ({ route, navigation }) => {
  const { user } = useContext(AuthContext);

  const saveCompletedExersice = () => {
    let date = new Date();
    const db = firebase.firestore();
    db.collection('Users')
      .doc(user.uid)
      .collection('Completed')
      .add({
        date: date,
        exercise: item.id,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  const createAlert = () =>
    Alert.alert(
      'Done',
      'Great job! Now, get back to work!',
      [{ text: 'OK', onPress: () => navigation.pop() }],
      { cancelable: false }
    );

  var item = route.params.item;
  const [entity, setEntity] = useState({
    gif:
      'https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif',
    name: '',
    description: '',
  });
  const heightToUse = height - 80;

  const [duration, setDuration] = useState(10);
  const inputRef = useRef();
  const timerAnimation = useRef(new Animated.Value(heightToUse)).current;
  const textInputAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const db = firebase.firestore();
    let exercise = db.collection('Exercises').doc(item.id);
    exercise
      .get()
      .then((doc) => {
        if (doc.exists) {
          setEntity({
            gif: doc.data().gif,
            name: doc.data().name,
            description: doc.data().description,
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [item]);

  useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });
    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  });

  const animateBackground = useCallback(() => {
    textInputAnimation.setValue(duration);
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: height - 170,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1200),
    ]).start(() => {
      //Set value for when an exercise should be considered finished
      // eslint-disable-next-line radix
      let value = Number.parseInt(JSON.stringify(textInputAnimation));
      if (value <= 5) {
        saveCompletedExersice();
        createAlert();
      }
      textInputAnimation.setValue(duration);

      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height,
            width,
            backgroundColor: '#F76A6A',
            transform: [
              {
                translateY: timerAnimation,
              },
            ],
          },
        ]}
      />
      <Text style={{ color: 'white', fontSize: 20 }}>
        {entity.description}{' '}
      </Text>

      <Image source={{ uri: `${entity.gif}` }} style={styles.gifImage} />
      <View>
        <Animated.View>
          <TextInput
            ref={inputRef}
            style={styles.countDown}
            editable={false}
            defaultValue={duration.toString()}
          />
        </Animated.View>

        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 100,
              opacity,
              transform: [
                {
                  translateY,
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              animateBackground();
            }}
          >
            <View style={styles.roundButton}>
              <Text style={styles.startText}> Start </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323F4E',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    padding: 20,
  },

  countDown: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 20,
    color: 'white',
  },

  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#F76A6A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },

  gifImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    margin: 100,
  },
});

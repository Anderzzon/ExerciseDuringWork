import React from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DATA from '../data/data';

  const ListItem = ({title, id, onPress}) => {
    return (
      <TouchableOpacity onPress = {onPress}>
        <View style = {styles.listItem}    >
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const Separator = () => <View style={styles.separator} />;
  
  export default ({ navigation }) => {
    return (
      <FlatList style = {styles.activityList}
        data = {DATA}
        renderItem = {({item}) =>
            <ListItem 
              title = {item.title} 
              id = {item.id} 
              onPress = {() => {
                navigation.navigate('Detail', {
                  item: item
                })
                console.log("ID:", item.id)
            }}
            />

        }
        ItemSeparatorComponent={Separator}
  
        />
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    listItem: {
      //width: '100%',
      alignContent: 'flex-start',
      padding: 20,
      margin: 5,
      borderColor: 'grey',
      borderWidth: 2
    },
  
    activityList: {
      width: '100%',
      backgroundColor: 'white'
    },
    separator: {
      backgroundColor: "#ececec",
      height: 1
    },
  });
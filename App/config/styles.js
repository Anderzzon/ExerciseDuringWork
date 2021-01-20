import React from 'react';

export default () => {
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
          width: '100%'
        }
      });
}
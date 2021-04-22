import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Drawer } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Categorys = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Drawer.Item
                style={{ backgroundColor: '#cd69ff'}}
                label="Personal"
                onPress={()=>navigation.navigate('Home',{category: 'Personal'})}
            />
            <Drawer.Item
                style={{ backgroundColor: '#ff64a5' }}
                label="Work"
                onPress={()=>navigation.navigate('Home',{category: 'Work'})}
            />
            <Drawer.Item
                style={{ backgroundColor: '#ff3d51' }}
                label="Ideas"
                onPress={()=>navigation.navigate('Home',{category: 'Ideas'})}

            />
            <Drawer.Item
                style={{ backgroundColor: '#b870ff' }}
                label="List"
                onPress={()=>navigation.navigate('Home',{category: 'List'})}

            />
        </View>
    )
}

export default Categorys

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      }
})
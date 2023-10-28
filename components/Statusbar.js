import  Constants  from 'expo-constants';  
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';  
import NetInfo from "@react-native-community/netinfo";
import {useNetInfo} from "@react-native-community/netinfo";
import React from 'react';  
import * as Animatable from 'react-native-animatable';


export default class Status extends React.Component{  
    state = {  
        isConnected: true,
    };

    componentDidMount() {
        NetInfo.fetch().then((state) => {
          this.setState({ isConnected: state.isConnected,
                          type: state.type});
        });
        
        this.unsubscribe = NetInfo.addEventListener((state) => {
          this.setState({ isConnected: state.isConnected,
                          type: state.type });
        });
    }
    componentWillUnmount() {
        
        if (this.unsubscribe) {
          this.unsubscribe();
        }
    }
    render() {  
        //const {info} = this.state;
        const { isConnected, type } = this.state;      
        const backgroundColor = !isConnected ? 'red' : 'green';
        const statusBar = ( 
            <Animatable.View 
            animation="fadeIn"
            duration={1000}
            style={{ zIndex: 1 }}
          >
            <StatusBar 
                backgroundColor={backgroundColor} 
                barStyle={!isConnected ? 'dark-content' : 'light-content'} 
                animated={false} 
                /> 
                </Animatable.View>
            );
        const messageContainer = (
            
                <Animatable.View 
                  animation={isConnected ? "slideInDown" : "slideOutUp"} 
                  duration={1000}
                  style={styles.messageContainer}
                >
                  {statusBar}
                  <View style={styles.myName}>
                    <Text style={styles.text2}> BALDOZA</Text>
                  </View>
                 
                  {isConnected && type ? (
                    <View style={styles.networkUpBubble}>
                      <Text style={styles.text}></Text>
                      <Text style={styles.text}>There is a network connection</Text>
                    </View>
                  ) : (
                    <View style={styles.networkDownbubble}>
                      <Text style={styles.text}> </Text>
                      <Text style={styles.text}>There is no network connection</Text>
                    </View>
                  )}
                </Animatable.View>
              );
          
              if (Platform.OS === "android") {
                return (
                  <View style={[styles.status, { backgroundColor }]}>
                    {messageContainer}
                  </View>
                );
              }
          
              return messageContainer;
            }
          }
const statusHeight = (Platform.OS === "android" ? Constants.statusBarHeight : 0)

const styles = StyleSheet.create({  
    status: {  
        zIndex: 1,
        height: statusHeight
    },
    messageContainer: {
        zIndex: 1, 
        position: 'absolute',
        top: statusHeight + 20,
        left: 0,
        right: 0,
        height: 80,
        alignItems: 'center',
    },
    networkDownbubble: {
        paddingHorizontal: 100,
        paddingtop:10,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    networkUpBubble: {
        paddingHorizontal: 100,
        backgroundColor: 'green'
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    myName: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'gray',
        marginBottom: 20,
    },
    text2: {
        color: 'black',
        textAlign: 'center',
        fontSize: 15,
    },

}) 
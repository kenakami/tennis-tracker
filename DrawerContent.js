import React from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import {
    useTheme,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './database/firebase';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    if (props.logged_in) {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <Drawer.Section>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {
                                  props.navigation.navigate('Match History')
                              }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="autorenew"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Sync"
                        />
                    </Drawer.Section>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Log Out"
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                props.navigation.navigate('Match History')
                            })
                            Alert.alert('Logged out!')
                        }}
                    />
                </Drawer.Section>
            </View>
        );

    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {
                            props.navigation.navigate('Match History')
                        }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="login"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Log in"
                        onPress={() => {
                            props.navigation.navigate('Login')
                        }}

                    />
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
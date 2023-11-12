import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions, SafeAreaView, Image } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
import ProgressBar from 'react-native-progress/Bar';
import { AuthContext } from '../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { TopicContext } from '../context/topicContext';
import config from '../../config';
import { useIsFocused } from '@react-navigation/native';

const LearningLesson = () => {
    const [topics, setTopics] = useState([]);
    const {state} = useContext(AuthContext);
    const {setTopic} = useContext(TopicContext)
    const accessToken = state.accessToken
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());

    };    
    
    const IPV4_ADDRESS = config.extra.IPV4
    const PORT = config.extra.PORT
    useEffect(() => {
        if (isFocused) {

         const getTopicData = async () => {
            try {
                let response = await axios.get(`http://${IPV4_ADDRESS}:${PORT}/api/v1/topic`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setTopics(response.data);
            } catch (error) {
                console.log('Error in getTopicData func', error);
            }
        }
    
        if (accessToken) {
         getTopicData();
        }
        }
    }, [isFocused]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>VIETGO</Text>
                <TouchableOpacity onPress={openDrawer} style={styles.drawerButton}>
                    <FontAwesomeIcon icon={faUser} color={COLORS.White} size={25}/>
                </TouchableOpacity>
            </View>
            <View style={styles.line}/>
            <ScrollView>
                
                    <View style={styles.content}>
                        {topics.map((t) => {
                            const originalPath = t.topic.avatar.url
                            const updatedPath = originalPath.replace(/\\/g, "/");
                            const processNumber = parseFloat(t.progress)
                            const roundedNumber = processNumber*100
                            return (
                            
                                <TouchableOpacity 
                                    style={styles.topicContainer} 
                                    key={t.topic.id}
                                    onPress={ async () => {
                                        setTopic({
                                            id: t.topic.id,
                                            title: t.topic.name,
                                            progress: t.progress
                                        })
                                    try {
                                        const response = await axios.post(
                                            `http://${IPV4_ADDRESS}:${PORT}/api/v1/topic-progress`, 
                                        {
                                            topicId: t.topic.id 
                                        },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${accessToken}`
                                            }
                                        }
                                        );
                                    } catch (error) {
                                        console.error('Error creating progress:', error);
                                    }
                                        navigation.navigate('StudyView')
                                    }}
                                    >
                                    <Image 
                                        style={styles.imageTopic}
                                        source={{uri: `http://${IPV4_ADDRESS}:${PORT}/${updatedPath}`}}/>
                                    <View style={styles.topicDetailContainer}>
                                        <Text style={styles.titleText}>{t.topic.name}</Text>
                                        {t.progress > 0 ? (
                                            <Text style={styles.processText}>Progress: {roundedNumber}%</Text>
                                        ) : (
                                            <Text style={styles.processText}>Progress: 0</Text>
                                        )}
                                        <ProgressBar progress={roundedNumber/100} color={COLORS.LightBlack}  borderColor={COLORS.Grey} width={200} />

                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
            </ScrollView>
            </SafeAreaView>
    );
};

export default LearningLesson;

const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Beige,
    },
    header: {
        backgroundColor: COLORS.Black,
        width: WIDTH,
        height: WIDTH*0.15,
        paddingVertical:SPACING.space_15,
        paddingHorizontal: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        borderBottomWidth: 1,
        borderBottomColor: COLORS.WhiteRGBA50,
        shadowColor: COLORS.Black,
        shadowOffset: {
            height:1,
            width:1
        },
        shadowOpacity: 0.20,
        shadowRadius: 0.3,
        elevation: 1,    },
    content:{
    },
    topicContainer:{
        width: WIDTH * 0.9,
        backgroundColor: COLORS.White,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: SPACING.space_10,
        marginVertical: SPACING.space_10 - 3,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_15,
        borderRadius: SPACING.space_15,
        flexDirection: 'row',
        shadowColor: '#000',
    shadowOffset: {
        height:1,
        width:1
    },
    shadowOpacity: 0.20,
    shadowRadius: 0.3,
    elevation: 1,
    },
    imageTopic:{
        width: WIDTH * 0.25,
        height: WIDTH * 0.25,
        borderRadius: SPACING.space_15
    },
    line:{
        backgroundColor: COLORS.Grey,
        height: 0.3,
        width:WIDTH,
        marginVertical: SPACING.space_10
    },
    topicDetailContainer:{
        marginHorizontal: SPACING.space_10,
        marginVertical: SPACING.space_10
    },
    titleText:{
        textTransform: 'capitalize',
        color: COLORS.Black,
        fontWeight: '400',
        fontSize: FONTSIZE.size_18
    },
    processText:{
        marginVertical: SPACING.space_10 -5
    },
    logo:{
        color: COLORS.White,
        // fontWeight: 'bold',
        fontSize: FONTSIZE.size_24,
        textShadowColor: COLORS.LightBlack,
        alignSelf: 'center',
        letterSpacing: 4,
        fontFamily: 'Dosis-Bold'
    },
    drawerButton:{
        position: 'absolute',
        right: SPACING.space_20,
    }
});

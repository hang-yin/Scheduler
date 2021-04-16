import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CourseList from '../components/CourseList';
import CourseEditScreen from './CourseEditScreen';
import {firebase} from '../firebase';

const fixCourses = json => ({
  ...json,
  courses: Object.values(json.courses)
});

const ScheduleScreen = ({navigation}) => {

  const user = useContext(UserContext);
  const canEdit = user && user.role === 'admin';

  const [schedule, setSchedule] = useState({title: '', courses: []});

  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
  };

  //const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const db = firebase.database().ref();
    const handleData = snap => {
      if (snap.val()) setSchedule(fixCourses(snap.val()));
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);
  /*
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);
  */
  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view}/>
    </SafeAreaView>
  );
}

// define Banner
const Banner = ({title}) => (
  <Text style={styles.bannerStyle}>{title || '[loading...]'}</Text>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  bannerStyle: {
    color: '#888',
    fontSize: 32,
  },
});

export default ScheduleScreen;
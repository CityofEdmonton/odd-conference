"use strict"

import React from "react";
import { connect } from "react-redux";
import ListContainer from "../../common/ListContainer";
import PureListView from "../../common/PureListView";
import F8Colors from "../../common/F8Colors";
import { Text, View, StyleSheet, FlatList } from "react-native";

import { createSelector } from "reselect";
import type { Speaker } from "../../reducers/speakers";
import SpeakerData from "./Speaker";


import Parse from "parse/react-native";

// import type { Session } from "../../reducers/sessions";


type Props = {
    speakers: Array<Speaker>
}

// const data = createSelector( // selector for the speakers reducer
//     store => store.speakers
// )

// class Speaker extends React.Compoent {
//     render() {
//         return (
//             <Text>Speaker {this.props.name}</Text>
//         )
//     }
// }

class SpeakersView extends React.Component {
    props: Props;

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    //     if (
    //       nextProps.speakers !== this.props.speakers ||
    //       nextProps.now !== this.props.now
    //     ) {
    //       this.setState({
    //         sessionsHappeningToday: sessionsHappeningToday(nextProps.now),
    //         incompleteSessions: FilterSessions.byCompleted(
    //           nextProps.sessions,
    //           nextProps.now
    //         )
    //       });
    //     }
    let x = nextProps.speakers;
        debugger;
    }

    
    
    render() {

        // let sessions = [...this.props.sessions];

        // const Speakers = Parse.Object.extend("Speakers");
        // var query = new Parse.Query(Speakers);

        // query.get("A91WnDT3dj")
        // .then((speaker) => {
        //     name = speaker.get("speakerName");
        //     this.props.title = speaker.get("speakerTitle");
        //     console.log(`Name: ${name} Title: ${title}`);
        // }, (error) => {
        //     console.log('Error');
        // });
        // let filterItem;
        // if (this.props.topics && this.props.topics.length) {
        //     filterItem = {
        //         icon: require("../../common/img/header/filter.png"),
        //         title: "Filter",
        //         onPress: this.openFilterScreen
        //     };
        // }

        // var speakers = [];
        // speakers.push(
        //     <SpeakerData
        //           name={this.props.speakers[0].name}
        //           title={this.props.speakers[0].title}
        //           style={{
        //             marginVertical: 10,
        //             paddingHorizontal: 20
        //           }}
        //         />
        // );

        var filtered_speakers = [];
        filtered_speakers.push(
            this.props.speakers[0]
        )
        for (let i = 1; i < this.props.speakers.length; i++) {
            if (this.props.speakers[i].name !== this.props.speakers[i-1].name) {
                filtered_speakers.push(this.props.speakers[i])
            }
        }

        // for (let i = 1; i < this.props.speakers.length; i++) {
        //     if (this.props.speakers[i].name !== this.props.speakers[i-1].name) {
        //         speakers.push(
        //             // <Text>{this.props.speakers[i].name}{"\n"}</Text>
        //             <SpeakerData
        //               name={this.props.speakers[i].name}
        //               title={this.props.speakers[i].title}
        //               style={{
        //                 marginVertical: 10,
        //                 paddingHorizontal: 20
        //               }}
        //             />
        //         )
        //     }
        // }

        // const speakerList = ({itemList}) => (
        //     <View>
        //         <FlatList
        //             data={itemList}
        //             renderItem={({item}) => <SpeakerData name={item.id} />}
        //         />
        //     </View>
        // )

        const content = (

            <ListContainer
                title="Speakers"
                headerTitleColor={F8Colors.white}
            >

                <View>
                    <FlatList
                        data={filtered_speakers}
                        renderItem={({item}) => <SpeakerData
                            name={item.name}
                            title={item.title}
                            style={{
                                marginVertical: 10,
                                paddingHorizontal: 20
                            }}
                      /> }
                    />
                </View>

                {/* <speakerList itemList={speakers}/> */}
                {/* <View>{speakers}</View> */}
                {/* {speakers} */}
                
                {/* <View>
                    <Text style={styles.help}>Speakers...</Text>
                    <Text style={styles.help}>{this.props.speakers[0].name}</Text> */}
                    {/* <Text style={styles.help}>{this.props.test}</Text> */}
                    {/* <Speaker speaker=
                    <Text>{speakers}</Text>
                </View> */}
            </ListContainer>
        )
        return content;
    }
}

const styles = StyleSheet.create({
    help: {
        textAlign: 'center',
        marginTop: 10
    }
})

// function select(store) {
//     return {
//       day: store.navigation.day,
//       filter: store.scheduleFilter,
//       topics: store.scheduleTopics,
//       sessions: data(store)
//     };
//   }
  
//   function actions(dispatch) {
//     return {
//       switchDay: day => dispatch(switchDay(day)),
//       filterTopics: selected => dispatch(applyScheduleFilter(selected)),
//       clearFilter: _ => dispatch(clearScheduleFilter())
//     };
//   }

/* redux store ============================================================== */

// function select(store) {
//     return {
//         speakers: data(store)
//     };
// }

// renderSpeakers() {
//     const speakersProfiles = (this.props.session.speakers || []
//     ).map(speaker => (
//       <F8SpeakerProfile
//         key={speaker.name}
//         speaker={speaker}
//         style={{ marginTop: 5 }}
//       />
//     ));

//     if (speakersProfiles.length) {
//       return <Section title="Hosted By">{speakersProfiles}</Section>;
//     } else {
//       return null;
//     }
//   }

/* redux store ============================================================== */

function select(store) {
    return {
        // ...store,
      speakers: store.speakers,
    //   pages: store.pages,
    //   policies: store.policies,
    //   notificationsBadge: unseenNotificationsCount(store) + store.surveys.length
    };
  }



module.exports = connect(select)(SpeakersView);

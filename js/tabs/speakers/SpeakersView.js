"use strict"

import React from "react";
import { connect } from "react-redux";
import ListContainer from "../../common/ListContainer";
import PureListView from "../../common/PureListView";
import F8Colors from "../../common/F8Colors";
import { Text, View } from "react-native";

import { createSelector } from "reselect";
import type { Session } from "../../reducers/speakers";


// type Props = {
//     name: name,
//     title: title
// }

const data = createSelector( // selector for the speakers reducer
    store => store.speakers
)

class SpeakersView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterModal: false
        }
    }

    // componentWillReceiveProps(nextProps) {
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
    //   }

    render() {
        // let filterItem;
        // if (this.props.topics && this.props.topics.length) {
        //     filterItem = {
        //         icon: require("../../common/img/header/filter.png"),
        //         title: "Filter",
        //         onPress: this.openFilterScreen
        //     };
        // }

        const content = (
            <View>
                <Text>WTFFFF</Text>
                <Text>{this.props.speakers}???</Text>
                <Text>{this.props.lol}</Text>
            </View>
        )
        return content;
    }
}

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
      speakers: store.speakers,
      lol: store.lol
    //   pages: store.pages,
    //   policies: store.policies,
    //   notificationsBadge: unseenNotificationsCount(store) + store.surveys.length
    };
  }

module.exports = connect(select)(SpeakersView);

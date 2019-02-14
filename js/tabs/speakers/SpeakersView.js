"use strict"

import React from "react";
import { connect } from "react-redux";
import ListContainer from "../../common/ListContainer";
import F8Colors from "../../common/F8Colors";
import { TouchableOpacity, View, StyleSheet, FlatList, Text } from "react-native";

import type { Speaker } from "../../reducers/speakers";
import SpeakerTab from "./SpeakerTab";
import { Navigator } from "react-native-deprecated-custom-components";
import { Heading3 } from "../../common/F8Text";

type Props = {
    speakers: Array<Speaker>,
    navigator: Navigator
}

class SpeakersView extends React.Component {
    props: Props;

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        // do something?
    }
    
    render() {
        if (this.props.speakers.length) {
            var filtered_speakers = [];
            filtered_speakers.push(
                this.props.speakers[0]
            );
            var count = 1;
            for (let i = 1; i < this.props.speakers.length; i++) {
                var current = this.props.speakers[i].name.replace(/\s+/g,'').replace(/-/g,'');
                var previous = this.props.speakers[i-1].name.replace(/\s+/g,'').replace(/-/g,'');
                if (current !== previous ) {
                    filtered_speakers.push(this.props.speakers[i]);
                    count++;
                }
            }
            console.log(`Number of speakers: ${count}`);
        } else {
            console.log(`No speakers present`)
        }

        const content = (
            <ListContainer
              title="Speakers"
              headerTitleColor={F8Colors.white}
            >
              <View>
                <FlatList
                  data={filtered_speakers}
                  renderItem={({item}) => 
                    <TouchableOpacity
                      onPress={_ => this.showDescription(item)}
                      activeOpacity={0.5}
                    >
                      <SpeakerTab
                        name={item.name}
                        title={item.title}
                        style={{
                          marginVertical: 12,
                          paddingHorizontal: 15
                        }} />      
                    </TouchableOpacity> }
                />
              </View>
            </ListContainer>
        )

        const emptyContent = (
            <ListContainer
              title="Speakers"
              headerTitleColor={F8Colors.white}
            >
<<<<<<< HEAD
              <View style={styles.container}>
                <View style={styles.content}>
                  <Heading3 style={styles.title}>No speakers to display</Heading3>
                </View> 
=======
              <View>
                <Text>Nothing to display</Text>
>>>>>>> upstream/dev
              </View>
            </ListContainer>
        )

        if (this.props.speakers.length) {
            return content;
        } else {
<<<<<<< HEAD
            return emptyContent
=======
            return emptyContent;
>>>>>>> upstream/dev
        }
    }

    showDescription(speaker: Speaker) {
        let allSpeakers = {...this.props.speakers};
        this.props.navigator.push({ // This is caught in F8Navigator.js (** Have to specify "speaker" prop ** -> this is what it catches)
            speaker,
            allSpeakers
        });
    }
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: {
        justifyContent: 'center'
    },
    content: {
      paddingVertical: 220,
      alignItems: "center"
    },
    title: {
      color: F8Colors.blue,
      textAlign: "center",
=======
    help: {
        textAlign: 'center',
        marginTop: 10
>>>>>>> upstream/dev
    }
})


/* redux store ============================================================== */

function select(store) {
    return {
        speakers: store.speakers,
    };
  }

module.exports = connect(select)(SpeakersView);

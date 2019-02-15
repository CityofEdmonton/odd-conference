"use strict";

import React from "react";
import { Platform, StatusBar } from "react-native";
import F8Header from "../../common/F8Header";
import StyleSheet from "../../common/F8StyleSheet";
import { connect } from "react-redux";

import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";

import { ScrollView, View, Navigator, Image } from "react-native";

import type { Speaker } from "../../reducers/speaker";
import * as F8Text from "../../common/F8Text";


type Props = {
  speaker: Speaker,
  navigator: Navigator
};

class SpeakerInfo extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const backItem = {
      title: "Back",
      layout: "icon",
      icon: require("../../common/img/header/back.png"),
      onPress: _ => this.props.navigator.pop()
    };

    // If an image does not exist, reference the placeholder
    const speakerImageSource = (this.props.speaker.pic) ? {uri: this.props.speaker.pic} : require("./img/tab-icon/active.png");

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const speakerBio = (this.props.speaker.bio) ? this.props.speaker.bio : lorem;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated={true} />
        <F8Header
          backgroundColor={F8Colors.palatinateBlue}
          itemsColor={F8Colors.white}
          navItem={backItem}
          style={Platform.OS === "ios" ? { height: 70 } : {}}
        />
        <ScrollView>
            <Image
            style={styles.picture}
            source={speakerImageSource}
            />
            <F8Text.Heading1 style={styles.name}>{this.props.speaker.name}</F8Text.Heading1>
            <F8Text.Heading3 style={styles.title}>{this.props.speaker.title.toUpperCase()}</F8Text.Heading3>
            {/* <F8Text.Paragraph style={styles.bio}>{this.props.speaker.bio}</F8Text.Paragraph> */}
            <F8Text.Paragraph style={styles.bio}>{speakerBio}</F8Text.Paragraph>
            {/* <Text>{this.props.speaker.id}</Text> */}
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    // do something??
  }

  dismiss() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white
  },
  picture: {
    width: 250,
    height: 250,
    marginVertical: 20,
    alignSelf: 'center'
  },
  name: {
    paddingHorizontal: 20,
    color: F8Colors.tangaroa
  },
  title: {
      paddingHorizontal: 20,
  },
  bio: {
      paddingHorizontal: 20,
      marginVertical: 15,
      marginBottom: 80
  }
});

module.exports = connect()(SpeakerInfo);

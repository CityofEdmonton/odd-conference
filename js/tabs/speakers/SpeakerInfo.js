"use strict";

import React from "react";
import { Platform, StatusBar } from "react-native";
import F8Header from "../../common/F8Header";
import StyleSheet from "../../common/F8StyleSheet";
import { connect } from "react-redux";

import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";

import { Text, View, Navigator, Image } from "react-native";

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

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated={true} />
        <F8Header
          backgroundColor={F8Colors.palatinateBlue}
          itemsColor={F8Colors.white}
          navItem={backItem}
          style={Platform.OS === "ios" ? { height: 70 } : {}}
        />
        <Image
          style={styles.picture}
          source={{uri: this.props.speaker.pic}}
        />
        <F8Text.Heading1 style={styles.name}>{this.props.speaker.name}</F8Text.Heading1>
        <F8Text.Heading3 style={styles.title}>{this.props.speaker.title.toUpperCase()}</F8Text.Heading3>
        <F8Text.Paragraph style={styles.bio}>{this.props.speaker.bio}</F8Text.Paragraph>
        {/* <Text>{this.props.speaker.id}</Text> */}
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
      marginVertical: 15
  }
});

module.exports = connect()(SpeakerInfo);

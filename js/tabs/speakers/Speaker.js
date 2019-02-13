"use strict";

import React from "react";
import { Text, View } from "react-native";
import { Heading3, Heading4 } from "../../common/F8Text";

type Props = {
    name: string,
    title: string
};


export default class SpeakerData extends React.Component {
    props: Props;

    render() {
        return (
            <Text style={this.props.style}>
                {this.renderSpeakerName()}
                {"\n"}
                {this.renderTitle()}
            </Text>
        )
    }

    renderSpeakerName() {
        if (this.props.title) {
          return <Heading3>{this.props.name}</Heading3>;
        } else {
          return null;
        }
    }

    renderTitle() {
        if (this.props.title) {
            return <Heading4>{this.props.title.toUpperCase()}</Heading4>;
        } else {
            return null;
        }
    }
}
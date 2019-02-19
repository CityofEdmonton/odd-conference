/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */

"use strict";

module.exports = {
  version: 410,
  testMenuEnabled: true,
  parseAppID: "odd-app-2019",
  serverURL: "http://35.247.62.130:1337",
  // serverURL: "http://162.106.109.3:1337", // Desktop
  // serverURL: "http://localhost:1337",
  // graphqlURL: "http://162.106.109.3:4000/graphql",
  graphqlURL: "http://localhost:4000/graphql",
  compatibleStoreVersion: "0.10",
  gcmSenderId: "336769939688",
  timezone: "America/Edmonton",
  dayLabel(num) {
    const days = { 1: "Tue 4/18", 2: "Wed 4/19" }; // Change to relevant days ("Sat 3/02")
    return days[num] || `Day ${num}`;
  }
};

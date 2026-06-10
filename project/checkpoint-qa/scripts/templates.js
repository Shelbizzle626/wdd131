/* ============================================================
   templates.js — starter checklist data (objects + arrays)
   Loaded before checklists.js.
   ============================================================ */
"use strict";

window.CQ_TEMPLATES = {
  web: {
    label: "Web Player",
    items: [
      { text: "App loads on Chrome, Firefox, Safari, and Edge", priority: "P1" },
      { text: "Sign-in and sign-out work as expected", priority: "P1" },
      { text: "Content filters apply correctly during playback", priority: "P1" },
      { text: "Playback controls (play, pause, seek) respond", priority: "P1" },
      { text: "Layout is responsive at mobile and desktop widths", priority: "P2" },
      { text: "Captions and audio tracks switch correctly", priority: "P2" },
      { text: "Search returns relevant results", priority: "P2" },
      { text: "No console errors on key pages", priority: "P3" }
    ]
  },
  ios: {
    label: "iOS",
    items: [
      { text: "App installs and launches without crash", priority: "P1" },
      { text: "Onboarding / setup prompt appears for new users", priority: "P1" },
      { text: "Filters persist after backgrounding the app", priority: "P1" },
      { text: "Playback resumes at correct position", priority: "P2" },
      { text: "Push notification permission prompt behaves correctly", priority: "P2" },
      { text: "VoiceOver reads key controls", priority: "P2" },
      { text: "Layout adapts to notch and safe areas", priority: "P3" }
    ]
  },
  tvos: {
    label: "tvOS / Apple TV",
    items: [
      { text: "App launches from the tvOS home screen", priority: "P1" },
      { text: "Siri Remote focus moves predictably", priority: "P1" },
      { text: "Onboarding prompt displays and dismisses correctly", priority: "P1" },
      { text: "Top Shelf content loads", priority: "P2" },
      { text: "Playback survives network interruption", priority: "P2" },
      { text: "Focus rings are visible on all actionable items", priority: "P3" }
    ]
  },
  android: {
    label: "Android Mobile",
    items: [
      { text: "APK sideloads and launches via ADB", priority: "P1" },
      { text: "Sign-in works with saved credentials", priority: "P1" },
      { text: "Filters apply correctly on playback", priority: "P1" },
      { text: "Back button navigates without exiting unexpectedly", priority: "P2" },
      { text: "App handles rotation without losing state", priority: "P2" },
      { text: "Stripe link-out opens in browser", priority: "P3" }
    ]
  },
  androidtv: {
    label: "Android TV",
    items: [
      { text: "App launches from Android TV launcher", priority: "P1" },
      { text: "D-pad navigation reaches every control", priority: "P1" },
      { text: "Playback starts within acceptable time", priority: "P1" },
      { text: "Recommendations row populates", priority: "P2" },
      { text: "App recovers from sleep / wake", priority: "P2" }
    ]
  },
  roku: {
    label: "Roku",
    items: [
      { text: "Channel installs from the store build", priority: "P1" },
      { text: "Home screen art and metadata render", priority: "P1" },
      { text: "Playback and trick-play (FF/RW) work", priority: "P1" },
      { text: "Deep link from search opens correct title", priority: "P2" },
      { text: "Memory usage stays within Roku limits", priority: "P3" }
    ]
  }
};

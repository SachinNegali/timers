# Running Locally

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install Dependencies

```sh
npm install
```

## Step 2: Build and run your app
```sh
npx react-native start
npx react-native run-android
```

# Assumptions and Decisions

- Choosing React-native-cli over Expo since AsyncStorage and React Navigation are mentioned on the doc (Thinking expo would default recommend expo-router and expo-secure-store)
- Using toast instead of alert or popup for halfway alert since alert/popup would hide the timer running below
- for Icons used local pngs since we only needed 3 icons

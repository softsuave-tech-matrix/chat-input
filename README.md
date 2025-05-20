# React Native Chat Input

The react-native-chat-input package is a simple and flexible chat input component for React Native apps. It lets users send text messages and upload media from the gallery or file picker. It also includes file previews, image viewer, and easy file removal before sending.

## Installation

Download the package with npm or yarn

```sh
npm install react-native-chat-input
```

In order for react-native-chat-input to work, you also need to install the following dependencies:

```sh
npm install react-native-image-picker react-native-document-picker
```

## Usage

```js
import ChatInput from 'react-native-chat-input';
```

```jsx
 <ChatInput showUploadOption={true} />
```

## Props

All the `ChatInput` props can be passed.

| **Prop**                         | **Type**                         | **Description**                                                                                            
| -------------------------------- | -------------------------------- |  --------------------------------
| `showUploadOption`               | `boolean`                        | Determines whether the upload option is shown. Set to `true` to enable uploads|                        




# React Native Chat Input

The react-native-chat-input package is a simple and flexible chat input component for React Native apps. It lets users send text messages and upload media from the gallery or file picker. It also includes file previews, image viewer, and easy file removal before sending.

# React Native Chat Input Example

<img src="https://github.com/gayathri-muthumula/chat-input/blob/main/demo.gif" width="360">

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
 <ChatInput showUploadOption={true} onSend={handleSend} sendText={sendText} placeHolderText={placeHolderText} images={images} defaultStyleValues={/>
```

## Props

All the `ChatInput` props can be passed.

| **Prop**                         | **Type**                         | **Description**                                                                                            
| -------------------------------- | -------------------------------- |  --------------------------------
| `showUploadOption`               | `boolean`                        | Determines whether the upload option is shown. Set to `true` to enable uploads|              
| `defaultStyleValues`             | `DefaultStyleTypes`              | Custom styles for different parts of the component
| `images`                         | `ChatInputImages`              | Allows customization of icons (attach, close).
| `sendText`                       | `string`                         | Text to display on the send button 
| `placeHolderText`                | `string`                         | Placeholder text shown in the input field.
| `onSend`                         | `(messages: Message[]) => void`  | Callback fired when messages are sent.



## DefaultStyle Props

| **Key**                          | **Type**                          | **Description** 
| -------------------------------- | --------------------------------  | --------------------------------
| `containerStyle`	               | `ViewStyle`	                   | Style for the overall input container.
| `inputStyle`	                   | `TextStyle`	                   | Style for the text input field.
| `buttonStyle`	                   | `ViewStyle`	                   | Style for the send button container.
| `buttonTextStyle`	               | `TextStyle`	                   | Style for the send button text.
| `uploadButtonStyle`	           | `ViewStyle`	                   | Style for the upload button.
| `uploadIconStyle`	               | `ImageStyle`	                   | Style for the upload icon image.
| `previewContainerStyle`	       | `ViewStyle`	                   | Style for the preview items container.
| `previewImageStyle`	           | `ViewStyle`	                   | Style for previewed images.
| `previewFileStyle`	           | `ViewStyle`	                   | Style for previewed file blocks.
| `modalStyle`	                   | `ViewStyle`	                   | Style for the modal container.
| `modalOptionStyle`	           | `TextStyle`	                   | Style for modal options text.
| `cancelOptionStyle`	           | `TextStyle`	                   | Style for cancel option text.





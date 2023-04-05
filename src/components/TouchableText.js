import { TouchableOpacity, Text }
 from
 "react-native";
const TouchableText = (props) => {
  return (
    <TouchableOpacity style={props.style} onPress={() => props.onPress()}>
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};
export default TouchableText;


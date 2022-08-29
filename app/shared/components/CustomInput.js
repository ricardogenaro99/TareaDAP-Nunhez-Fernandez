import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
	borderRadiusGlobal,
	colorPrimary,
	colorWhite,
	fontSizeGlobal,
	marginVerticalGlobal,
	minHeigthGlobal
} from "../utils/constValues";

export default function CustomInput({
	value,
	handleChange,
	placeholder,
	secureTextEntry = false,
	autoCapitalize = "none",
}) {
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder={placeholder}
					style={styles.textInput}
					value={value}
					onChangeText={handleChange}
					secureTextEntry={secureTextEntry}
					autoCapitalize={autoCapitalize}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colorWhite,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		borderRadius: borderRadiusGlobal,
		marginVertical: marginVerticalGlobal,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: colorPrimary,
		borderRadius: borderRadiusGlobal,
		height: minHeigthGlobal,
	},
	textInput: {
		paddingLeft: 10,
		flex: 1,
		height: minHeigthGlobal,
		fontSize: fontSizeGlobal,
	},
});

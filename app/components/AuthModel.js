import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Loader from "react-native-modal-loader";
import CustomButton from "../shared/components/CustomButton";
import CustomInput from "../shared/components/CustomInput";
import { colorPrimary } from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const initialForm = {
	email: "",
	password: "",
};
const AuthModel = ({
	navigateScreen,
	textButton,
	textNavigate,
	action,
	isLoading = false,
}) => {
	const [form, setForm] = useState(initialForm);

	const handlePress = async () => {
		if (isValid()) {
			console.log(form);
			await action(form);
			setForm(initialForm);
		}
	};

	const isValid = () => {
		return !(
			form.email.trim().length === 0 || form.password.trim().length === 0
		);
	};

	return (
		<View style={styles.container}>
			<Loader loading={isLoading} color={colorPrimary} />
			<CustomInput
				value={form.email}
				handleChange={(value) => setForm({ ...form, email: value })}
				placeholder="Ingrese su correo"
			/>
			<CustomInput
				value={form.password}
				handleChange={(value) => setForm({ ...form, password: value })}
				secureTextEntry={true}
				placeholder="Ingrese su contraseña"
			/>
			<CustomButton text={textButton} handlePress={handlePress} />
			<Text style={styles.text} onPress={navigateScreen}>
				{textNavigate}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...screenSheet,
		justifyContent: "center",
	},
	text: {
		color: colorPrimary,
		textAlign: "center",
		fontWeight: "bold",
		margin: 3,
	},
});

export default AuthModel;

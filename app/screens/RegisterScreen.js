import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { auth } from "../../config/firebase";
import AuthModel from "../components/AuthModel";

const RegisterScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);

	const navigateScreen = () => {
		navigation.navigate("login");
	};

	const action = async ({ email, password }) => {
		try {
			setIsLoading(true);
			await createUserWithEmailAndPassword(auth, email, password);
			showMessage({
				message: "Registro éxitoso",
				type: "success",
			});
			navigateScreen();
		} catch (e) {
			showMessage({
				message: e.message,
				type: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthModel
			navigateScreen={navigateScreen}
			textButton="Crear cuenta"
			textNavigate="Ya tengo cuenta"
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({});

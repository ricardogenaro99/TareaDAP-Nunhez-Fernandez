import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import {
	HomeScreen,
	LoginScreen,
	RegisterScreen,
	RestaurantScreen
} from "./app/screens";
import { colorPrimary } from "./app/shared/utils/constValues";

const Stack = createNativeStackNavigator();

const generalOptions = {
	headerTitleAlign: "center",
	headerTintColor: colorPrimary,
	statusBarColor: "black",
};
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="login">
				<Stack.Screen
					name="login"
					component={LoginScreen}
					options={{
						title: "Iniciar sesión",
						...generalOptions,
					}}
				/>
				<Stack.Screen
					name="register"
					component={RegisterScreen}
					options={{
						title: "Crear cuenta",
						...generalOptions,
					}}
				/>
				<Stack.Screen
					name="home"
					component={HomeScreen}
					options={{
						title: "Listado",
						...generalOptions,
					}}
				/>
				<Stack.Screen
					name="restaurant"
					component={RestaurantScreen}
					options={{
						title: "Detalles",
						...generalOptions,
					}}
				/>
			</Stack.Navigator>
			<FlashMessage position="bottom" />
		</NavigationContainer>
	);
}

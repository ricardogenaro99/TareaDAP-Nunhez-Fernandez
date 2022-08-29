import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomCard from "../shared/components/CustomCard";
import { fontSizeGlobal, marginVerticalGlobal } from "../shared/utils/constValues";

const RestaurantCard = ({ restaurant, navigation }) => {
	const { name, restaurant_id } = restaurant;

	const handlePress = () => {
		navigation.navigate("restaurant", { restaurant_id });
	};

	return (
		<View style={styles.container}>
			<CustomCard onPress={handlePress} width="100%">
				<Text style={{ ...styles.text, fontWeight: "bold" }}>
					{restaurant_id}
				</Text>
				<Text style={styles.text}>{name}</Text>
			</CustomCard>
		</View>
	);
};

export default RestaurantCard;

const styles = StyleSheet.create({
	container: {
		marginVertical: marginVerticalGlobal,
	},
	text: {
		fontSize: fontSizeGlobal,
	},
});

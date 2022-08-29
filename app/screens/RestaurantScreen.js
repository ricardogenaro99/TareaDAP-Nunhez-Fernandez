import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RESTAURANTS_JSON from "../data/restaurants.json";
import CustomCard from "../shared/components/CustomCard";
import { fontSizeGlobal } from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const ItemList = ({ label = "", value = "" }) => {
	return (
		<View style={styles.viewRow}>
			<Text style={[styles.text, styles.textBold]}>{label}</Text>
			<Text style={styles.text}>{value}</Text>
		</View>
	);
};

const RestaurantScreen = ({ route }) => {
	const [restaurant, setRestaurant] = useState();

	useEffect(() => {
		const restaurant_id = route.params?.restaurant_id;
		if (restaurant_id) {
			const res = RESTAURANTS_JSON.find((e) => e.restaurant_id === restaurant_id);
			setRestaurant(res);
		}
	}, []);

	return restaurant ? (
		<View style={styles.container}>
			<CustomCard>
				<ItemList label={restaurant.restaurant_id} />
				<ItemList label="Nombre:" value={restaurant.name} />
				<ItemList label="Cocina:" value={restaurant?.cuisine} />
				<ItemList label="Barrio:" value={restaurant?.borough} />
				<ItemList label="Calle:" value={restaurant?.address?.street} />
				<ItemList label="Edificio:" value={restaurant?.address?.building} />
				<ItemList
					label="Código Postal:"
					value={restaurant?.address?.zipcode}
				/>
				<View style={{ ...styles.viewRow, flexDirection: "column" }}>
					<Text style={[styles.text, styles.textBold]}>
						Grados: (Grade - Score - Date)
					</Text>
					{restaurant.grades.map((e, i) => (
						<Text key={i} style={styles.text}>
							{`${e?.grade}  -  ${e?.score}  -  ${new Date(
								e?.date?.$date,
							).toLocaleDateString("en-US")}`}
						</Text>
					))}
				</View>
			</CustomCard>
		</View>
	) : (
		<Text style={styles.text}>Not found</Text>
	);
};

export default RestaurantScreen;

const styles = StyleSheet.create({
	container: {
		...screenSheet,
		justifyContent: "center",
	},
	text: {
		margin: 1,
		fontSize: fontSizeGlobal,
	},
	textBold: {
		fontWeight: "bold",
	},
	viewRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginVertical: 5,
	},
});

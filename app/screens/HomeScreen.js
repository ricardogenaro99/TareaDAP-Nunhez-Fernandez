import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import SelectDropdown from "react-native-select-dropdown";
import CuisinesList from "../components/CuisinesList";
import RestaurantsList from "../components/RestaurantsList";
import RESTAURANTS_JSON from "../data/restaurants.json";
import CustomButton from "../shared/components/CustomButton";
import CustomInputSearch from "../shared/components/CustomInputSearch";
import {
	borderRadiusGlobal,
	colorPrimary,
	colorWhite,
	marginVerticalGlobal,
	minHeigthGlobal
} from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const initialSelect = {
	borough: "",
	cuisine: "",
};
const HomeScreen = ({ navigation }) => {
	const [boroughs, setBoroughs] = useState([]);
	const [cuisines, setCuisines] = useState([]);
	const [select, setSelect] = useState(initialSelect);
	const [searchId, setSearchId] = useState("");

	const cuisinesDropdownRef = useRef();

	useEffect(() => {
		const allBoroughs = new Set(RESTAURANTS_JSON.map((e) => e.borough));
		setBoroughs([...allBoroughs]);
	}, []);

	useEffect(() => {
		if (select.borough) {
			const resBoroughFilter = RESTAURANTS_JSON.filter(
				(e) => e.borough === select.borough,
			);
			const cuisinesDrop = new Set(resBoroughFilter.map((e) => e.cuisine));

			if (select.cuisine) return;

			cuisinesDropdownRef.current.reset();
			setCuisines([...cuisinesDrop]);
		}
	}, [select]);

	const handleSearch = () => {
		if (searchId.trim().length !== 0) {
			const pos = RESTAURANTS_JSON.findIndex(
				(e) => e.restaurant_id === searchId,
			);

			if (pos === -1) {
				showMessage({
					message: "No se encontro el restaurante",
					type: "info",
				});
				return;
			}
			navigation.navigate("restaurant", { restaurant_id: searchId });
			setSearchId("");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerItem}>
				<CustomInputSearch
					value={searchId}
					handleChange={setSearchId}
					placeholder="Busque un Id"
				/>
				<CustomButton text="Buscar" handlePress={handleSearch} />
			</View>

			<View style={styles.containerItem}>
				<SelectDropdown
					buttonStyle={styles.button}
					defaultButtonText="Elija un barrio"
					data={boroughs}
					onSelect={(value) => {
						setSelect({ ...initialSelect, borough: value });
					}}
				/>
				<SelectDropdown
					ref={cuisinesDropdownRef}
					buttonStyle={styles.button}
					defaultButtonText="Elija un tipo de cocina"
					data={cuisines}
					onSelect={(value) => {
						setSelect({ ...select, cuisine: value });
					}}
				/>
			</View>

			{!select.cuisine ? (
				<CuisinesList filters={select} navigation={navigation} />
			) : (
				<RestaurantsList filters={select} navigation={navigation} />
			)}
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		...screenSheet,
	},
	containerItem: {
		width: "100%",
		marginBottom: 20,
	},
	button: {
		height: minHeigthGlobal,
		borderRadius: borderRadiusGlobal,
		alignItems: "center",
		justifyContent: "center",
		borderColor: colorPrimary,
		borderWidth: 1,
		padding: 8,
		marginVertical: marginVerticalGlobal,
		width: "100%",
		backgroundColor: colorWhite,
	},
});

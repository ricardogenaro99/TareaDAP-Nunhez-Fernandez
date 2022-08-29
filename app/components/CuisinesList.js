import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RESTAURANTS_JSON from "../data/restaurants.json";
import { fontSizeGlobal, marginVerticalGlobal } from "../shared/utils/constValues";

const CuisinesList = ({ filters }) => {
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		const tmp = {};
		RESTAURANTS_JSON.filter((e) => e.borough === filters.borough)
			.map((e) => e.cuisine)
			.forEach((i) => {
				tmp[i] = (tmp[i] || 0) + 1;
			});

		const arrTmp = Object.entries(tmp).map((e) => ({
			cuisine: e[0],
			count: e[1],
		}));

		setDataList(arrTmp);
	}, [filters]);

	return (
		<View style={styles.container}>
			{dataList.length !== 0 && (
				<Text style={styles.text}>Estos son los tipos de cocinas:</Text>
			)}
			<FlatList
				data={dataList}
				renderItem={({ item }) => (
					<Text key={item.restaurant_id} style={styles.item}>
						{item.cuisine} hay {item.count}
					</Text>
				)}
			/>
		</View>
	);
};

export default CuisinesList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
		width: "100%",
	},
	item: {
		fontSize: fontSizeGlobal,
		height: 44,
		marginVertical: marginVerticalGlobal,
	},
	text: {
		fontWeight: "bold",
		marginBottom: 17,
		fontSize: 17,
	},
});

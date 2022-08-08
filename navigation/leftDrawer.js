import React, {useEffect} from "react";
import { connect } from "react-redux";
import {
	createDrawerNavigator,
	useDrawerStatus
} from "@react-navigation/drawer";
import TabsNavigator from "./TabsNavigator";
import CustomLeftDrawerContent from "../components/LeftDrawerContent";

const Drawer = createDrawerNavigator();
//* LEFT DRAWER
const LeftDrawerScreen = (props) => {
	const isDrawerVisible =  useDrawerStatus();

	useEffect(() => {
	  if (isDrawerVisible=='open') {
		console.log(isDrawerVisible)
		;
	  } else{
		console.log(isDrawerVisible);
	  };
      props.drawerStatus(isDrawerVisible)
	}, [isDrawerVisible]);
	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#0E0E66",
				},
				headerTintColor: "#fff",
				overlayColor: "transparent",
				drawerType: "front",
				drawerStyle: {
					marginTop: 56,
					marginBottom: 48.5,
					width: " 80%",
				},
			}}
			useLegacyImplementation
			drawerContent={(props) => <CustomLeftDrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Map"
				component={TabsNavigator}
				options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
			/>
		</Drawer.Navigator>
	);
};

function mapDispatchToProps(dispatch) {
    return {
      drawerStatus: function (status) {
        dispatch({ type: "drawer status", drawerStatus: status });
      },
    };
  }
  


export default connect(null, mapDispatchToProps)(LeftDrawerScreen);

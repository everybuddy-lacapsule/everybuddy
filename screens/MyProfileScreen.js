import React, { useEffect, useState } from "react";
import {StyleSheet} from "react-native";
import { connect } from "react-redux";
import ProfileContent from "../components/ProfileContent";
import EditingProfileContent from "../components/EditingProfileContent";

function MyProfileScreen(props) {
  const [editing, setEditing] = useState(false)
  
  useEffect(() => {
		if (props.editionMode === true) {
			setEditing(true);
		} else {
      setEditing(false);
		}
	}, []);
  
  //* useEffect to toggle editing mode through store state
	useEffect(() => {
		if (props.editionMode === true) {
			setEditing(true);
		} else if (props.editionMode === false) {
      setEditing(false);
		}
	}, [props.editionMode]);

  //* render depending on edition mode
	var content;
  return editing ? <EditingProfileContent /> : <ProfileContent/>;
}

const mapStateToProps = (state) => {
	return {
		editionMode: state.editionMode,
	};
};

export default connect(mapStateToProps, null)(MyProfileScreen);

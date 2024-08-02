import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="Sidebar">
      <List className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <Link to={val.link} key={key} className="sidebar-link">
              <ListItem
                className="row"
                id={location.pathname === val.link ? "active" : ""}
              >
                <ListItemIcon id="icon">{val.icon}</ListItemIcon>
                <ListItemText id="title">{val.title}</ListItemText>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
}

export default Sidebar;

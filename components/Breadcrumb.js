import { Breadcrumbs, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";

export default function Breadcrumb({ options, select }) {
  const handleClick = (e) => {
    console.info("Breadcrumb clicked");
  };

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 25 }}>
        <Link color="inherit" href="/" onClick={handleClick} className="link">
          <HomeIcon className="icon" />
        </Link>
        {options.map((opt, i) => (
          <Link
            key={i}
            color="inherit"
            href={`#${opt}`}
            onClick={handleClick}
            className="link"
          >
            {opt}
          </Link>
        ))}
        <Typography className="select">{select}</Typography>
      </Breadcrumbs>
    </React.Fragment>
  );
}

import { Breadcrumbs, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: "#252525",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  select: {
    fontSize: 24,
    color: "#f88f01",
  },
}));

export default function Breadcrumb({ options, select }) {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventdefault();
    console.info("Breadcrumb clicked");
  };

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 25 }}>
        <Link
          color="inherit"
          href="/"
          onClick={handleClick}
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
        </Link>
        {options.map((opt, i) => (
          <Link
            key={i}
            color="inherit"
            href={`#${opt}`}
            onClick={handleClick}
            className={classes.link}
          >
            {opt}
          </Link>
        ))}
        <Typography className={classes.select}>{select}</Typography>
      </Breadcrumbs>
    </React.Fragment>
  );
}

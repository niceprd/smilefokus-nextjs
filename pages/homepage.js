import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import useSWR from "swr";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    textAlign: "center",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  result: {
    float: "right",
  },
}));

export default function Homepage() {
  const classes = useStyles();

  const [items, setItems] = useState("");
  const [filterItems, setFilterItems] = useState("");
  useEffect(() => {
    let config = {
      method: "get",
      url: `/api/data`,
    };
    axios(config)
      .then((result) => {
        console.log("item => ", result.data.data);
        setItems(result.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const arr = [
    {
      customername: "Bussaracum ",
      customertier: "Gold",
      customerphone: "0824669224",
      totaltransaction: 1,
      totalamount: 500008,
      totalreward: 40000,
      remainingpoint: 40000,
    },
    {
      customername: "Leelar ",
      customertier: "Platinum",
      customerphone: "0874368466",
      totaltransaction: 1,
      totalamount: 10000,
      totalreward: 800,
      remainingpoint: 800,
    },
    {
      customername: "Leelar ",
      customertier: "Platinum",
      customerphone: "0874368466",
      totaltransaction: 1,
      totalamount: 10000,
      totalreward: 800,
      remainingpoint: 800,
    },
    {
      customername: "Leelar ",
      customertier: "Platinum",
      customerphone: "0874368466",
      totaltransaction: 1,
      totalamount: 10000,
      totalreward: 800,
      remainingpoint: 800,
    },
  ];

  const getUnique = (data, key) => {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  };

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed() + "k"
      : Math.sign(num) * Math.abs(num);
  };

  useEffect(() => {
    items && setFilterItems(getUnique(items.list, (key) => key.customername));
  }, [items]);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <div>
                  <span>Total Members</span>
                  <span className={classes.result}>
                    {items && items.summarytier[0].total_members}
                  </span>
                </div>
                <div>
                  <span>
                    Total Rev.<small>(THB)</small>
                  </span>
                  <span className={classes.result}>
                    {items && kFormatter(items.summarytier[0].total_amount)}
                  </span>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <div>
                  <span>{items && items.summarytier[0].tier_name}</span>
                </div>
                <div>
                  <span>
                    Total Rev.<small>(THB)</small>
                  </span>
                  <span className={classes.result}>
                    {items && items.summarytier[0].total_members}
                  </span>
                </div>
                <div>
                  <span>Total Members</span>
                  <span className={classes.result}>
                    {items && kFormatter(items.summarytier[0].total_amount)}
                  </span>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Tier</TableCell>
                <TableCell align="center">LTV</TableCell>
                <TableCell align="center">Total Trans.</TableCell>
                <TableCell align="center">Total Point</TableCell>
                <TableCell align="center">Remaining Point.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterItems &&
                filterItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {item.customername}
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={item.customerphone}
                        displayType={"text"}
                        format="### ### ####"
                      />
                    </TableCell>
                    <TableCell align="center">{item.customertier}</TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={item.totalamount}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                    <TableCell align="right">{item.totaltransaction}</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={item.totalreward}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={item.remainingpoint}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}

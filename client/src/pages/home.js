import React from 'react';
import { Link } from "react-router-dom";
import {
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Home() {
  const classes = useStyles();

  return(
  <>
    <div className={"wImg"}>
      <img className={"imgBanner"} alt="Not Found" src="http://opencart.lionode.com/leoc012018/oc01/image/cache/catalog/main-banner1-1840x940.jpg"></img>
      <Link to="/product" className={classes.link}>
        <button className={"btnW"}>Shop Now</button>
      </Link>
    </div>
    <div className={"mImg"}>
      <img className={"imgBanner"} alt="Not Found" src="https://ballantynes-prod.freetls.fastly.net/data/media/images/content/2008/menswearss2020banner.jpg"></img>
      <Link to="/product" className={classes.link}>
        <button className={"btnM"}>Shop Now</button>
      </Link>
    </div>
    <div className={"eImg"}>
      <img className={"imgBanner"} alt="Not Found" src="http://ledthanhdat.vn/html/kobolg/assets/images/slide11.jpg"></img>
      <div className={'eText'}>
        <h2 fontSize="40px">Black Friday</h2>
        <h1 className="eText1">Electronics</h1>
        <h1>New Arrivals</h1>

      </div>
      <Link to="/product" className={classes.link}>
        <button className={"btnE"}>Shop Now</button>
      </Link>
  </div>
  </>
  )
}
export default Home;
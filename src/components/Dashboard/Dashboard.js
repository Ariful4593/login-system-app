import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Admin from '../Admin/Admin';
import Jobs from '../Admin/Jobs/Jobs';
import Vendor from '../Admin/Vendor/Vendor';
import Courses from '../Admin/Courses/Courses';
import User from '../Admin/User/User';
import './Dashboard.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Interviews from '../Admin/Interviews/Interviews';
import Consultant from '../Admin/Consultant/Consultant';
import { useState } from 'react';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


const menuList = [
    { title: 'Admin', menu: ['Interviews', 'Jobs', 'Vendors', 'Consultants', 'Courses', 'Users'], areaControls: 1, id: 1, email: 'admin@gmail.com' },
    { title: 'Recruiter', menu: ['Interviews', 'Jobs', 'Vendors', 'Consultants'], areaControls: 2, id: 2, email: 'recruiter@gmail.com' },
    { title: 'Consultant', menu: ['Interviews', 'Jobs', 'Courses'], areaControls: 3, id: 3, email: 'consultant@gmail.com' },
    { title: 'Vendor', menu: ['Consultants'], areaControls: 4, id: 4, email: 'vendor@gmail.com' },
]


const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Admin />
    },
    {
        path: "/interviews",
        main: () => <Interviews />
    },
    {
        path: "/jobs",
        main: () => <Jobs />
    },
    {
        path: "/vendors",
        main: () => <Vendor />
    },
    {
        path: "/consultants",
        main: () => <Consultant />
    },
    {
        path: "/courses",
        main: () => <Courses />
    },
    {
        path: "/users",
        main: () => <User />
    }
];


const Dashboard = () => {
    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useState({});
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const specifiedUserData = menuList.filter(user => user.email === loggedInUser.email);
        setLoggedInUser(JSON.parse(localStorage.getItem('user')));
        setUserData(specifiedUserData)
    }, [loggedInUser.email])


    return (
        <div className="container dashboard-area">
            <div className="row">
                <Router>
                    <div className="col-md-2">
                        <div className={classes.root}>
                            {
                                userData.map((data, index) => (
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${data.areaControls}a-content`}
                                            id={`panel${data.id}a-header`}
                                        >
                                            <Typography className={classes.heading}><strong>{data.title}</strong></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ul>
                                                {
                                                    data.menu.map((list, index) => (
                                                        <li style={{ cursor: 'pointer' }} key={index}>
                                                            <Link to={`/${list}`}>{list}</Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </div>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                />
                            ))}
                        </Switch>
                    </div>

                    <div className="col-md-10">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                            ))}
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    );
};

export default Dashboard;
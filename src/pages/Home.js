import React, { useState, useEffect } from 'react'
import Api from '../api/business'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const Home = () => {

    const classes = useStyles();
    const history = useHistory();
    let [businessList, setBusinessList] = useState([])

    useEffect(() => {

        const fetchBusiness = async() => {
            let business = await Api.getBusiness()
            setBusinessList(business)
        }

        fetchBusiness()

    }, [])

    const navigateToBusiness = (id) => {
        localStorage.setItem("businessId", id)
        history.push(`/admin`)
    }

    let businessId = localStorage.getItem("businessId")
    if (businessId){
        history.push(`/admin`)
    }

    return (
        <div>
            Your Business
            {
                businessList.map(business => {
                    
                    return (
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    { business.name }
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small"
                                    onClick={() => navigateToBusiness(business._id)}
                                >
                                    manage
                                </Button>
                            </CardActions>
                        </Card>
                    )

                })
            }

        </div>
    )
}

export default Home

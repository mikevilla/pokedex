import React from "react";
import {Card, CardContent, Chip, Grid, Typography} from "@mui/material";
import {DECIMETER, HECTOGRAM} from "../../constants/pokemon";
import styles from "./Bio.module.css";


type AbilityType ={
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean,
    slot: number
}

type GenericType ={
    name: string,
    url: string
}

const Bio: React.FC<{
    abilities: AbilityType[]
    capture_rate: string,
    egg_groups: any[],
    habitat: GenericType,
    growth_rate: GenericType,
    gender_rate: string,
    height: string,
    weight: string
}> = (props) => {

    const { abilities, capture_rate, egg_groups, gender_rate, growth_rate, habitat, height, weight } = props
    const convertedFeet = (parseInt(height) / DECIMETER);
    const feet = Math.floor(convertedFeet);
    const inches = Math.round((convertedFeet - feet) * 12);
    const bioSectionStyles = {
        margin: '10px',
        background: '#5395f1',
    }

    return (
        <>
            <Card elevation={8} style={bioSectionStyles} >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <CardContent>
                            <Typography className={styles.profileHeader}>Height:</Typography>
                            <Typography variant='h6'>{ feet }' { inches }"</Typography>
                            <Typography className={styles.profileHeader}>Weight:</Typography>
                            <Typography variant='h6'>{ (parseInt(weight) / HECTOGRAM).toFixed(1) } lbs</Typography>

                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <CardContent>
                            <Typography className={styles.profileHeader}>Growth Rate</Typography>
                            <Typography variant='h6'>{growth_rate.name} </Typography>
                            <Typography className={styles.profileHeader}>Gender Ratio</Typography>
                            <Typography variant='h6'>{gender_rate} </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <CardContent>
                            { habitat && (
                                <>
                                    <Typography className={styles.profileHeader}>Habitat</Typography>
                                    <Typography variant='h6'>{habitat.name} </Typography>
                                </>
                            )
                            }
                            <Typography className={styles.profileHeader}>Capture Rate</Typography>
                            <Typography variant='h6'>{ Math.round(((parseInt(capture_rate)/255) * 100)) } % </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
                        <CardContent>
                            <Typography className={styles.profileHeader}>Abilities: </Typography>

                            {abilities.map((item)=>{
                                return (
                                    <React.Fragment key={item.ability.name}>
                                        <Chip className={styles.tag} label={item.ability.name}/>
                                    </React.Fragment>)
                            }) }
                            <Typography className={styles.profileHeader}>Egg Groups:</Typography>

                            {egg_groups.map((item)=>{
                                return (
                                    <React.Fragment key={item.name}>
                                        <Chip className={styles.tag} label={item.name}/>
                                    </React.Fragment>)
                            }) }
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}


export default Bio
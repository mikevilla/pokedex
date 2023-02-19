import React from "react";
import {Card, Divider, IconButton, LinearProgress, Tooltip, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./Stats.module.css";

type StatType = {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

const Stats: React.FC<{statsData: StatType[]}> = (props) => {

    const { statsData } = props

    // Normalise function used for linear progress bar to set range
    const MIN = 0;
    const MAX = 150;
    const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

    const sectionStyles = {
        marginTop: '7px',
        background: '#FAF7F1',
    }

    const buildStatsSection = (stats: any[]) => {

        return (
            stats.map((item)=> {
                return (
                    <React.Fragment key={ item.stat.name }>
                        <Typography className={styles.statsItems}>{item.stat.name} :  {item.base_stat}</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={normalise(item.base_stat)}
                            sx={{
                                height: '25px',
                                width: '100%'
                            }}/>
                    </React.Fragment>
                )
            })
        )
    }

    return(
            <>
                <Card style={sectionStyles} elevation={0}>
                    <Typography variant='h6'>
                        <span className={styles.typesHeader}>Stats
                            <Tooltip title="Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.">
                              <IconButton>
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                        </span>
                        <Divider/>
                    </Typography>
                    { buildStatsSection(statsData) }
                </Card>
            </>
        )
}

export default Stats
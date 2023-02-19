import React from "react";
import {CircularProgress, Grid} from "@mui/material";
import styles from './LoadingMessage.module.css'

const LoadingMessage: React.FC = () => {


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '80vh' }}

        >
            <CircularProgress className={styles.loadingMessage} size={150} thickness={3}/>
        </Grid>
    )
}

export default LoadingMessage
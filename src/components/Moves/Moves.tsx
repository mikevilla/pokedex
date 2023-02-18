import React from "react";
import {Card, Divider, IconButton, Tooltip, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import styles from "../Pokemon/Pokemon.module.css";

const Moves: React.FC<{movesData: {move: object, version_group_details: any[]}[] }>= (props) => {

    const moves = props.movesData;

    const sectionStyles = {
        marginTop: '7px',
        background: '#FAF7F1',
    }

    const showMoves = ((moves: any[])=> {

        moves.sort((a,b) => {
            const nameA = a.move.name;
            const nameB = b.move.name;
            return nameA <= nameB ? -1 : 1
        })

        return (
            <div className={styles.movesSection}>
                <div className={styles.movesListContainer}>
                    {moves.map((item) => (
                        <div className={styles.movesListItem} key={item.move.name}>
                            {item.move.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    })

    return (
        <>
            <Card style={sectionStyles} elevation={0}>
                <Typography variant='h6'>
                    <span className={styles.typesHeader}>Moves
                        <Tooltip title="Moves are the skills of Pokémon in battle. In battle, a Pokémon uses one move each turn. Some moves (including those learned by Hidden Machine) can be used outside of battle as well, usually for the purpose of removing obstacles or exploring new areas.">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                    </span>
                    <Divider/>
                </Typography>
                { showMoves(moves) }
            </Card>
        </>

    )
}

export default Moves
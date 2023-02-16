export const POKEMON_LIMIT = 649;

type pokemonType = {
    [key: string]: "default" | "success" | "primary" | "secondary" | "error" | "info" | "warning" | undefined
};

export const COLOR_MATCH: pokemonType = {
    flying: "primary",
    fire: "error",
    fighting: "error",
    electric: "warning",
    grass: "success",
    poison: "secondary",
    ice: "primary",
    water: "primary",
    ground: "warning",
    psychic: "secondary",
    rock: "warning",
    bug: "secondary",
    dragon: "success",
    dark: "secondary",
    fairy: "info"
}
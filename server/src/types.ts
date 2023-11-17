export interface Player {
    id: Number
    firstname: String
    lastname: String
}

export interface PlayerStats {
    player: Player
    points: Number
    totReb: Number
}
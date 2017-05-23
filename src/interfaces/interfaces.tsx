
// tslint:disable:typedef-whitespace
// tslint:disable:indent
export interface IAction {
    type:   string;
    video:  any;
    text:   string;
}

export interface IAuth {
	type: string;
	username: string;
	password: string;
	remember: boolean;
}

export interface IMessages {
    message: string;
    isError: boolean;
}

export interface ILocations {
    ID:            number;
	Name:          string;
	City:          string;
	Address:       string;
	InsideOutside: string;
	FieldType:     IFieldTypes;
	FieldTypesID:  number;
}

export interface IFieldTypes {
    ID:             number;
	Type:           string;
	Description:    string;
}

export interface ITeams {
    ID:         number;
	Name:       string;
	City:       string;
	Sport:      ISports;
	SportID:    number;
	Category:   ICategories;
	CategoryID: number;
	Coaches:    ICoaches[];
	Players:    IPlayers[];
}

export interface ISeasons {
    ID:     number;
	Years:  string;
}

// Sports les sports
export interface ISports {
    ID:     number;
	Name:   string;
}

// Categories les categories
export interface ICategories {
    ID:     number;
	Name:   string;
}

export interface IPlayers {
    ID:           number;
	Number:       number;
	Fname:        string;
	Lname:        string;
	Email:        string;
	PassHash:     string;
	TokenRequest: string;
	TokenReset:   string;
	TokenLogin:   string;
	Teams:        ITeams[];
}

export interface IPosition {
    ID:     number;
    Nom:    string;
}

// Videos les videos
export interface IVideos  {
    ID:        number;
	Path:      string;
	Part:      number;
	Completed: number;
	Game:      IGames;
	GameID:    number;
}

// Games les parties
export interface IGames  {
    ID:             number;
	Team:           ITeams;
	TeamID:         number;
	Status:         string; // Local/visiteur
	OpposingTeam:   string;
	Season:         ISeasons;
	SeasonID:       number;
	Location:       ILocations;
	LocationID:     number;
    FieldCondition: string;
	Date:           string;
	Action:         IActions[];
}

// Temperatures la température durant la partie
export interface ITemperatures  {

    ID:              number;
	TemperatureType: string; // Rain, wind, sun, etc
	Degree:          string; // The temperature un degree celcius
}

// Positions les positions des joueurs
export interface IPositions  {
    ID:   number;
	Name: string;
}

// Zones les zones de terrain
export interface IZones  {
    ID:   number;
	Name: string;
}

// MovementsType represent Movement type entity
// 1: Offensive
// 2: Defensive
// 3: Neutral
export interface IMovementsType  {
    ID:   number;
	Name: string;
}

// ActionsType les types d'actions
export interface IActionsType  {
    ID:             number;
	Name:           string;
	Description:    string;
	MovementType:   IMovementsType;
	MovementTypeID: number;
	ControlType:    string;
}

// Actions est une modélisation des informations sur une
// action exécutée par un joueur
export interface IActions  {
    ID:           number;
	ActionType:   IActionsType;
	ActionTypeID: number;
	Zone:         IZones;
	ZoneID:       number;
	Game:         IGames;
	GameID:       number;
	X1:           number;
	Y1:           number;
	X2:           number;
	Y2:           number;
	Time:         string;
	HomeScore:    number;
	GuestScore:   number;
	PLayer:       IPlayers;
	PlayerID:     number;
}

// Coaches les entraineurs
export interface ICoaches  {
    ID:           number;
	Fname:        string;
	Lname:        string;
	Email:        string;
	PassHash:     string;
	TokenRequest: string;
	TokenReset:   string;
	TokenLogin:   string;
	Teams:        ITeams[];
	Actif:        string;
}

// Metrics les métriques
export interface IMetrics  {

    ID:       number;
	Name:     string;
	Equation: string;
	Team:     ITeams;
	TeamID:   number;
}

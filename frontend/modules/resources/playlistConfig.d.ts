export interface PlaylistConfig {
  clear_duplicates?: boolean;
  region?: CountryCodes;
  explicit_filter?: boolean;

  upload: {
    name: string;
  };

  instructions: Instruction[];

  acousticness?: AttributeValue;
  danceability?: AttributeValue;
  energy?: AttributeValue;
  instrumentalness?: AttributeValue;
  liveness?: AttributeValue;
  loudness?: AttributeValue;
  speechiness?: AttributeValue;
  tempo?: AttributeValue;
  valence?: AttributeValue;
}

export type Modifier = "acousticness" | "danceability" | "energy" | "instrumentalness" | "liveness" | "loudness" | "speechiness" | "tempo" | "valence";

export interface AttributeValue {
  lower: number;
  upper: number;
}

export type Instruction =
  | ArtistTracksInstruction
  | ArtistTopInstruction
  | RelatedArtistsInstruction
  | PlaylistTracksInstruction
  | RecommendationsInstruction
  | GenerateInstruction
  | SearchInstruction
  | SavedTracksInstruction
  | TopTracksInstruction
  | TopArtistsInstruction;

export type Instructions = {
  artist_tracks: ArtistTracksInstruction;
  artist_top: ArtistTopInstruction;
  related_artists: RelatedArtistsInstruction;

  playlist_tracks: PlaylistTracksInstruction;

  recommendations: RecommendationsInstruction;
  generate: GenerateInstruction;

  search: SearchInstruction;

  saved_tracks: SavedTracksInstruction;
  top_tracks: TopTracksInstruction;
  top_artists: TopArtistsInstruction;
};

export interface ArtistTracksInstruction {
  type: "artist_tracks";
  artist: string;
  limit?: number;
  sample?: number;
}

export interface ArtistTopInstruction {
  type: "artist_top";
  artist: string;
  amount?: number;
}

export interface RelatedArtistsInstruction {
  type: "related_artists";
  artist: string;
  amount?: number;
  instruction: keyof Instructions;
}

export interface PlaylistTracksInstruction {
  type: "playlist_tracks";
  playlist: string;
  amount?: number;
  sample?: number;
}

export interface RecommendationsInstruction {
  type: "recommendations";
  artists?: string[];
  tracks?: string[];
  genres?: string[];
  attributes?: {
    acousticness?: number;
    danceability?: number;
    energy?: number;
    instrumentalness?: number;
    liveness?: number;
    loudness?: number;
    speechiness?: number;
    tempo?: number;
    valence?: number;
  };
  limit?: number;
  pool_size?: number;
}

export interface GenerateInstruction {
  type: "generate";
  tracks: string[];
  amount?: number;
  random_sample?: boolean;
  mix_same?: boolean;
  pool_size?: number;
  limit?: number;
}

export interface SearchInstruction {
  type: "search";
  query: string;
  limit?: number;
  sample?: number;
  offset?: number;
}

export interface SavedTracksInstruction {
  type: "saved_tracks";
  amount?: number;
  random_sample?: number;
  artist?: string;
}

export interface TopTracksInstruction {
  type: "top_tracks";
  amount?: number;
  term?: "stort" | "medium" | "long";
}

export interface TopArtistsInstruction {
  type: "top_artists";
  instruction: keyof Instructions;
  amount?: number;
  term?: "stort" | "medium" | "long";
}

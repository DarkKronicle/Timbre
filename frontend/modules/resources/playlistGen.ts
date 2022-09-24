import {
  ArtistTopInstruction,
  ArtistTracksInstruction,
  AttributeValue,
  GenerateInstruction,
  Instructions,
  Modifier,
  PlaylistConfig,
  PlaylistTracksInstruction,
  RecommendationsInstruction,
  RelatedArtistsInstruction,
  SavedTracksInstruction,
  SearchInstruction,
  TopArtistsInstruction,
  TopTracksInstruction,
} from "./playlistConfig";
import toml from "toml";

export default class PlaylistGen {
  public data: PlaylistConfig;

  constructor(opt: {
    name: string;
    clear_duplicates?: boolean;
    remove_from_playlist?: string;
    region?: CountryCodes;
    explicit_filter?: boolean;
  }) {
    this.data = {
      clear_duplicates: opt.clear_duplicates,
      region: opt.region,
      explicit_filter: opt.explicit_filter,
      upload: {
        name: opt.name,
      },

      instructions: [],
      
    };
  }

  public addInstruction(type: "artist_tracks", opt: Omit<ArtistTracksInstruction, "type">): void;
  public addInstruction(type: "artist_top", data: Omit<ArtistTopInstruction, "type">): void;
  public addInstruction(type: "related_artists", data: Omit<RelatedArtistsInstruction, "type">): void;
  public addInstruction(type: "playlist_tracks", data: Omit<PlaylistTracksInstruction, "type">): void;
  public addInstruction(type: "recommendations", data: Omit<RecommendationsInstruction, "type">): void;
  public addInstruction(type: "generate", data: Omit<GenerateInstruction, "type">): void;
  public addInstruction(type: "search", data: Omit<SearchInstruction, "type">): void;
  public addInstruction(type: "saved_tracks", data: Omit<SavedTracksInstruction, "type">): void;
  public addInstruction(type: "top_tracks", data: Omit<TopTracksInstruction, "type">): void;
  public addInstruction(type: "top_artists", data: Omit<TopArtistsInstruction, "type">): void;
  public addInstruction(type: keyof Instructions, ...data: any) {
    this.data.instructions.push({
      type: type,
      ...data,
    });
  }

  public addModifier(type: Modifier, data: AttributeValue) {
    this.data[type] = data;
  }
  

  public removeInstruction(index: number) {
    this.data.instructions.splice(index, 1);
  }

  public static fromTOML(tomlString: string): PlaylistGen {
    const data = toml.parse(tomlString) as PlaylistConfig;
    const playlist = new PlaylistGen({
      name: data.upload.name,
      clear_duplicates: data.clear_duplicates,
      region: data.region,
      explicit_filter: data.explicit_filter,
    });

    playlist.data.instructions = data.instructions;

    return playlist;
  }
}

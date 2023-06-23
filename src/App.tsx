import { Flex, Grid, GridItem, HStack, Show } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import { useState } from 'react';
import { Genre } from './hooks/useGenres';
import PlatformSelector from './components/PlatformSelector';
import { Platform } from './hooks/useGames';
import SortSelector from './components/SortSelector';
import GameHeading from './components/GameHeading';

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}
function App() {
  const [GameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText) => setGameQuery({ ...GameQuery, searchText })} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={1}>
          <GenreList
            selectedGenre={GameQuery.genre}
            onGenre={(genre) => setGameQuery({ ...GameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameHeading gameQuery={GameQuery} />
        <Flex gap={5} paddingLeft={9}>
          <PlatformSelector
            selectedPlatform={GameQuery.platform}
            onPlatform={(platform) => setGameQuery({ ...GameQuery, platform })}
          />
          <SortSelector
            sortOrder={GameQuery.sortOrder}
            onSelectSortOrder={(sortOrder) => setGameQuery({ ...GameQuery, sortOrder })}
          />
        </Flex>

        <GameGrid gameQuery={GameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;

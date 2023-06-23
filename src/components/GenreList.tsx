import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';

interface Props {
  //function to pass with the genre object. Will be used to set genre state in App.tsx
  onGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onGenre }: Props) => {
  //fetch hook
  const { data, isLoading, error } = useGenres();

  if (error) return null;

  //skeleton array so we can generate multiple skeletons
  const skeletons = [1, 2, 3, 4, 5, 6];
  if (isLoading)
    //skeleton renderring
    return (
      <>
        <Heading fontSize={'2xl'} marginBottom={5}>
          Genres
        </Heading>
        <List>
          {skeletons.map((s) => (
            <ListItem key={s} paddingY="5px">
              <HStack>
                <SkeletonCircle boxSize="32px" />
                <SkeletonText width={40} noOfLines={1} />
              </HStack>
            </ListItem>
          ))}
        </List>
      </>
    );

  return (
    //list renderring
    <>
      <Heading fontSize={'2xl'} marginBottom={5}>
        Genres
      </Heading>
      <List>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY="4px">
            <HStack>
              <Image
                boxSize={'32px'}
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace={'normal'}
                textAlign="start"
                variant="Link"
                fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                fontSize="lg"
                onClick={() => onGenre(genre)}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;

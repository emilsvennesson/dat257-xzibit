/* eslint-disable react/require-default-props */
import { Box, CardActionArea, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Book } from 'cremona';
import { Link } from 'react-router-dom';
import { mainTheme } from '../../theme';
import BookSkeletonCard from './BookSkeletonCard';

const HEIGHT = 300;
const WIDTH = 230;
interface CardProps {
  book?: Book;
}

export default function BookCard({ book }: CardProps) {
  if (!book) {
    return <BookSkeletonCard />;
  }
  return (
    <Card sx={{ maxWidth: WIDTH, maxHeight: HEIGHT, minHeight: HEIGHT }}>
      <CardActionArea
        component={Link}
        to={`books/${book.uid}`}
        sx={{ '&:hover': { color: mainTheme.palette.secondary.main } }}
      >
        <CardMedia
          component="img"
          height="200"
          image={book.image}
          alt="book image"
        />
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            component="div"
            overflow="hidden"
            whiteSpace="pre-line"
            textOverflow="ellipsis"
            height={50}
            textAlign="center"
          >
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                fontWeight: 'light',
              }}
            >
              {book.name}
            </Typography>
          </Box>
          <Typography component="div">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ fontWeight: 'bold' }}
            >
              {`${book.price} kr`}
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

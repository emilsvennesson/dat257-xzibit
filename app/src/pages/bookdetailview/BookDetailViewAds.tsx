import {
  Typography,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Snackbar,
  Alert,
  Stack,
  Link,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AdAccordion from '../../components/ads/AdAccordion';
import AdSkeleton from '../../components/ads/AdSkeleton';
import AdService from '../../services/AdService';
import { AdStatus, Advert } from '../../services/Advert';
import sadshark from '../../assets/images/sadshark.png';

interface Props {
  bookUid: number;
}

function BookDetailViewAds({ bookUid }: Props) {
  const [ads, setAds] = useState<Advert[] | undefined>(undefined);
  const [sort, setSort] = useState('');
  const [fetchedAds, setFetchedAds] = useState(false);
  const [changesSaved, setChangesSaved] = useState<boolean | undefined>(
    undefined,
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  useEffect(() => {
    const getAds = async () => {
      try {
        const newAds = await AdService.getAdsFromBook(bookUid.toString());
        setAds(newAds.filter((ad) => ad.status === AdStatus.AVAILABLE));
      } catch (e) {
        console.log(e);
      }
      setFetchedAds(true);
    };
    if (!fetchedAds) getAds();
  }, [bookUid, fetchedAds]);

  const handleClose = () => {
    setChangesSaved(undefined);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px',
        minWidth: '400px',
      }}
    >
      {changesSaved !== undefined && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={changesSaved !== undefined}
          onClose={handleClose}
          key="topcenter"
        >
          <Alert severity={changesSaved === true ? 'success' : 'error'}>
            {changesSaved
              ? 'Ändringarna sparades!'
              : 'Något gick fel, försök igen senare!'}
          </Alert>
        </Snackbar>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mb: 1,
        }}
      >
        <Typography variant="h4">Annonser</Typography>
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel id="sorting-label">Sortera</InputLabel>
          <Select
            labelId="sorting-label"
            id="sorting"
            value={sort}
            label="Sortera"
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value={10}>Lägst pris först</MenuItem>
            <MenuItem value={20}>Högst pris först</MenuItem>
            <MenuItem value={30}>Bäst skick först</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Stack
        spacing={1}
        sx={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}
      >
        {ads
          ? ads.map((ad) => (
              <AdAccordion
                ad={ad}
                onChangesSaved={(onChangesSaved) => {
                  setFetchedAds(false);
                  setChangesSaved(onChangesSaved);
                }}
                onAdDelete={() => setFetchedAds(false)}
                key={ad.uid}
              />
            ))
          : Array.from({ length: 4 }, () => (
              <AdSkeleton key={Math.random() * 1000} />
            ))}
        {ads && ads.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 4 }}
            >
              <Box component="img" width="200px" src={sadshark} />
            </Box>
            <Typography variant="body1">
              Det finns inga annonser tillgängliga för den här boken.
            </Typography>

            <Link
              component={RouterLink}
              to={`/sell?book=${bookUid}`}
              variant="body1"
            >
              Bli först med att sälja denna bok!
            </Link>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
export default BookDetailViewAds;

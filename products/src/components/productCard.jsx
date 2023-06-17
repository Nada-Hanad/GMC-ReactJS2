import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUserFavoritesContext } from "../context/userFavsContextProvider";

export default function ProductCard({ product }) {
  var { favs, setFavs } = useUserFavoritesContext();
  return (
    <Card sx={{ height: 350 }}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => {
              //if it already exist
              if (favs.includes(product)) {
                setFavs(favs.filter((e) => e.id !== product.id));
              } else {
                setFavs([...favs, product]);
              }
            }}
          >
            <FavoriteIcon color={favs.includes(product) ? "#000000" : ""} />
          </IconButton>
        }
        title={product.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

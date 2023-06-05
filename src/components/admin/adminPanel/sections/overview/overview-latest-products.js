import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import {useEffect, useState} from "react";
import {fetchProductList} from "../../../../products/productSlice";
import {useDispatch} from "react-redux";

export const OverviewLatestProducts = ({changeTab}) => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductList())
            .then(data => setProducts(data.payload))
    }, [])

    function byField(field) {
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }
    const sorted_products = products.sort(byField('date_added')).slice(0, 5)

    return (
      <div className="rounded-xl bg-mainWhite" >
      <CardHeader title="Последние товары" />
      <List>
        {sorted_products.map((product, index) => {
          const hasDivider = index < products.length - 1;
            return (
            <ListItem
              divider={hasDivider}
              key={product.product_id}
            >
              <ListItemAvatar>
                {
                  product.image_min
                    ? (
                      <Box
                        component="img"
                        src={product.image_min}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.product_name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Обновлено 5 дней назад`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={() => changeTab('ProductsList')}
        >
          Перейти
        </Button>
      </CardActions>
    </div>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};

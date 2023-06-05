import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Avatar,
  Button,
  CardContent,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import "./simplebar.min.css";
import {Link} from "react-router-dom";
import SwatchIcon from '@heroicons/react/24/solid/SwatchIcon';


export const OverviewVarieties = ({changeTab}) => {
  return (
      <div className="rounded-xl shadow-sm bg-mainWhite">
        <CardContent>
          <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                  color="text.secondary"
                  variant="h7"
                  gutterBottom
              >
                Разновидности
              </Typography>
              <Typography variant="h4">
                12
              </Typography>
            </Stack>
            <Avatar
                sx={{
                  backgroundColor: 'rgba(78,220,189,0.41)',
                  height: 56,
                  width: 56
                }}
            >
              <SvgIcon>
                <SwatchIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
          <Link className="flex justify-end">
            <Button
                color="inherit"
                endIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowRightIcon />
                    </SvgIcon>
                )}
                size="small"
                variant="text"
                onClick={() => changeTab('OrderReviews')}
            >
              Перейти
            </Button>
          </Link>
        </CardContent>
      </div>
  );
};

OverviewVarieties.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};

import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Button,
  CardContent,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import {Link} from "react-router-dom";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";

export const OverviewWarehouse = ({changeTab, total_quantity}) => {
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
              gutterBottom
              variant="h7"
            >
              Склад
            </Typography>
            <Typography variant="h4">
                {total_quantity} кг
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#FFA82E',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
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
                onClick={() => changeTab('WarehousePage')}
            >
              Перейти
            </Button>
        </Link>
      </CardContent>
    </div>
  );
};

OverviewWarehouse.propTypes = {
  sx: PropTypes.object
};

import PropTypes from 'prop-types';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import {Avatar, Button, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {Link} from "react-router-dom";

export const OverviewTotalCustomers = ({ value, changeTab }) => {

  return (
      <div className="rounded-xl shadow-lg bg-mainWhite" >
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
              Клиенты
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#48BA20',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UsersIcon />
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
              onClick={() => changeTab('ClientsList')}
          >
            Перейти
          </Button>
        </Link>
      </CardContent>
    </div>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};


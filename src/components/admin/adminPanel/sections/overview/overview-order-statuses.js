import PropTypes from 'prop-types';
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import {Avatar, Button, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {Link} from "react-router-dom";

export const OverviewOrderStatuses = ({changeTab }) => {

  return (
      <div className="rounded-xl shadow-sm bg-mainWhite" >
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
              Статусы заказа
            </Typography>
            <Typography variant="h4">
              6
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'rgba(255,168,46,0.76)',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
                <Squares2X2Icon/>
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

OverviewOrderStatuses.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};


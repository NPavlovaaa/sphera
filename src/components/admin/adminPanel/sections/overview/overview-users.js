import PropTypes from 'prop-types';
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {Avatar, Button, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {Link} from "react-router-dom";

export const OverviewUsers = ({changeTab }) => {

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
              Пользователи
            </Typography>
            <Typography variant="h4">
              12
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#EC5859',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
                <UserCircleIcon />
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
              onClick={() => changeTab('UserList')}
          >
            Перейти
          </Button>
        </Link>
      </CardContent>
    </div>
  );
};

OverviewUsers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};


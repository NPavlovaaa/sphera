import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {Avatar, Button, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";

export const OverviewBudget = ({ difference, positive = false, changeTab }) => {

  return (
    <div className="rounded-xl shadow-lg bg-mainWhite">
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
            >
              Бюджет
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
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={8}>
              <Stack direction="column" spacing={1}>
                <Typography color="text.secondary" fontSize="small">
                  Расходы
                </Typography>
                <Stack alignItems="center" direction="row" spacing={0.5}>
                  <SvgIcon color={positive ? 'success' : 'error'} fontSize="small">
                    {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </SvgIcon>
                  <Typography color={positive ? 'success.main' : 'error.main'} variant="body2" fontSize="medium">
                    {difference}%
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography color="text.secondary" fontSize="small">
                  Доходы
                </Typography>
                <Stack alignItems="center" direction="row" spacing={0.5}>
                  <SvgIcon color={positive ? 'success' : 'error'} fontSize="small">
                    {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </SvgIcon>
                  <Typography color={positive ? 'success.main' : 'error.main'} variant="body2" fontSize="medium">
                    {difference}%
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography color="text.secondary" fontSize="small">
                С прошлого месяца
              </Typography>
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
                    onClick={() => changeTab('Budget')}
                >
                  Перейти
                </Button>
              </Link>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </div>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};

import PropTypes from 'prop-types';
import {Avatar, Button, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import ChatBubbleLeftIcon from "@heroicons/react/24/solid/ChatBubbleLeftIcon";
import {Link} from "react-router-dom";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";

export const OverviewOrderReviews = ({changeTab}) => {

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
                Отзывы о заказах
              </Typography>
              <Typography variant="h4">
                123
              </Typography>
            </Stack>
            <Avatar
                sx={{
                  backgroundColor: '#cf7cff',
                  height: 56,
                  width: 56
                }}
            >
              <SvgIcon>
                <ChatBubbleLeftIcon />
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

OverviewOrderReviews.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};

import PropTypes from 'prop-types';
import {Avatar, Button, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import ChatBubbleOvalLeftIcon from '@heroicons/react/24/solid/ChatBubbleOvalLeftIcon'
import {Link} from "react-router-dom";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";


export const OverviewProductReviews = ({changeTab}) => {

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
              gutterBottom
            >
              Отзывы о товарах
            </Typography>
            <Typography variant="h4">
              123
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#0085FF',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ChatBubbleOvalLeftIcon />
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
              onClick={() => changeTab('ProductReviews')}
          >
            Перейти
          </Button>
        </Link>
      </CardContent>
    </div>
  );
};

OverviewProductReviews.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};

import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
    Avatar,
    Button,
    CardContent,
    Stack,
    SvgIcon, Typography
} from '@mui/material';
import CubeIcon from "@heroicons/react/24/solid/CubeIcon";
import {Link} from "react-router-dom";

export const OverviewProducts = ({changeTab}) => {

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
                            Товары
                        </Typography>
                        <Typography variant="h4">
                            12
                        </Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: '#FF3E80',
                            height: 56,
                            width: 56
                        }}
                    >
                        <SvgIcon>
                            <CubeIcon />
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

OverviewProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};

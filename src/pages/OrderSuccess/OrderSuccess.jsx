import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Container, CssBaseline, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
const theme = createTheme();
function OrderSuccess() {
    let locate = useLocation()
    let params = new URLSearchParams(locate.search);
    let success = params.get('success') === 'true';
    let cancel = params.get('cancel') === 'true';
    console.log(typeof (success))
    console.log(cancel)
    let navigate = useNavigate()
    const handleOnClick = () => {
        navigate('/')
    }
    return (
        <   ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {success === true ?
                        cancel === true ?
                            <>
                                <Typography component="h1" variant="h4" align="center">
                                    HUỶ ĐƠN HÀNG THÀNH CÔNG <CheckOutlined fontSize="large" color="success" />
                                </Typography>
                            </>

                            :
                            <>
                                <Typography component="h1" variant="h4" align="center">
                                    ĐẶT HÀNG THÀNH CÔNG <CheckOutlined fontSize="large" color="success" />
                                </Typography>
                            </>

                        :
                        cancel === true ?
                            <Typography component="h1" variant="h4" align="center">
                                HUỶ ĐƠN HÀNG THẤT BẠI <CloseOutlined fontSize="large" color="error" />
                            </Typography>
                            :
                            <>
                                <Typography component="h1" variant="h4" align="center">
                                    ĐẶT HÀNG THẤT BẠI <CloseOutlined fontSize="large" color="error" />
                                </Typography>

                            </>
                    }
                    <Button css={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '$10',marginBottom:'$10' }} onClick={handleOnClick} size={"md"} shadow color={'warning'}>Trang chủ</Button>
                    <Typography component="text" variant="subtitle1" align="center" justifyContent='center'>
                        Liên hệ nếu có thắc mắc hoặc gặp lỗi: fsshopmail01@gmail.com
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default OrderSuccess;
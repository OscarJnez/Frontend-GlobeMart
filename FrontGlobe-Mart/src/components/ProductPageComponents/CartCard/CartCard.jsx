import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import QuantitySelector from '../../MicroComponents/QuantitySelector/QuantitySelector';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { mainContext } from '../../../contexts/mainContext';
import Modal from '@mui/material/Modal';
// import { Divider } from '@mui/material';
import { isLogged } from '../../../auxStr/auxStructures';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    textAlign: 'center',
    outline: 'none'
};


export default function CartCard({ quantityAv, seller }) {

    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const { mainData, setMainData } = useContext(mainContext);

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [openLogging, setOpenLoggin] = useState(false)
    const handleOpenSuccess = () => setOpen(true);
    const handleCloseSuccess = () => setOpen(false);
    const handleOpenLogin = () => setOpenLoggin(true)
    const handleCloseLogin = () => setOpenLoggin(false)

    const handleAddProductClick = () => {

        if (isLogged()) {

            handleOpenSuccess()
            setIsAdded(true)
            setMainData(prevData => ({
                ...prevData,
                productQtyOnCart: prevData.productQtyOnCart + 1
            }))
            setTimeout(() => {

                setIsAdded(false)

            }, 3000)

            // console.log(mainData.productQtyOnCart)

        } else {
            handleOpenLogin()
        }

    }

    return (

        <Card sx={{
            minWidth: "100%",
            height: "85%",
            display: "flex",
            flexDirection: "column",
            alignContent: 'center',
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2.5,
            pt: 2.5
        }}>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: 'center',
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                height: "50%",
                width: "80%"
            }}
            >
                {/* No uso el c.ternario para evitar la renderización de la consecuencia de la condicional aparece durante unos pocos segundos*/}
                <QuantitySelector />
                {/* {(quantityAv > 0) && <Typography sx={{ color: "#2E7D32", fontWeight: "bold" }}>In Stock</Typography>}
                {(quantityAv === 0) && <Typography sx={{ color: "red", fontWeight: "bold" }}>Out of Stock</Typography>} */}
                {(quantityAv <= 3 && quantityAv > 0) && <Typography variant="caption" sx={{ color: "red", }}>Only {quantityAv} available</Typography>}
                <Typography sx={{ mx: 3, fontSize: "0.9rem", color: "#1976D2", }}>Sold by: <strong>{seller}</strong> </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: 'center',
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                height: "50%",
                width: "100%",
            }}
            >
                <Button
                    onClick={handleAddProductClick}
                    disabled={quantityAv === 0}
                    variant="contained"
                    color="success"
                    sx={{ width: "68%", height: "30%", }}>
                    {!isAdded && <Typography>
                        {quantityAv > 0 ?
                            <span > Add to Cart </span> :
                            <span sx={{ textTransform: 'none' }}>
                                O<span style={{ textTransform: 'lowercase' }}>
                                    ut of stock</span>
                            </span>
                        }
                    </Typography>}
                    {isAdded && <CheckCircleOutlineIcon variant="success" sx={{ fontSize: "1.5rem" }} />}
                </Button>
                <Divider sx={{ alignSelf: 'center', height: '1px', width: "75%" }} />
                <Button variant="outlined" sx={{ width: "68%", height: "30%", textTransform: 'none' }}>
                    A<span style={{ textTransform: 'lowercase' }}  >
                        dd to wish list</span></Button>
            </Box>
            <Box>
                <Modal
                    open={open}
                    onClose={handleCloseSuccess}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                        textAlign: 'center',
                        outline: 'none'
                    }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#2E7D32" }} />
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: "#2E7D32", mt: 2 }}>
                            Product Successfully added to Cart
                        </Typography>
                    </Box>
                </Modal>
            </Box>

            <Box>
                <Modal
                    open={openLogging}
                    onClose={handleCloseLogin}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        // border: '1px solid #000',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: "#2E7D32", mt: 2, mb: 2 }}>
                            You must be logged in
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#555", mb: 3 }}>
                            Access exclusive features
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#2E7D32",
                                '&:hover': { backgroundColor: '#1b5e20' }
                            }}
                            onClick={() => { navigate('/Login'); }}>
                            Login
                        </Button>
                    </Box>
                </Modal>
            </Box>

        </Card >

    );

}





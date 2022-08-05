import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CustomizedTables() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [studentId, setStudentId] = useState(0)
    const [isAction, setIsAction] = useState(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(null);

    const handleOsh = () => {
        if (!isAction) {
            dispatch({ type: "ADD_STUDENT", payload: { id: studentId, name, tel, email } })
            setStudentId(studentId + 1)
        } else {
            dispatch({ type: "UPDATE_STUDENT", payload: { id: isAction.id, name, tel, email } })
            setIsAction(null)
        }
        setOpen(false)
        setName("")
        setTel("")
        setEmail("")
    }

    const delS = (student) => {
        dispatch({ type: "DEL_STUDENT", payload: student })
    }

    const updateS = (student) => {
        setName(student.name)
        setTel(student.tel)
        setEmail(student.email)
        setStudentId(studentId)
        setIsAction(student)
        setOpen(true)
    }

    return (
        <>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', paddingBottom: '2%',paddingTop:'1%' }} >
                <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }} >React Redux</Typography>
                <Button variant='contained' sx={{ width: '180px', height: '50px',marginTop:'1%' }} onClick={handleOpen}><PersonAddIcon /><span style={{ paddingLeft: '5px' }}>ADD USER</span></Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField type="text" onChange={e => setName(e.target.value)} value={name} sx={{ width: '100%' }} label="FirstName" variant="outlined" />
                    <TextField type="text" onChange={e => setTel(e.target.value)} value={tel} sx={{ width: '100%', marginTop: '5%' }} label="LastName" variant="outlined" />
                    <TextField type="text" onChange={e => setEmail(e.target.value)} value={email} sx={{ width: '100%', marginTop: '5%' }} label="Email" variant="outlined" />
                    <Button variant='contained' sx={{ width: '100%', marginTop: '5%' }} onClick={handleOsh} >{!isAction ? "Qo`shish" : "yangilash"}</Button>
                </Box>
            </Modal>
            <Table />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>t/r</StyledTableCell>
                            <StyledTableCell>FirstName</StyledTableCell>
                            <StyledTableCell>LastName</StyledTableCell>
                            <StyledTableCell>email</StyledTableCell>
                            <StyledTableCell>actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state ? state.students.map((val, index) => {
                            return <StyledTableRow>
                                <StyledTableCell>{index+1}</StyledTableCell>

                                <StyledTableCell component="th" scope="row">
                                    {val.name}
                                </StyledTableCell>
                                <StyledTableCell>{val.tel}</StyledTableCell>
                                <StyledTableCell >{val.email}</StyledTableCell>
                                <StyledTableCell > 
                                    <button style={{ background: 'green', color: 'white', border: 'none', padding: '3%', cursor: 'pointer', borderRadius: '10px', width: '40px' }} onClick={() => updateS(val)}><EditIcon /></button>
                                    <button style={{ background: 'red', color: 'white', border: 'none', padding: '3%', cursor: 'pointer', borderRadius: '10px', width: '40px', marginLeft: '3%' }} onClick={() => delS(val)}><DeleteIcon /></button>
                                </StyledTableCell>
                            </StyledTableRow>
                        }) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

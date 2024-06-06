import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import FormSelect from 'react-bootstrap/FormSelect';

const ModalEditHd = (props) => {
    const { show, handleCloseHd, dataHdedit, handleEditHdfrommodal } = props;
    const [startDay, setStartDay] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rentAmount, setRentAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [roomId, setRoomId] = useState("");
    const [renterId, setRenterId] = useState("");
    const [roomNumber, setRoomNumber] = useState("");

    const roomMapping = {
        100: 1, 101: 2, 102: 3,  103: 4,104: 5, 105: 6, 106: 7, 107: 8, 108: 9, 109: 10, 
        110: 11, 111: 12, 112: 13, 113: 14, 118: 15, 119: 16, 130: 17, 131: 18, 
        132: 20, 133: 21, 134: 22, 135: 23, 136: 24, 137: 25, 138: 26, 139: 27
      };

    const roomNumbers = Object.keys(roomMapping);

    const handleEditHd = async () => {
        if (renterId) {
            const formattedStartDay = startDay ? moment(startDay).format('YYYY-MM-DD') : null;
            const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : null;

            const mappedRoomId = roomMapping[parseInt(roomNumber)];
            
            if (!mappedRoomId) {
                toast.error("Số phòng không hợp lệ");
                return;
            }

            let res = await updateHd(dataHdedit.contractId, formattedStartDay, formattedEndDate, rentAmount, depositAmount, mappedRoomId, renterId);
            
            if (res) {
                handleEditHdfrommodal({
                    contractId: dataHdedit.contractId,
                    startDay: formattedStartDay,
                    endDate: formattedEndDate,
                    rentAmount,
                    depositAmount,
                    roomId: mappedRoomId,
                    roomNumber: parseInt(roomNumber),
                    renterId
                });
                handleCloseHd();
                toast.success("Update thành công");
            } else {
                toast.error("Update thất bại");
            }
        } else {
            toast.error("Vui lòng nhập tên trước khi lưu");
        }
    };

    useEffect(() => {
        if (show) {
            setStartDay(new Date(dataHdedit.startDay));
            setEndDate(new Date(dataHdedit.endDate));
            setRentAmount(dataHdedit.rentAmount);
            setDepositAmount(dataHdedit.depositAmount);
            setRoomNumber(dataHdedit.roomNumber);
            setRenterId(dataHdedit.renterId);
        }
    }, [dataHdedit, show]);

    return (
        <Modal show={show} onHide={handleCloseHd} size='lg' className='modal-add-tro'>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body_add_new">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="rentAmount" className="form-label">Số người ở</label>
                        <input type="text" className="form-control" value={rentAmount} onChange={(event) => setRentAmount(event.target.value)} />
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="depositAmount" className="form-label">Tiền cọc</label>
                        <input type="text" className="form-control" value={depositAmount} onChange={(event) => setDepositAmount(event.target.value)} />
                    </div>
                    
                    <div className="col-md-12">
                        <label htmlFor="inputRoomNumber" className="form-label">Thuê phòng số</label>
                        <FormSelect 
                            className="form-select" 
                            value={roomNumber} 
                            onChange={(event) => setRoomNumber(event.target.value)}
                        >
                            <option value="">Chọn phòng....</option>
                            {roomNumbers.map((room) => (
                                <option key={room} value={room}>Phòng {room}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="renterId" className="form-label">Tên người thuê</label>
                        <input type="text" className="form-control" value={renterId} onChange={(event) => setRenterId(event.target.value)} />
                    </div>
                    <div className="row">
                        <div className="col-md-6 my-3">
                            <label htmlFor="inputStartDay" className="form-label">Ngày bắt đầu</label>
                            <div className="date-picker-container">
                                <DatePicker
                                    selected={startDay}
                                    onChange={(date) => setStartDay(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    placeholderText="Chọn ngày bắt đầu"
                                />
                            </div>
                        </div>

                        <div className="col-md-6 my-3">
                            <label htmlFor="inputEndDate" className="form-label">Ngày hết hạn</label>
                            <div className="date-picker-container">
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    placeholderText="Chọn ngày kết thúc"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseHd}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleEditHd}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditHd;

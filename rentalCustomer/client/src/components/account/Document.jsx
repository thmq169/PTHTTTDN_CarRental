import React from 'react'
import Form from 'react-bootstrap/Form'

function Document({ documentData: { type, lisence_ID, date, status, isDisabled, id_name_input, id_date_input, 
    handleOnchangeInformation} }) {
    return (
        <>
            <tr>
                <td>
                    <div className='me-4'>
                        <span className='fw-bold'>{type}:</span>
                        <Form.Group>
                            <Form.Control type="text"
                                placeholder='ID'
                                name={id_name_input}
                                disabled={isDisabled}
                                required
                                value={lisence_ID}
                                onChange={handleOnchangeInformation}
                            />
                        </Form.Group>
                    </div>
                </td>
                <td>
                    <div className='me-4'>
                        <span className='fw-bold'>Ngày cấp (mm/dd/yyy):</span>
                        <Form.Group>
                            <Form.Control className='w-auto' type="date"
                                placeholder='date'
                                name={id_date_input}
                                disabled={isDisabled}
                                required
                                value={date}
                                onChange={handleOnchangeInformation}
                            />
                        </Form.Group>
                    </div>
                </td>
                <td>
                    <div className='me-4'>
                        <span className='fw-bold'>Trạng thái:</span> <br></br>
                        {status}
                    </div>
                </td>
            </tr>
        </>

    )
}

export default Document
import React from 'react';

class StudentItem extends React.Component {

    render() {

        const {student, handleDelete, handleUpdateStudentGrade,} = this.props;
        
       
        return (
                <div className={`student-card ${student.status === 'Passed' ? 'studentPass-bg' : 'studentFail-bg'}`}>
                    <h3>{student.name}</h3>
                    <div><strong>Subject:</strong> <p>{student.subject}</p></div>
                    <div><strong>Grade:</strong> <p>{student.grade}%</p></div>
                    <div className={`status ${student.status === 'Passed' ? 'pass' : 'fail'}`}> <span>{student.status}</span></div>
                    <div className='btn-container'>
                        <button className='update-btn' onClick={() => handleUpdateStudentGrade(student)}>Update</button>
                        <button className='del-btn' onClick={() => handleDelete(student.id)}>Delete</button>
                    </div>
                </div>
        )
    }

}

export default StudentItem;
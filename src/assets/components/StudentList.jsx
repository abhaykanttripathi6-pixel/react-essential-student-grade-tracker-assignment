import React from 'react';
import { MdOutlineSchool } from "react-icons/md";
import StudentItem from './StudentItem';

class StudentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentItem: [],
            newStudent: {
                id: '',
                name: '',
                subject: '',
                grade: '',
                status: ''
            },
            submitted: false,
            isUpdate: false,
            category: 'All',
            sort: 'default'
        };
    }

    addTask = () => {

        const { name, subject, grade } = this.state.newStudent;

        if (!name || !subject || !grade) return;
        console.log('addTask');

        if (grade < 0 || grade > 100) {
            return alert('Grade should be between 0 and 100')
        }

        this.setState({ submitted: true })
    };


    handleDelete = (id) => {

        const verification = confirm('Do you want to delete this student data ?');
        let updatedVal;
        if (verification) {
            console.log('delete');
            updatedVal = this.state.studentItem.filter((student) => student.id !== id)
            this.setState({ studentItem: updatedVal });
        }
    }

    handleUpdateStudentGrade = (student) => {

        const updateStudentItem = this.state.studentItem.filter((item) => item.id === student.id);

        if (updateStudentItem) {
            this.setState({
                newStudent: student,
                isUpdate: true
            })
        }
    }

    update = () => {

        const { name, subject, grade } = this.state.newStudent;

        if (grade < 0 || grade > 100) {
            return alert('Grade should be between 0 and 100')
        }

        const UpdatedStudentItems = this.state.studentItem.map((studentItem) => studentItem.id === this.state.newStudent.id ? {
            ...this.state.newStudent,
            status: this.state.newStudent.grade > 33 ? "Passed" : "Failed",
        }
            : studentItem)

        return this.setState(prev => {
            return {
                studentItem: UpdatedStudentItems,

                newStudent: {
                    id: '',
                    name: '',
                    subject: '',
                    grade: '',
                    status: ''
                },

                submitted: false,
                isUpdate: false
            }
        })
    }


    componentDidMount() {
        console.log('Component Mounted');

        this.setState({
            studentItem: [
                {
                    id: Date.now() + 1,
                    name: 'Anjeet Tripathi',
                    subject: 'Mathematics',
                    grade: '90',
                    status: 'Passed'
                },
                {
                    id: Date.now(),
                    name: 'Mukul Chaudhary',
                    subject: 'English',
                    grade: '70',
                    status: 'Passed'
                },
                {
                    id: Date.now() + 5,
                    name: 'Abhay Kant Tripathi',
                    subject: 'History',
                    grade: '29',
                    status: 'Failed'
                },
            ],
        })

    };


    componentDidUpdate(prevProps, prevState) {

        if (this.state.submitted === prevState.submitted) return;

        const { name, subject, grade } = this.state.newStudent;

        if (!name || !subject || !grade) return;

        this.setState((prev) => {
            return {

                studentItem: [
                    ...prev.studentItem,
                    {
                        ...prev.newStudent, id: Date.now(),
                        status: prev.newStudent.grade > 33 ? 'Passed' : 'Failed'
                    }
                ],

                newStudent: {
                    id: '',
                    name: '',
                    subject: '',
                    grade: '',
                    status: ''
                },

                submitted: false

            }
        }
        )
    }

    componentWillUnmount() {
        console.log('Component Unmounted');
    }

    render() {

        let filterStudents = this.state.category === 'All' ? this.state.studentItem : this.state.studentItem.filter((student) => student.status === this.state.category)

        if (this.state.sort === 'ascending') {
            filterStudents = filterStudents.sort((a, b) => {
                return Number(a.grade) - Number(b.grade);
            })


        }

        if (this.state.sort === 'descending') {
            filterStudents = filterStudents.sort((a, b) => {
                return Number(b.grade) - Number(a.grade);
            })
        }


        return (
            <div className="app">
                <header>
                    <div className='app-logo'><MdOutlineSchool /></div>
                    <h1>Student Grade Tracker</h1>
                    <p>Class Component Design</p>
                </header>

                <div className="inputSection">
                    <h2>ADD NEW STUDENT</h2>

                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className='inputContainer'>
                            <div >
                                <label htmlFor="name">NAME</label>
                                <input id='name' type="text" placeholder='John Doe' value={this.state.newStudent.name} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, name: e.target.value } })} autoComplete='off' required />
                            </div>

                            <div>
                                <label htmlFor="subject">SUBJECT</label>
                                <input id='subject' type="text" placeholder='Mathematics' value={this.state.newStudent.subject} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, subject: e.target.value } })} autoComplete='off' required />
                            </div>

                            <div>
                                <label htmlFor="grade">GRADE (%)</label>

                                <input id='grade' type="number" placeholder='0-100' min={0} max={100} value={this.state.newStudent.grade} onChange={(e) =>
                                    this.setState({ newStudent: { ...this.state.newStudent, grade: e.target.value } })
                                }
                                    autoComplete='off' required />

                            </div>
                        </div>

                        {this.state.isUpdate ?
                            <div className="update">
                                <button type='submit' className='btn-update' onClick={this.update}>Update</button>
                                <button type='cancel' className='btn-cancel'onClick={this.update}>Cancel</button>
                            </div>

                            :
                            <button type='submit' onClick={this.addTask}>+ Add Student</button>
                        }

                    </form>

                </div>

                <div className="filter-sortingWrapper">

                    <div className="filter-section">
                        <h2>Filter:</h2>
                        <div>
                            <span className={this.state.category === 'All' ? 'active' : ''} onClick={() => this.setState({ category: 'All' })}>All</span>

                            <span className={this.state.category === 'Passed' ? 'active' : ''} onClick={() => this.setState({ category: 'Passed' })}>Passed</span>

                            <span className={this.state.category === 'Failed' ? 'active' : ''} onClick={() => this.setState({ category: 'Failed' })}>Failed</span>
                        </div>
                    </div>

                    <div className="sorting-section">
                        <h2>Sort:</h2>
                        <select onClick={(e) => this.setState({ sort: e.target.value })}>
                            <option value="default">Default</option>
                            <option value="ascending">Sort list in ascending order</option>
                            <option value="descending">Sort list in descending order</option>
                        </select>
                    </div>

                </div>

                <div className="student-details">
                    {this.state.studentItem.length !== 0 ?
                        <> <div className="list-info">
                            <h2>Student List</h2>
                            <span>{this.state.studentItem.length} Students</span>
                        </div>

                            <div className="studentCard-Wrapper">
                                {filterStudents.map((student) => {
                                    return (
                                        <StudentItem key={student.id} student={student}
                                            handleDelete={this.handleDelete}
                                            handleUpdateStudentGrade={this.handleUpdateStudentGrade}
                                            category={this.state.category}
                                        />
                                    );
                                })
                                }
                            </div></>
                        :
                        <div className='no-records'>No Student Data Available !</div>
                    }

                </div>
                <div className="orb-purple"></div>
                <div className="orb-green"></div>
                <div className="orb-pink"></div>
            </div>
        );
    };
};

export default StudentList;
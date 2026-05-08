import React from 'react';
import { MdOutlineSchool } from "react-icons/md";


class App extends React.Component {

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
      submitted: false
    };
  }

  addTask = () => {

    const { name, subject, grade } = this.state.newStudent;

    if (!name || !subject || !grade) return;
    console.log('addTask');

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

      }
    }
    )
  }

  componentWillUnmount() {
    console.log('Component Unmounted');
  }

  render() {
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
                <input id='grade' type="number" placeholder='0-100' min={0} max={100} value={this.state.newStudent.grade} onChange={(e) => this.setState({ newStudent: { ...this.state.newStudent, grade: e.target.value } })} autoComplete='off' required />
              </div>
            </div>

            <button type='submit' onClick={this.addTask}>+ Add Student</button>

          </form>

        </div>

        <div className="student-details">
          {this.state.studentItem.length !== 0 ?
         <> <div className="list-info">
            <h2>Student List</h2>
            <span>{this.state.studentItem.length} Students</span>
          </div>
            <div className="studentCard-Wrapper">
              {this.state.studentItem.map((student) => {
                return (
                  <div key={student.id} className={`student-card ${student.status === 'Passed' ? 'studentPass-bg' : 'studentFail-bg'}`}>
                    <h3>{student.name}</h3>
                    <div><strong>Subject:</strong> <p>{student.subject}</p></div>
                    <div><strong>Grade:</strong> <p>{student.grade}%</p></div>
                    <div className={`status ${student.status === 'Passed' ? 'pass' : 'fail'}`}> <span>{student.status}</span></div>
                    <div className='btn-del-container'>
                      <button onClick={() => this.handleDelete(student.id)}>Delete</button>
                    </div>
                  </div>
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

export default App;
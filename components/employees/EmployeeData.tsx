import styles from './EmployeeData.module.scss';
import { EmployeeDataFormFields } from './EmployeeForm';

export interface Employee extends Omit<EmployeeDataFormFields, 'photo' | 'idScan' | 'authCode'> {
  id?: string;
  uniqueId?: string;

  photo: string;
  idScan: string;
}

const EmployeeData = ({ employee }: { employee: Employee }) => {
  const data = [
    {
      id: 'Name',
      value: `${employee.firstName} ${employee.middleName || ''} ${employee.lastName}`,
    },
    {
      id: 'Aadhar',
      value: employee.identification
    },
    {
      id: 'Employee ID',
      value: employee.id
    },
    {
      id: 'Department',
      value: employee.department
    },
    {
      id: 'Mobile',
      value: employee.mobile
    },
    {
      id: 'Email address',
      value: employee.email
    },
    {
      id: 'Blood group',
      value: employee.bloodGroup
    },
    {
      id: 'Date of birth',
      value: employee.birthDate
    },
    {
      id: 'Joining date',
      value: employee.joiningDate
    },
    {
      id: 'Marital status',
      value: employee.maritalStatus
    },
    {
      id: 'Address',
      value: employee.address
    },
    {
      id: 'Designation',
      value: employee.designation
    },
    // {
    //   id: 'Data Files',
    //   value: <a href={employee.dataFilesUrl} target="_blank">(view attachment)</a>
    // },
    {
      id: 'Contact Card',
      value: <a href={employee.vcfUrl} target="_blank">Add to Contacts</a>
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className="table-container">
        {data.map(entry => entry.value && (
          <div className="row" key={entry.id}>
            <div className="column key">{entry.id}</div>
            <div className="column">{entry.value}</div>
          </div>
        ))}
      </div>

      {employee.photo && <div className={styles.image}>
        <img src={employee.photo} alt={employee.id} />
      </div>}
    </div>
  );
};

export default EmployeeData;
